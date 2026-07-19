-- =====================================================
-- BOMBAS DE CALOR LATAM - Esquema Inicial
-- Supabase PostgreSQL
-- =====================================================

-- =====================================================
-- EXTENSIONS
-- =====================================================
create extension if not exists "uuid-ossp";

-- =====================================================
-- ENUMS
-- =====================================================
do $$ begin
    create type user_role as enum ('visitor', 'distributor', 'admin');
exception when duplicate_object then null;
end $$;

do $$ begin
    create type lead_status as enum ('new', 'contacted', 'qualified', 'converted', 'lost');
exception when duplicate_object then null;
end $$;

-- =====================================================
-- TABLA: CATEGORÍAS DE PRODUCTOS
-- =====================================================
create table if not exists categories (
    id uuid default uuid_generate_v4() primary key,
    name varchar(100) not null,
    slug varchar(100) unique not null,
    description text,
    image_url text,
    sort_order integer default 0,
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- =====================================================
-- TABLA: PRODUCTOS
-- =====================================================
create table if not exists products (
    id uuid default uuid_generate_v4() primary key,
    name varchar(200) not null,
    slug varchar(200) unique not null,
    category_id uuid references categories(id) on delete set null,
    
    short_description varchar(500),
    full_description text,
    specs jsonb default '{}',
    benefits jsonb default '[]',
    
    price decimal(10,2),
    currency varchar(3) default 'USD',
    primary_image_url text,
    
    meta_title varchar(200),
    meta_description varchar(500),
    
    is_featured boolean default false,
    is_active boolean default true,
    sort_order integer default 0,
    
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- =====================================================
-- TABLA: IMÁGENES DE PRODUCTOS
-- =====================================================
create table if not exists product_images (
    id uuid default uuid_generate_v4() primary key,
    product_id uuid not null references products(id) on delete cascade,
    url text not null,
    alt_text varchar(200),
    sort_order integer default 0,
    is_primary boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- =====================================================
-- TABLA: USUARIOS (Extiende auth.users de Supabase)
-- =====================================================
create table if not exists public.users (
    id uuid references auth.users(id) on delete cascade primary key,
    email varchar(255) not null unique,
    full_name varchar(200),
    company_name varchar(200),
    phone varchar(50),
    country varchar(100),
    city varchar(100),
    role user_role default 'visitor',
    is_active boolean default true,
    email_verified boolean default false,
    crm_id varchar(100),
    source varchar(100) default 'website',
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- =====================================================
-- TABLA: LEADS / CONTACTOS CRM
-- =====================================================
create table if not exists leads (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete set null,
    name varchar(200),
    email varchar(255),
    phone varchar(50),
    company varchar(200),
    country varchar(100),
    product_id uuid references products(id) on delete set null,
    status lead_status default 'new',
    source varchar(100) default 'website',
    utm_source varchar(100),
    utm_medium varchar(100),
    utm_campaign varchar(100),
    notes text,
    assigned_to uuid references public.users(id),
    contacted_at timestamp with time zone,
    converted_at timestamp with time zone,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- =====================================================
-- TABLA: SLIDES DEL HERO
-- =====================================================
create table if not exists hero_slides (
    id uuid default uuid_generate_v4() primary key,
    title varchar(200) not null,
    subtitle varchar(500),
    description text,
    image_url text not null,
    image_mobile_url text,
    cta_text varchar(100) default 'Ver productos',
    cta_link varchar(200) default '/productos',
    secondary_cta_text varchar(100),
    secondary_cta_link varchar(200),
    overlay_color varchar(50) default 'rgba(0,0,0,0.4)',
    text_color varchar(50) default '#ffffff',
    is_active boolean default true,
    sort_order integer default 0,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- =====================================================
-- TABLA: CONTENIDO EDITABLE (CMS)
-- =====================================================
create table if not exists site_content (
    id uuid default uuid_generate_v4() primary key,
    key varchar(100) unique not null,
    section varchar(100) not null,
    content jsonb default '{}',
    description varchar(255),
    is_active boolean default true,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- =====================================================
-- TABLA: ACTIVIDAD DE USUARIOS (Analytics)
-- =====================================================
create table if not exists user_activity (
    id uuid default uuid_generate_v4() primary key,
    user_id uuid references public.users(id) on delete set null,
    session_id varchar(100),
    action varchar(100) not null,
    page varchar(200),
    element varchar(100),
    metadata jsonb default '{}',
    user_agent text,
    ip_address inet,
    created_at timestamp with time zone default timezone('utc'::text, now())
);

-- =====================================================
-- TABLA: CONFIGURACIÓN DEL SITIO
-- =====================================================
create table if not exists site_config (
    id uuid default uuid_generate_v4() primary key,
    key varchar(100) unique not null,
    value text,
    value_type varchar(20) default 'string',
    description varchar(255),
    is_public boolean default false,
    created_at timestamp with time zone default timezone('utc'::text, now()),
    updated_at timestamp with time zone default timezone('utc'::text, now())
);

-- =====================================================
-- INDEXES
-- =====================================================
create index if not exists idx_products_category on products(category_id);
create index if not exists idx_products_slug on products(slug);
create index if not exists idx_products_is_active on products(is_active);
create index if not exists idx_products_is_featured on products(is_featured);
create index if not exists idx_product_images_product on product_images(product_id);
create index if not exists idx_leads_user on leads(user_id);
create index if not exists idx_leads_status on leads(status);
create index if not exists idx_leads_email on leads(email);
create index if not exists idx_user_activity_user on user_activity(user_id);
create index if not exists idx_user_activity_action on user_activity(action);
create index if not exists idx_users_role on public.users(role);
create index if not exists idx_users_email on public.users(email);

-- =====================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- =====================================================
alter table products enable row level security;
alter table product_images enable row level security;
alter table public.users enable row level security;
alter table leads enable row level security;
alter table hero_slides enable row level security;
alter table site_content enable row level security;
alter table user_activity enable row level security;
alter table site_config enable row level security;

-- Products: Todos pueden leer activos, admin todo
create policy "Products public read"
    on products for select
    using (is_active = true);

create policy "Products admin all"
    on products for all
    using (auth.uid() in (select id from public.users where role = 'admin'));

-- Product Images
create policy "Product images public read"
    on product_images for select
    using (true);

create policy "Product images admin all"
    on product_images for all
    using (auth.uid() in (select id from public.users where role = 'admin'));

-- Users: Solo admin puede listar, cada uno su propio perfil
create policy "Users self read"
    on public.users for select
    using (auth.uid() = id);

create policy "Users self update"
    on public.users for update
    using (auth.uid() = id);

create policy "Users admin all"
    on public.users for all
    using (auth.uid() in (select id from public.users where role = 'admin'));

-- Leads: Solo admin
create policy "Leads admin all"
    on leads for all
    using (auth.uid() in (select id from public.users where role = 'admin'));

-- Hero Slides
create policy "Hero slides public read"
    on hero_slides for select
    using (is_active = true);

create policy "Hero slides admin all"
    on hero_slides for all
    using (auth.uid() in (select id from public.users where role = 'admin'));

-- Site Content
create policy "Site content public read"
    on site_content for select
    using (is_active = true);

create policy "Site content admin all"
    on site_content for all
    using (auth.uid() in (select id from public.users where role = 'admin'));

-- =====================================================
-- FUNCTIONS & TRIGGERS
-- =====================================================
create or replace function update_updated_at_column()
returns trigger as $$
begin
    new.updated_at = timezone('utc'::text, now());
    return new;
end;
$$ language plpgsql;

create trigger update_products_updated_at
    before update on products
    for each row execute function update_updated_at_column();

create trigger update_categories_updated_at
    before update on categories
    for each row execute function update_updated_at_column();

create trigger update_users_updated_at
    before update on public.users
    for each row execute function update_updated_at_column();

create trigger update_leads_updated_at
    before update on leads
    for each row execute function update_updated_at_column();

create trigger update_hero_slides_updated_at
    before update on hero_slides
    for each row execute function update_updated_at_column();

create trigger update_site_content_updated_at
    before update on site_content
    for each row execute function update_updated_at_column();

create trigger update_site_config_updated_at
    before update on site_config
    for each row execute function update_updated_at_column();

-- Trigger: crear public.users al registrarse en auth
create or replace function public.handle_new_user()
returns trigger as $$
begin
    insert into public.users (id, email, full_name, role, source)
    values (
        new.id,
        new.email,
        coalesce(new.raw_user_meta_data->>'full_name', new.email),
        'visitor',
        coalesce(new.raw_user_meta_data->>'source', 'website')
    );
    return new;
end;
$$ language plpgsql security definer;

create trigger on_auth_user_created
    after insert on auth.users
    for each row execute function public.handle_new_user();

-- =====================================================
-- DATOS INICIALES (SEED)
-- =====================================================
insert into categories (name, slug, description, sort_order) values
('Aerotermia', 'aerotermia', 'Bombas de calor aire-agua para climatización', 1),
('Geotermia', 'geotermia', 'Bombas de calor suelo-agua de alta eficiencia', 2),
('ACS (Agua Caliente Sanitaria)', 'acs', 'Sistemas para producción de agua caliente', 3),
('Industrial', 'industrial', 'Soluciones para procesos industriales', 4),
('Piscinas', 'piscinas', 'Climatización de piscinas con eficiencia energética', 5);

insert into hero_slides (title, subtitle, image_url, cta_text, cta_link, sort_order) values
('El futuro de la calefacción está aquí', 
 'Bombas de calor de alta eficiencia para toda Latinoamérica. Tecnología europea, adaptada a tu mercado.',
 'https://images.unsplash.com/photo-1581094794329-c8112a89af12?w=1920',
 'Ver catálogo', '/productos', 1);

insert into site_config (key, value, description, is_public) values
('whatsapp_number', '+56990117784', 'Número de WhatsApp para contacto', true),
('company_name', 'Bombas de Calor LATAM', 'Nombre de la empresa', true),
('currency_default', 'USD', 'Moneda por defecto', true),
('login_required_for_prices', 'true', 'Requiere login para ver precios', true),
('crm_webhook_url', '', 'URL del webhook para enviar leads al CRM', false);
