import { useState, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { DbLead } from '@/lib/supabase'
import { toast } from 'sonner'

export interface LeadInput {
  name: string
  email: string
  phone?: string
  company?: string
  country?: string
  city?: string
  message?: string
  source: string
}

export function useLeads() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(false)
  const [leads, setLeads] = useState<DbLead[]>([])

  const createLead = useCallback(async (leadData: LeadInput): Promise<boolean> => {
    setIsSubmitting(true)

    const { error } = await supabase.from('leads').insert({
      name: leadData.name,
      email: leadData.email,
      phone: leadData.phone || null,
      company: leadData.company || null,
      country: leadData.country || null,
      city: leadData.city || null,
      message: leadData.message || null,
      source: leadData.source,
      status: 'new',
    })

    setIsSubmitting(false)

    if (error) {
      toast.error('Error al enviar: ' + error.message)
      return false
    }

    toast.success('Informacion enviada correctamente')
    return true
  }, [])

  const fetchLeads = useCallback(async () => {
    setIsLoading(true)

    const { data, error } = await supabase
      .from('leads')
      .select('*')
      .order('created_at', { ascending: false })

    if (error) {
      toast.error('Error al cargar leads: ' + error.message)
    } else {
      setLeads(data as DbLead[] || [])
    }

    setIsLoading(false)
  }, [])

  const updateLeadStatus = useCallback(async (id: number, status: DbLead['status']) => {
    const { error } = await supabase
      .from('leads')
      .update({ status })
      .eq('id', id)

    if (error) {
      toast.error('Error al actualizar: ' + error.message)
      return false
    }

    setLeads(prev =>
      prev.map(l => l.id === id ? { ...l, status } as DbLead : l)
    )
    toast.success('Estado actualizado')
    return true
  }, [])

  return {
    leads,
    isSubmitting,
    isLoading,
    createLead,
    fetchLeads,
    updateLeadStatus,
  }
}

export function useAdminData() {
  const [users, setUsers] = useState<any[]>([])
  const [products, setProducts] = useState<any[]>([])
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalProducts: 0,
    totalLeads: 0,
    totalDistributors: 0,
  })
  const [isLoading, setIsLoading] = useState(false)

  const fetchAllData = useCallback(async () => {
    setIsLoading(true)

    // Fetch users
    const { data: usersData } = await supabase
      .from('users')
      .select('*')
      .order('created_at', { ascending: false })

    // Fetch products
    const { data: productsData } = await supabase
      .from('products')
      .select('*')
      .order('id', { ascending: true })

    // Fetch leads count
    const { count: leadsCount } = await supabase
      .from('leads')
      .select('*', { count: 'exact', head: true })

    // Fetch distributors count
    const { count: distCount } = await supabase
      .from('users')
      .select('*', { count: 'exact', head: true })
      .eq('role', 'distributor')

    setUsers(usersData || [])
    setProducts(productsData || [])
    setStats({
      totalUsers: usersData?.length || 0,
      totalProducts: productsData?.length || 0,
      totalLeads: leadsCount || 0,
      totalDistributors: distCount || 0,
    })

    setIsLoading(false)
  }, [])

  const updateUserRole = useCallback(async (userId: string, role: string) => {
    const { error } = await supabase
      .from('users')
      .update({ role })
      .eq('id', userId)

    if (error) {
      toast.error('Error al actualizar rol: ' + error.message)
      return false
    }

    setUsers(prev =>
      prev.map(u => u.id === userId ? { ...u, role } : u)
    )
    toast.success('Rol actualizado')
    return true
  }, [])

  return {
    users,
    products,
    stats,
    isLoading,
    fetchAllData,
    updateUserRole,
  }
}
