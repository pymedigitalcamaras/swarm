-- Tabla de leads (captura de leads desde la calculadora)
CREATE TABLE IF NOT EXISTS leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  name TEXT NOT NULL,
  company TEXT,
  email TEXT NOT NULL,
  phone TEXT,
  whatsapp TEXT,
  country TEXT,
  project_type TEXT,
  m2 INTEGER,
  liters INTEGER,
  building_type TEXT,
  has_solar BOOLEAN DEFAULT FALSE,
  recommended_products TEXT[],
  estimated_savings TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de intereses de cotización (desde el catálogo)
CREATE TABLE IF NOT EXISTS quote_requests (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  product_id INTEGER NOT NULL,
  product_model TEXT NOT NULL,
  name TEXT NOT NULL,
  email TEXT NOT NULL,
  phone TEXT,
  company TEXT,
  country TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Tabla de newsletter subscriptions
CREATE TABLE IF NOT EXISTS newsletter_subscribers (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Políticas RLS (Row Level Security) - permite inserciones anónimas
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;
ALTER TABLE quote_requests ENABLE ROW LEVEL SECURITY;
ALTER TABLE newsletter_subscribers ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Allow anonymous inserts" ON leads
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts" ON quote_requests
  FOR INSERT TO anon WITH CHECK (true);
CREATE POLICY "Allow anonymous inserts" ON newsletter_subscribers
  FOR INSERT TO anon WITH CHECK (true);

-- Permite lectura solo a usuarios autenticados (para el panel admin)
CREATE POLICY "Allow authenticated reads" ON leads
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated reads" ON quote_requests
  FOR SELECT TO authenticated USING (true);
CREATE POLICY "Allow authenticated reads" ON newsletter_subscribers
  FOR SELECT TO authenticated USING (true);
