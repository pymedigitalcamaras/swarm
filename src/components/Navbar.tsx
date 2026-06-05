import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Menu, X, ShieldCheck } from 'lucide-react';
import { navLinks } from '@/lib/data';
import { useAuthContext } from '@/context/AuthContext';

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const location = useLocation();
  const { user, profile, isAdmin, role, logout } = useAuthContext();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [mobileOpen]);

  const handleLogout = async () => {
    await logout();
    setMobileOpen(false);
  };

  const displayName = profile?.full_name || user?.email?.split('@')[0] || 'Usuario';

  return (
    <>
      <nav
        className="fixed top-0 left-0 right-0 z-50 transition-all duration-300"
        style={{
          backgroundColor: scrolled ? 'rgba(15,15,18,0.95)' : 'transparent',
          backdropFilter: scrolled ? 'blur(16px)' : 'none',
          WebkitBackdropFilter: scrolled ? 'blur(16px)' : 'none',
          borderBottom: scrolled ? '1px solid rgba(255,255,255,0.08)' : '1px solid transparent',
        }}
      >
        <div className="container-tp flex items-center justify-between" style={{ height: '72px' }}>
          {/* Brand - NAE text only, no oval */}
          <Link
            to="/"
            className="text-white font-black text-2xl tracking-tight uppercase"
            style={{ fontFamily: 'Inter, sans-serif', letterSpacing: '0.05em' }}
          >
            NAE
          </Link>

          {/* Desktop Nav Links */}
          <div className="hidden lg:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white/70 hover:text-white transition-colors duration-200 text-xs font-medium uppercase link-underline"
                style={{ letterSpacing: '0.08em' }}
              >
                {link.label}
              </Link>
            ))}
          </div>

          {/* Desktop Actions */}
          <div className="hidden lg:flex items-center gap-4">
            {isAdmin && (
              <Link
                to="/admin"
                className="flex items-center gap-1.5 text-xs font-semibold uppercase transition-colors duration-200"
                style={{ letterSpacing: '0.08em', color: '#f59e0b' }}
              >
                <ShieldCheck size={14} />
                ADMIN
              </Link>
            )}
            {(role === 'instalador' || role === 'distribuidor_acs') && !isAdmin && (
              <span
                className="flex items-center gap-1.5 text-xs font-semibold uppercase"
                style={{ letterSpacing: '0.08em', color: '#2a9d8f' }}
              >
                DISTRIBUIDOR
              </span>
            )}
            {user ? (
              <>
                <span className="text-white/70 text-xs font-medium uppercase" style={{ letterSpacing: '0.05em' }}>
                  {displayName}
                </span>
                <button
                  onClick={handleLogout}
                  className="text-white/80 hover:text-white text-xs font-medium uppercase transition-colors duration-200"
                  style={{ letterSpacing: '0.08em' }}
                >
                  SALIR
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="text-white/80 hover:text-white text-xs font-medium uppercase transition-colors duration-200"
                  style={{ letterSpacing: '0.08em' }}
                >
                  INGRESAR
                </Link>
                <Link
                  to="/registro"
                  className="text-white text-xs font-semibold uppercase px-5 py-2 rounded transition-all duration-200 hover:brightness-110"
                  style={{ backgroundColor: '#e63946', letterSpacing: '0.05em' }}
                >
                  REGISTRARSE
                </Link>
              </>
            )}
          </div>

          {/* Mobile Hamburger */}
          <button
            className="lg:hidden text-white p-2"
            onClick={() => setMobileOpen(true)}
            aria-label="Open menu"
          >
            <Menu size={24} />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Overlay */}
      <div
        className={`fixed inset-0 z-[60] lg:hidden transition-opacity duration-300 ${mobileOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'}`}
        style={{ backgroundColor: '#0f0f12' }}
      >
        <div className="flex flex-col h-full">
          <div className="flex items-center justify-between container-tp" style={{ height: '72px' }}>
            <span className="text-white font-extrabold text-xl uppercase">THERMAPRO</span>
            <button
              className="text-white p-2"
              onClick={() => setMobileOpen(false)}
              aria-label="Close menu"
            >
              <X size={24} />
            </button>
          </div>

          <div className="flex-1 flex flex-col items-center justify-center gap-8">
            {navLinks.map((link, i) => (
              <Link
                key={link.path}
                to={link.path}
                className="text-white font-bold text-2xl uppercase transition-all duration-400"
                style={{
                  transitionDelay: mobileOpen ? `${i * 0.08}s` : '0s',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                {link.label}
              </Link>
            ))}
            {isAdmin && (
              <Link
                to="/admin"
                className="font-bold text-2xl uppercase transition-all duration-400 flex items-center gap-2"
                style={{
                  color: '#f59e0b',
                  transitionDelay: mobileOpen ? `${navLinks.length * 0.08}s` : '0s',
                  opacity: mobileOpen ? 1 : 0,
                  transform: mobileOpen ? 'translateY(0)' : 'translateY(20px)',
                }}
              >
                <ShieldCheck size={24} />
                ADMIN
              </Link>
            )}
          </div>

          <div className="pb-8 flex flex-col items-center gap-4">
            {user ? (
              <>
                <span className="text-white/70 text-sm font-medium uppercase">
                  {displayName}
                </span>
                {isAdmin && (
                  <span className="text-xs font-semibold uppercase" style={{ color: '#f59e0b' }}>
                    ADMIN
                  </span>
                )}
                {(role === 'instalador' || role === 'distribuidor_acs') && !isAdmin && (
                  <span className="text-xs font-semibold uppercase" style={{ color: '#2a9d8f' }}>
                    DISTRIBUIDOR
                  </span>
                )}
                <button
                  onClick={handleLogout}
                  className="text-white/70 hover:text-white text-sm font-medium uppercase transition-colors duration-200"
                >
                  CERRAR SESIÓN
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/registro"
                  className="text-white text-sm font-semibold uppercase px-8 py-3 rounded transition-all duration-200 hover:brightness-110"
                  style={{ backgroundColor: '#e63946' }}
                >
                  REGISTRARSE
                </Link>
                <Link
                  to="/login"
                  className="text-white/70 hover:text-white text-sm font-medium uppercase transition-colors duration-200"
                >
                  INGRESAR
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
