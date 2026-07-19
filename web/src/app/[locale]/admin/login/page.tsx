'use client';

import {useState} from 'react';
import {useAuth} from '@/components/auth/AuthContext';
import {useRouter} from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const {login} = useAuth();
  const router = useRouter();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    setTimeout(() => {
      const success = login(email, password);
      if (success) {
        router.push('/admin');
      } else {
        setError('Credenciales incorrectas');
        setLoading(false);
      }
    }, 500);
  };

  return (
    <div className="flex min-h-[calc(100vh-300px)] items-center justify-center bg-gray-50 px-4">
      <div className="w-full max-w-md">
        <div className="rounded-2xl bg-white p-8 shadow-xl">
          <div className="mb-6 text-center">
            <h1 className="mb-2 text-2xl font-bold text-[#1E3A5F]">Panel de Administración</h1>
            <p className="text-sm text-gray-600">NAE - New Age Energy</p>
          </div>

          {error && (
            <div className="mb-4 rounded-lg bg-red-50 p-3 text-sm text-red-600">
              {error}
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20"
                placeholder="admin@nae.com"
                required
              />
            </div>

            <div>
              <label className="mb-1 block text-sm font-medium text-gray-700">Contraseña</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full rounded-lg border border-gray-300 px-4 py-2 focus:border-[#1E3A5F] focus:outline-none focus:ring-2 focus:ring-[#1E3A5F]/20"
                placeholder="••••••••"
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full rounded-lg bg-[#1E3A5F] py-3 text-sm font-bold text-white transition hover:bg-[#152d4a] disabled:opacity-50"
            >
              {loading ? 'Ingresando...' : 'Ingresar al panel'}
            </button>
          </form>

          <div className="mt-6 rounded-lg bg-amber-50 p-3 text-xs text-amber-800">
            <p className="font-bold">Demo credentials:</p>
            <p>Email: admin@nae.com</p>
            <p>Password: nae2024admin</p>
          </div>
        </div>
      </div>
    </div>
  );
}
