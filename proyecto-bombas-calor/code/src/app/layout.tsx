import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'Bombas de Calor Latinoamérica | Formamos Distribuidores Exitosos',
  description: 'Fabricante de bombas de calor con acompañamiento completo. No solo vendemos productos, formamos distribuidores exitosos en Chile, México, Colombia.',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>{children}</body>
    </html>
  )
}
