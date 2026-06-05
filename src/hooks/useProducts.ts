import { useState, useEffect, useCallback } from 'react'
import { supabase } from '@/lib/supabase'
import type { DbProduct } from '@/lib/supabase'

export interface Product {
  id: number
  slug: string
  category: string
  categoryLabel: string
  name: string
  specs: string
  image: string
  badges: { label: string; color: 'teal' | 'amber' | 'red' }[]
  price: number | null
  salePrice: number | null
  priceLocked: boolean
}

// Category name mapping
const categoryNames: Record<number, string> = {
  1: 'Aerotermia',
  2: 'Geotermia',
  3: 'ACS',
  4: 'Industrial',
  5: 'Piscinas',
}

function formatSpecs(specs: unknown): string {
  if (typeof specs === 'string') return specs
  if (specs && typeof specs === 'object') {
    const s = specs as Record<string, unknown>
    const parts: string[] = []
    if (s.cop) parts.push(`COP ${s.cop}`)
    if (s.power_kw) parts.push(`${s.power_kw}kW`)
    if (s.refrigerant) parts.push(`${s.refrigerant}`)
    if (s.capacity) parts.push(`${s.capacity}L`)
    if (s.range) parts.push(`${s.range}`)
    if (s.application) parts.push(`${s.application}`)
    return parts.join(' · ') || JSON.stringify(specs)
  }
  return ''
}

function mapDbProduct(db: DbProduct): Product {
  const benefits = db.benefits || []
  const badges = benefits.map((b: { title?: string }) => ({
    label: b.title || '',
    color: 'teal' as const,
  })).filter(b => b.label)

  return {
    id: db.id,
    slug: db.slug,
    category: categoryNames[db.category_id] || 'General',
    categoryLabel: categoryNames[db.category_id] || 'General',
    name: db.name,
    specs: formatSpecs(db.specs),
    image: db.primary_image_url || '',
    badges: badges.length > 0 ? badges : [{ label: 'ALTA EFICIENCIA', color: 'teal' as const }],
    price: db.price,
    salePrice: db.sale_price,
    priceLocked: true,
  }
}

export function useProducts() {
  const [products, setProducts] = useState<Product[]>([])
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProducts = useCallback(async () => {
    setIsLoading(true)
    setError(null)

    const { data, error: dbError } = await supabase
      .from('products')
      .select('*')
      .eq('is_active', true)
      .order('id', { ascending: true })

    if (dbError) {
      setError(dbError.message)
      setProducts([])
    } else {
      setProducts((data as DbProduct[] || []).map(mapDbProduct))
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])

  return { products, isLoading, error, refetch: fetchProducts }
}

export function useProductBySlug(slug: string | undefined) {
  const [product, setProduct] = useState<Product | null>(null)
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  const fetchProduct = useCallback(async (productSlug: string) => {
    setIsLoading(true)
    setError(null)

    const { data, error: dbError } = await supabase
      .from('products')
      .select('*')
      .eq('slug', productSlug)
      .eq('is_active', true)
      .single()

    if (dbError) {
      setError(dbError.message)
      setProduct(null)
    } else if (data) {
      setProduct(mapDbProduct(data as DbProduct))
    } else {
      setProduct(null)
    }

    setIsLoading(false)
  }, [])

  useEffect(() => {
    if (slug) {
      fetchProduct(slug)
    }
  }, [slug, fetchProduct])

  return { product, isLoading, error }
}
