import { Link } from 'react-router-dom';
import { Linkedin, Youtube, Instagram } from 'lucide-react';

const productLinks = [
  { label: 'Aerotermia Residencial', path: '/productos' },
  { label: 'Geotermia Industrial', path: '/productos' },
  { label: 'ACS (Agua Caliente)', path: '/productos' },
  { label: 'Piscinas', path: '/productos' },
  { label: 'Accesorios', path: '/productos' },
];

const companyLinks = [
  { label: 'Nosotros', path: '/nosotros' },
  { label: 'Casos de Exito', path: '/casos' },
  { label: 'Blog / Recursos', path: '/nosotros' },
  { label: 'Contacto', path: '/contacto' },
];

const distributorLinks = [
  { label: 'Programa de Distribuidores', path: '/distribuidor' },
  { label: 'Registrarse', path: '/registro' },
  { label: 'Portal de Partners', path: '/login' },
  { label: 'Soporte Tecnico', path: '/contacto' },
];

export default function Footer() {
  return (
    <footer style={{ backgroundColor: '#0f0f12' }}>
      <div className="container-tp" style={{ paddingTop: '4rem', paddingBottom: '2rem' }}>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8">
          {/* Col 1: Brand */}
          <div>
            <Link to="/" className="text-white font-extrabold text-2xl uppercase tracking-tight">
              THERMAPRO
            </Link>
            <p className="mt-3 text-sm" style={{ color: 'rgba(255,255,255,0.5)' }}>
              Tecnologia termica para Latinoamerica
            </p>
            <div className="flex items-center gap-4 mt-6">
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <Linkedin size={20} />
              </a>
              <a
                href="https://youtube.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <Youtube size={20} />
              </a>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
                className="transition-colors duration-200"
                style={{ color: 'rgba(255,255,255,0.5)' }}
                onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
              >
                <Instagram size={20} />
              </a>
            </div>
          </div>

          {/* Col 2: Products */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase mb-4" style={{ letterSpacing: '0.08em' }}>
              PRODUCTOS
            </h4>
            <ul className="space-y-3">
              {productLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200 link-underline"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Company */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase mb-4" style={{ letterSpacing: '0.08em' }}>
              COMPANIA
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200 link-underline"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Distributors */}
          <div>
            <h4 className="text-white font-semibold text-sm uppercase mb-4" style={{ letterSpacing: '0.08em' }}>
              DISTRIBUIDORES
            </h4>
            <ul className="space-y-3">
              {distributorLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.path}
                    className="text-sm transition-colors duration-200 link-underline"
                    style={{ color: 'rgba(255,255,255,0.5)' }}
                    onMouseEnter={(e) => { e.currentTarget.style.color = '#fff'; }}
                    onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.5)'; }}
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div
          className="mt-12 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          <p className="text-xs" style={{ color: 'rgba(255,255,255,0.4)' }}>
            &copy; 2025 ThermaPro. Todos los derechos reservados.
          </p>
          <div className="flex items-center gap-4">
            <Link
              to="/"
              className="text-xs transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              Politica de Privacidad
            </Link>
            <span style={{ color: 'rgba(255,255,255,0.2)' }}>&middot;</span>
            <Link
              to="/"
              className="text-xs transition-colors duration-200"
              style={{ color: 'rgba(255,255,255,0.4)' }}
              onMouseEnter={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.7)'; }}
              onMouseLeave={(e) => { e.currentTarget.style.color = 'rgba(255,255,255,0.4)'; }}
            >
              Terminos de Uso
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
