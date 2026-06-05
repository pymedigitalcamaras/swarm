import { useState, useEffect, useCallback, useRef } from 'react'
import { supabase } from '@/lib/supabase'
import type { User } from '@supabase/supabase-js'
import type { DbUserProfile } from '@/lib/supabase'

export type UserRole = 'visitor' | 'personal_natural' | 'instalador' | 'distribuidor_acs' | 'admin'

export interface AuthState {
  user: User | null
  profile: DbUserProfile | null
  role: UserRole
  isLoading: boolean
  isLoggedIn: boolean
  isAdmin: boolean
  isPersonalNatural: boolean
  isInstalador: boolean
  isDistribuidor: boolean
  canSeeDistribuidorPrices: boolean
}

// Determine role from profile + user metadata
function determineRole(profile: DbUserProfile | null, userMetadata?: Record<string, unknown>): UserRole {
  if (!profile) return 'visitor'
  // Check user_metadata.user_type first (set during registration)
  const metaType = userMetadata?.user_type as string || userMetadata?.userType as string
  if (metaType === 'personal_natural') return 'personal_natural'
  if (metaType === 'instalador') return 'instalador'
  if (metaType === 'distribuidor_acs') return 'distribuidor_acs'
  // Fallback: check profile.role (DB enum: admin, distributor, visitor)
  const rawRole = profile.role as string
  if (rawRole === 'admin') return 'admin'
  if (rawRole === 'distributor') return 'distribuidor_acs' // distributor sees distribuidor prices
  return 'visitor'
}

// Debug bypass check (allows direct admin access during setup)
function checkDebugAdmin(): { user: User; profile: DbUserProfile; role: UserRole } | null {
  if (typeof window === 'undefined') return null
  if (localStorage.getItem('admin_mode') === 'true') {
    return {
      user: { id: 'admin-debug', email: 'admin@nae.cl' } as User,
      profile: {
        id: 'admin-debug',
        email: 'admin@nae.cl',
        full_name: 'Admin',
        company_name: 'NAE',
        phone: '+56990117784',
        country: 'Chile',
        city: 'Santiago',
        role: 'admin',
        is_active: true,
        created_at: new Date().toISOString(),
      } as unknown as DbUserProfile,
      role: 'admin',
    }
  }
  return null
}

export function useAuth(): AuthState & {
  login: (email: string, password: string) => Promise<{ error?: string }>
  register: (email: string, password: string, data: Record<string, string>) => Promise<{ error?: string }>
  logout: () => Promise<void>
} {
  const [user, setUser] = useState<User | null>(null)
  const [profile, setProfile] = useState<DbUserProfile | null>(null)
  const [role, setRole] = useState<UserRole>('visitor')
  const [isLoading, setIsLoading] = useState(true)
  const initialized = useRef(false)

  const fetchProfile = useCallback(async (userId: string, userEmail?: string, userMetadata?: Record<string, unknown>) => {
    // Try by ID first, then by email as fallback
    let { data, error } = await supabase
      .from('users')
      .select('*')
      .eq('id', userId)
      .single()

    if (error && userEmail) {
      const result = await supabase
        .from('users')
        .select('*')
        .eq('email', userEmail)
        .single()
      data = result.data
      error = result.error
    }

    if (error) {
      setProfile(null)
      setRole('visitor')
      return
    }

    setProfile(data as DbUserProfile)
    setRole(determineRole(data as DbUserProfile, userMetadata))
  }, [])

  // Check session on mount (or debug admin bypass)
  useEffect(() => {
    if (initialized.current) return
    initialized.current = true

    const init = async () => {
      setIsLoading(true)

      const debug = checkDebugAdmin()
      if (debug) {
        setUser(debug.user)
        setProfile(debug.profile)
        setRole(debug.role)
        setIsLoading(false)
        return
      }

      const { data: { session } } = await supabase.auth.getSession()

      if (session?.user) {
        setUser(session.user)
        await fetchProfile(session.user.id, session.user.email, session.user.user_metadata)
      }

      setIsLoading(false)
    }

    init()

    // Listen to auth state changes
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (_event, session) => {
        if (localStorage.getItem('admin_mode') === 'true') return

        if (session?.user) {
          setUser(session.user)
          await fetchProfile(session.user.id, session.user.email, session.user.user_metadata)
        } else {
          setUser(null)
          setProfile(null)
          setRole('visitor')
        }
      }
    )

    return () => {
      subscription.unsubscribe()
    }
  }, [fetchProfile])

  // Debug admin functions
  useEffect(() => {
    if (typeof window !== 'undefined') {
      (window as any).enableAdmin = () => {
        localStorage.setItem('admin_mode', 'true')
        window.location.reload()
      }
      ;(window as any).disableAdmin = () => {
        localStorage.removeItem('admin_mode')
        window.location.reload()
      }
    }
  }, [])

  const login = useCallback(async (email: string, password: string) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) return { error: error.message }

    if (data.user) {
      setUser(data.user)
      await fetchProfile(data.user.id, data.user.email, data.user.user_metadata)
    }

    return {}
  }, [fetchProfile])

  const register = useCallback(async (email: string, password: string, formData: Record<string, string>) => {
    // Use production URL for email confirmation redirect
    const redirectUrl = typeof window !== 'undefined' 
      ? `${window.location.origin}/#/login`
      : 'https://swarm-ehde.vercel.app/#/login';
    
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: {
          full_name: formData.full_name || '',
          user_type: formData.user_type || 'personal_natural',
        },
      },
    })

    if (error) return { error: error.message }

    // DB only accepts: admin, distributor, visitor
    const dbRole = 'distributor'

    if (data.user) {
      const { error: profileError } = await supabase.from('users').insert({
        id: data.user.id,
        email,
        full_name: formData.full_name || '',
        company_name: formData.company_name || '',
        phone: formData.phone || '',
        country: formData.country || '',
        city: formData.city || '',
        role: dbRole,
        is_active: true,
      })

      if (profileError) {
        console.error('Error creating profile:', profileError)
      }

      setUser(data.user)
      await fetchProfile(data.user.id, data.user.email, data.user.user_metadata)
    }

    return {}
  }, [fetchProfile])

  const logout = useCallback(async () => {
    await supabase.auth.signOut()
    localStorage.removeItem('admin_mode')
    setUser(null)
    setProfile(null)
    setRole('visitor')
  }, [])

  return {
    user,
    profile,
    role,
    isLoading,
    isLoggedIn: !!user || localStorage.getItem('admin_mode') === 'true',
    isAdmin: role === 'admin',
    isPersonalNatural: role === 'personal_natural',
    isInstalador: role === 'instalador',
    isDistribuidor: role === 'distribuidor_acs',
    canSeeDistribuidorPrices: role === 'instalador' || role === 'distribuidor_acs' || role === 'admin',
    login,
    register,
    logout,
  }
}
