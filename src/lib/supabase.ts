import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://tqkycxorhlajgbgbfhry.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxa3ljeG9yaGxhamdiZ2JmaHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1OTE2MDYsImV4cCI6MjA5NjE2NzYwNn0.Vx6i7ZYvKIkIO4UxwyFOr5J-y2SiRtuK1lcvnbtG2eE'

export const supabase = createClient(supabaseUrl, supabaseKey)

// ── Database Types ──

export interface DbProduct {
  id: number
  slug: string
  category_id: number
  name: string
  short_description: string | null
  full_description: string | null
  specs: Record<string, unknown> | null
  benefits: { icon?: string; title: string; desc?: string }[] | null
  price: number | null
  sale_price: number | null
  currency: string | null
  primary_image_url: string | null
  gallery: string[] | null
  is_featured: boolean
  is_active: boolean
  sort_order: number
  created_at: string
}

export interface DbUserProfile {
  id: string
  email: string
  full_name: string | null
  phone: string | null
  country: string | null
  city: string | null
  company: string | null
  role: 'visitor' | 'distributor' | 'admin'
  created_at: string
}

export interface DbLead {
  id: number
  name: string
  email: string
  phone: string | null
  company: string | null
  country: string | null
  city: string | null
  message: string | null
  source: string
  status: 'new' | 'contacted' | 'qualified' | 'converted' | 'lost'
  created_at: string
}
