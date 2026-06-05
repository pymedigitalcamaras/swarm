import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { supabase } from '@/lib/supabase'
import { Loader2, Check, X } from 'lucide-react'

/**
 * AuthCallback - Handles email confirmation redirects from Supabase
 * Supabase sends users to this page with an access_token in the URL hash
 * after they click the confirmation link in their email.
 */
export default function AuthCallback() {
  const navigate = useNavigate()
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading')
  const [message, setMessage] = useState('Procesando confirmación...')

  useEffect(() => {
    const handleCallback = async () => {
      // Get hash fragment from URL (Supabase sends tokens here)
      const hash = window.location.hash
      
      if (hash.includes('access_token') || hash.includes('type=signup') || hash.includes('type=recovery')) {
        // Supabase JS client automatically handles the hash and sets the session
        const { data: { session }, error } = await supabase.auth.getSession()
        
        if (error) {
          console.error('Auth callback error:', error)
          setStatus('error')
          setMessage('Error al confirmar tu cuenta. Intenta iniciar sesión manualmente.')
          return
        }

        if (session?.user) {
          // User is confirmed and logged in!
          setStatus('success')
          setMessage('¡Cuenta confirmada exitosamente! Redirigiendo...')
          
          // Create/update user profile in our users table
          const { error: profileError } = await supabase
            .from('users')
            .upsert({
              id: session.user.id,
              email: session.user.email,
              role: 'personal_natural', // Default role
              is_active: true,
            }, { onConflict: 'id' })
          
          if (profileError) {
            console.error('Profile upsert error:', profileError)
          }

          // Redirect to products after 2 seconds
          setTimeout(() => {
            navigate('/productos')
          }, 2000)
        } else {
          // No session found, try to extract from hash manually
          setStatus('error')
          setMessage('No se pudo confirmar la sesión. Intenta iniciar sesión.')
        }
      } else {
        // No token in URL, maybe user landed here directly
        const { data: { session } } = await supabase.auth.getSession()
        if (session) {
          setStatus('success')
          setMessage('Sesión activa. Redirigiendo...')
          setTimeout(() => navigate('/productos'), 1500)
        } else {
          setStatus('error')
          setMessage('Token no encontrado. Intenta iniciar sesión.')
          setTimeout(() => navigate('/login'), 3000)
        }
      }
    }

    handleCallback()
  }, [navigate])

  return (
    <div
      className="min-h-screen flex items-center justify-center"
      style={{ backgroundColor: '#0f0f12' }}
    >
      <div className="text-center p-8 max-w-md">
        {status === 'loading' && (
          <>
            <Loader2 size={48} className="animate-spin mx-auto mb-4" style={{ color: '#1548a0' }} />
            <h2 className="text-xl font-bold uppercase mb-2" style={{ color: '#ffffff' }}>
              Confirmando tu cuenta
            </h2>
            <p style={{ color: '#94a3b8' }}>{message}</p>
          </>
        )}

        {status === 'success' && (
          <>
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: '#ecfdf5' }}
            >
              <Check size={32} style={{ color: '#2a9d8f' }} />
            </div>
            <h2 className="text-xl font-bold uppercase mb-2" style={{ color: '#2a9d8f' }}>
              ¡Cuenta confirmada!
            </h2>
            <p style={{ color: '#94a3b8' }}>{message}</p>
          </>
        )}

        {status === 'error' && (
          <>
            <div
              className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center"
              style={{ backgroundColor: '#fef2f2' }}
            >
              <X size={32} style={{ color: '#e63946' }} />
            </div>
            <h2 className="text-xl font-bold uppercase mb-2" style={{ color: '#e63946' }}>
              Error de confirmación
            </h2>
            <p style={{ color: '#94a3b8' }}>{message}</p>
          </>
        )}
      </div>
    </div>
  )
}
