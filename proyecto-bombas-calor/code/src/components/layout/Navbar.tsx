'use client'

import Link from 'next/link'
import { useState } from 'react'
import { Menu, X } from 'lucide-react'

interface NavbarProps {
  session: any
}

export function Navbar({ session }: NavbarProps) {
  const [mobileOpen, setMobileOpen] = useState(false)

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link href="/" className="text-xl font-bold text-primary-dark">
              Bombas de Calor LATAM
            </Link>
          </div>
          
          <div className="hidden md:flex items-center gap-6">
            <Link href="/productos" className="text-gray-700 hover:text-primary-dark transition">
              Productos
            </Link>
            <Link href="/como-trabajamos" className="text-gray-700 hover:text-primary-dark transition">
              Cómo Trabajamos
            </Link>
            <Link href="/distribuidores" className="text-gray-700 hover:text-primary-dark transition">
              Distribuidores
            </Link>
            <Link href="/herramientas" className="text-gray-700 hover:text-primary-dark transition">
              Herramientas
            </Link>
            {session ? (
              <Link 
                href="/admin"
                className="bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-primary transition"
              >
                Admin
              </Link>
            ) : (
              <Link 
                href="/login"
                className="bg-primary-dark text-white px-4 py-2 rounded-lg hover:bg-primary transition"
              >
                Login
              </Link>
            )}
          </div>

          <div className="flex md:hidden items-center">
            <button 
              onClick={() => setMobileOpen(!mobileOpen)}
              className="text-gray-700"
            >
              {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-white border-t">
          <div className="px-4 py-2 space-y-1">
            <Link href="/productos" className="block py-2 text-gray-700">Productos</Link>
            <Link href="/como-trabajamos" className="block py-2 text-gray-700">Cómo Trabajamos</Link>
            <Link href="/distribuidores" className="block py-2 text-gray-700">Distribuidores</Link>
            <Link href="/herramientas" className="block py-2 text-gray-700">Herramientas</Link>
            <Link href="/login" className="block py-2 text-primary-dark font-semibold">Login</Link>
          </div>
        </div>
      )}
    </nav>
  )
}
