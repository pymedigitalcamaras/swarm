import { useEffect, useState } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';
import {
  Users, Package, MessageSquare, TrendingUp,
  ShieldCheck, Loader2, Plus, Pencil, Trash2
} from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { useLeads, useAdminData } from '@/hooks/useLeads';
import {
  Table, TableBody, TableCell, TableHead, TableHeader, TableRow,
} from '@/components/ui/table';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import {
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter,
} from '@/components/ui/dialog';
import { supabase } from '@/lib/supabase';
import type { DbLead, DbUserProfile, DbProduct } from '@/lib/supabase';

/* ─── Status Badge ─── */
function LeadStatusBadge({ status }: { status: DbLead['status'] }) {
  const config = {
    new: { label: 'Nuevo', color: 'bg-blue-100 text-blue-700 border-blue-200' as const },
    contacted: { label: 'Contactado', color: 'bg-yellow-100 text-yellow-700 border-yellow-200' as const },
    qualified: { label: 'Calificado', color: 'bg-purple-100 text-purple-700 border-purple-200' as const },
    converted: { label: 'Convertido', color: 'bg-green-100 text-green-700 border-green-200' as const },
    lost: { label: 'Perdido', color: 'bg-red-100 text-red-700 border-red-200' as const },
  };
  const c = config[status] || config.new;
  return (
    <Badge variant="outline" className={`${c.color} text-xs font-medium capitalize`}>
      {c.label}
    </Badge>
  );
}

function RoleBadge({ role }: { role: string }) {
  const config: Record<string, { label: string; color: string }> = {
    admin: { label: 'ADMIN', color: 'bg-amber-100 text-amber-700 border-amber-200' },
    distribuidor_acs: { label: 'DISTRIBUIDOR ACS', color: 'bg-teal-100 text-teal-700 border-teal-200' },
    instalador: { label: 'INSTALADOR', color: 'bg-blue-100 text-blue-700 border-blue-200' },
    personal_natural: { label: 'PERSONAL NATURAL', color: 'bg-gray-100 text-gray-700 border-gray-200' },
    distributor: { label: 'DISTRIBUIDOR', color: 'bg-teal-100 text-teal-700 border-teal-200' },
    visitor: { label: 'VISITANTE', color: 'bg-gray-100 text-gray-700 border-gray-200' },
  };
  const c = config[role] || config.personal_natural;
  return (
    <Badge variant="outline" className={`${c.color} text-xs font-medium`}>
      {c.label}
    </Badge>
  );
}

function ProductStatusBadge({ isActive }: { isActive: boolean }) {
  return isActive ? (
    <Badge variant="outline" className="bg-green-100 text-green-700 border-green-200 text-xs font-medium">
      Activo
    </Badge>
  ) : (
    <Badge variant="outline" className="bg-red-100 text-red-700 border-red-200 text-xs font-medium">
      Inactivo
    </Badge>
  );
}

/* ─── Stat Card ─── */
const colorMap: Record<string, string> = {
  '#1548a0': 'text-blue-700 bg-blue-50',
  '#2a9d8f': 'text-teal-700 bg-teal-50',
  '#e63946': 'text-red-700 bg-red-50',
  '#f59e0b': 'text-amber-700 bg-amber-50',
};

function StatCard({ title, value, icon: Icon, color, isLoading }: {
  title: string;
  value: number | string;
  icon: React.ComponentType<{ size?: number; className?: string }>;
  color: string;
  isLoading: boolean;
}) {
  const colorClass = colorMap[color] || 'text-slate-700 bg-slate-50';
  return (
    <Card className="border-slate-200">
      <CardContent className="p-5">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-xs font-medium uppercase text-slate-500 tracking-wider">{title}</p>
            {isLoading ? (
              <Skeleton className="h-8 w-16 mt-2" />
            ) : (
              <p className="text-2xl font-bold text-slate-900 mt-1">{value}</p>
            )}
          </div>
          <div className={`flex items-center justify-center rounded-lg w-11 h-11 ${colorClass.split(' ')[1]}`}>
            <Icon size={22} className={colorClass.split(' ')[0]} />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

/* ─── Main Admin Dashboard ─── */
type TabType = 'leads' | 'users' | 'products';

// Debug bypass check (allows direct admin access during setup)
function isDebugAdmin(): boolean {
  if (typeof window === 'undefined') return false;
  return localStorage.getItem('admin_mode') === 'true';
}

export default function AdminDashboard() {
  const { isAdmin, isLoading: authLoading } = useAuthContext();
  const navigate = useNavigate();
  const { leads, isLoading: leadsLoading, fetchLeads, updateLeadStatus } = useLeads();
  const { users, products, stats, isLoading: adminDataLoading, fetchAllData, updateUserRole } = useAdminData();
  const [activeTab, setActiveTab] = useState<TabType>('leads');
  const [dataInitialized, setDataInitialized] = useState(false);
  
  // Product CRUD state
  const [productDialogOpen, setProductDialogOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState<DbProduct | null>(null);
  const [productForm, setProductForm] = useState({
    name: '', slug: '', category_id: '1', short_description: '', full_description: '',
    price: '', sale_price: '', primary_image_url: '/product-aeroterm.jpg',
    gallery: [] as string[],
    is_featured: false, is_active: true,
  });
  const [productFormErrors, setProductFormErrors] = useState<Record<string, string>>({});
  const [productSubmitting, setProductSubmitting] = useState(false);
  const [productDeleting, setProductDeleting] = useState<number | null>(null);
  
  // User creation state
  const [userDialogOpen, setUserDialogOpen] = useState(false);
  const [userForm, setUserForm] = useState({
    full_name: '', email: '', phone: '', country: '', city: '', company_name: '',
    role: 'personal_natural' as 'personal_natural' | 'instalador' | 'distribuidor_acs',
    password: '',
  });
  const [userFormErrors, setUserFormErrors] = useState<Record<string, string>>({});
  const [userSubmitting, setUserSubmitting] = useState(false);
  const [createdUserPassword, setCreatedUserPassword] = useState<string | null>(null);
  
  // Allow debug admin mode to bypass auth check
  const hasAccess = isAdmin || isDebugAdmin();

  // ─── Product CRUD Functions ───
  const resetProductForm = () => {
    setProductForm({
      name: '', slug: '', category_id: '1', short_description: '', full_description: '',
      price: '', sale_price: '', primary_image_url: '/product-aeroterm.jpg',
      gallery: [],
      is_featured: false, is_active: true,
    });
    setProductFormErrors({});
    setEditingProduct(null);
  };

  const openCreateProduct = () => {
    resetProductForm();
    setProductDialogOpen(true);
  };

  const openEditProduct = (product: DbProduct) => {
    setEditingProduct(product);
    setProductForm({
      name: product.name,
      slug: product.slug,
      category_id: String(product.category_id || 1),
      short_description: product.short_description || '',
      full_description: product.full_description || '',
      price: product.price !== null ? String(product.price) : '',
      sale_price: product.sale_price !== null ? String(product.sale_price) : '',
      primary_image_url: product.primary_image_url || '/product-aeroterm.jpg',
      gallery: product.gallery || [],
      is_featured: product.is_featured || false,
      is_active: product.is_active !== false,
    });
    setProductFormErrors({});
    setProductDialogOpen(true);
  };

  const validateProductForm = (): boolean => {
    const errors: Record<string, string> = {};
    if (!productForm.name.trim()) errors.name = 'El nombre es obligatorio';
    if (!productForm.slug.trim()) errors.slug = 'El slug es obligatorio';
    if (!productForm.category_id) errors.category_id = 'Selecciona una categoría';
    setProductFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const generateSlug = (name: string) => {
    return name.toLowerCase()
      .replace(/[^a-z0-9]+/g, '-')
      .replace(/^-|-$/g, '');
  };

  const handleProductNameChange = (name: string) => {
    setProductForm(prev => ({
      ...prev,
      name,
      slug: editingProduct ? prev.slug : generateSlug(name),
    }));
  };

  const saveProduct = async () => {
    if (!validateProductForm()) return;
    setProductSubmitting(true);

    const payload = {
      name: productForm.name.trim(),
      slug: productForm.slug.trim(),
      category_id: parseInt(productForm.category_id),
      short_description: productForm.short_description.trim() || null,
      full_description: productForm.full_description.trim() || null,
      price: productForm.price ? parseFloat(productForm.price) : null,
      sale_price: productForm.sale_price ? parseFloat(productForm.sale_price) : null,
      primary_image_url: productForm.primary_image_url.trim() || '/product-aeroterm.jpg',
      gallery: productForm.gallery.filter(url => url.trim() !== ''),
      is_featured: productForm.is_featured,
      is_active: productForm.is_active,
    };

    try {
      if (editingProduct) {
        const { error } = await supabase.from('products').update(payload).eq('id', editingProduct.id);
        if (error) throw error;
      } else {
        const { error } = await supabase.from('products').insert(payload);
        if (error) throw error;
      }
      setProductDialogOpen(false);
      resetProductForm();
      await fetchAllData();
    } catch (err: any) {
      setProductFormErrors({ submit: err.message || 'Error al guardar' });
    } finally {
      setProductSubmitting(false);
    }
  };

  const deleteProduct = async (id: number) => {
    if (!confirm('¿Eliminar este producto? Esta acción no se puede deshacer.')) return;
    setProductDeleting(id);
    try {
      const { error } = await supabase.from('products').delete().eq('id', id);
      if (error) throw error;
      await fetchAllData();
    } catch (err) {
      console.error('Error deleting:', err);
    } finally {
      setProductDeleting(null);
    }
  };

  const addGalleryImage = () => {
    setProductForm(prev => ({ ...prev, gallery: [...prev.gallery, ''] }));
  };

  const updateGalleryImage = (index: number, url: string) => {
    setProductForm(prev => {
      const newGallery = [...prev.gallery];
      newGallery[index] = url;
      return { ...prev, gallery: newGallery };
    });
  };

  const removeGalleryImage = (index: number) => {
    setProductForm(prev => ({
      ...prev,
      gallery: prev.gallery.filter((_, i) => i !== index),
    }));
  };

  // ─── User CRUD Functions ───
  const resetUserForm = () => {
    setUserForm({
      full_name: '', email: '', phone: '', country: '', city: '', company_name: '',
      role: 'personal_natural', password: '',
    });
    setUserFormErrors({});
    setCreatedUserPassword(null);
  };

  const openCreateUser = () => {
    resetUserForm();
    setUserDialogOpen(true);
  };

  const generatePassword = () => {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%';
    let pwd = '';
    for (let i = 0; i < 12; i++) {
      pwd += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    return pwd;
  };

  const createUser = async () => {
    const errors: Record<string, string> = {};
    if (!userForm.full_name.trim()) errors.full_name = 'El nombre es obligatorio';
    if (!userForm.email.trim()) errors.email = 'El email es obligatorio';
    if (!userForm.email.includes('@')) errors.email = 'Email inválido';
    setUserFormErrors(errors);
    if (Object.keys(errors).length > 0) return;

    setUserSubmitting(true);
    setCreatedUserPassword(null);

    try {
      // Generate password if not provided
      const password = userForm.password.trim() || generatePassword();
      
      // Create user via Supabase Auth REST API (doesn't affect current session)
      const authResp = await fetch('https://tqkycxorhlajgbgbfhry.supabase.co/auth/v1/signup', {
        method: 'POST',
        headers: {
          'apikey': 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InRxa3ljeG9yaGxhamdiZ2JmaHJ5Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODA1OTE2MDYsImV4cCI6MjA5NjE2NzYwNn0.Vx6i7ZYvKIkIO4UxwyFOr5J-y2SiRtuK1lcvnbtG2eE',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          email: userForm.email.trim(),
          password,
          options: {
            emailRedirectTo: 'https://swarm-ehde.vercel.app/#/login',
            data: {
              full_name: userForm.full_name.trim(),
            },
          },
        }),
      });

      const authData = await authResp.json();

      if (!authResp.ok) {
        throw new Error(authData.msg || authData.message || 'Error al crear usuario en Auth');
      }

      // Create user profile in users table
      if (authData.user?.id) {
        const { error: profileError } = await supabase.from('users').insert({
          id: authData.user.id,
          email: userForm.email.trim(),
          full_name: userForm.full_name.trim(),
          company_name: userForm.company_name.trim() || null,
          phone: userForm.phone.trim() || null,
          country: userForm.country.trim() || null,
          city: userForm.city.trim() || null,
          role: userForm.role,
          is_active: true,
        });

        if (profileError) {
          console.error('Profile error:', profileError);
        }
      }

      setCreatedUserPassword(password);
      await fetchAllData();
    } catch (err: any) {
      setUserFormErrors({ submit: err.message || 'Error al crear usuario' });
    } finally {
      setUserSubmitting(false);
    }
  };

  const toggleProductActive = async (id: number, current: boolean) => {
    try {
      const { error } = await supabase.from('products').update({ is_active: !current }).eq('id', id);
      if (error) throw error;
      await fetchAllData();
    } catch (err) {
      console.error('Error toggling:', err);
    }
  };

  // Fetch all data on mount
  useEffect(() => {
    if (!dataInitialized && hasAccess) {
      Promise.all([fetchLeads(), fetchAllData()]).then(() => {
        setDataInitialized(true);
      });
    }
  }, [hasAccess, dataInitialized, fetchLeads, fetchAllData]);

  // Loading state while checking auth
  if (authLoading && !isDebugAdmin()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-50">
        <div className="flex items-center gap-2 text-slate-500">
          <Loader2 size={20} className="animate-spin" />
          <span className="text-sm">Verificando acceso...</span>
        </div>
      </div>
    );
  }

  // Redirect non-admin users (skip if debug mode)
  if (!hasAccess) {
    return <Navigate to="/" replace />;
  }

  const isLoading = !dataInitialized || adminDataLoading || leadsLoading;

  const tabConfig: { key: TabType; label: string; icon: React.ComponentType<{ size?: number }> }[] = [
    { key: 'leads', label: 'Leads', icon: MessageSquare },
    { key: 'users', label: 'Usuarios', icon: Users },
    { key: 'products', label: 'Productos', icon: Package },
  ];

  return (
    <div className="min-h-screen bg-slate-50">
      {/* ─── Top Bar ─── */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-30">
        <div className="flex items-center justify-between px-4 lg:px-8" style={{ height: 64 }}>
          <div className="flex items-center gap-3">
            <div
              className="flex items-center justify-center rounded-lg"
              style={{ width: 36, height: 36, backgroundColor: '#1548a0' }}
            >
              <ShieldCheck size={18} className="text-white" />
            </div>
            <div>
              <h1 className="text-sm font-bold text-slate-900 uppercase tracking-wider">
                Panel de Administración
              </h1>
              <p className="text-xs text-slate-500">ThermaPro</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <Button
              variant="outline"
              size="sm"
              className="text-xs"
              onClick={() => navigate('/')}
            >
              Volver al sitio
            </Button>
          </div>
        </div>
      </header>

      <div className="flex flex-col lg:flex-row">
        {/* ─── Sidebar ─── */}
        <aside className="lg:w-56 bg-white border-r border-slate-200 lg:min-h-screen lg:sticky lg:top-16">
          <nav className="flex lg:flex-col overflow-x-auto lg:overflow-x-visible p-2 gap-1">
            {tabConfig.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.key}
                  onClick={() => setActiveTab(tab.key)}
                  className={`flex items-center gap-2.5 px-3 py-2.5 rounded-md text-xs font-medium uppercase tracking-wider transition-all whitespace-nowrap ${
                    activeTab === tab.key
                      ? 'bg-[#1548a0] text-white'
                      : 'text-slate-600 hover:bg-slate-100'
                  }`}
                >
                  <Icon size={16} />
                  {tab.label}
                  {tab.key === 'leads' && leads.length > 0 && (
                    <span className={`ml-auto text-xs font-bold ${activeTab === 'leads' ? 'text-white/80' : 'text-slate-400'}`}>
                      {leads.length}
                    </span>
                  )}
                </button>
              );
            })}
          </nav>
        </aside>

        {/* ─── Main Content ─── */}
        <main className="flex-1 p-4 lg:p-8">
          {/* Stats Row */}
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <StatCard
              title="Usuarios"
              value={stats.totalUsers}
              icon={Users}
              color="#1548a0"
              isLoading={isLoading}
            />
            <StatCard
              title="Productos"
              value={stats.totalProducts}
              icon={Package}
              color="#2a9d8f"
              isLoading={isLoading}
            />
            <StatCard
              title="Leads"
              value={stats.totalLeads}
              icon={MessageSquare}
              color="#e63946"
              isLoading={isLoading}
            />
            <StatCard
              title="Distribuidores"
              value={stats.totalDistributors}
              icon={TrendingUp}
              color="#f59e0b"
              isLoading={isLoading}
            />
          </div>

          {/* ─── Leads Tab ─── */}
          {activeTab === 'leads' && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase text-slate-900 tracking-wider">
                  Leads Recibidos
                </h2>
                <Button
                  variant="outline"
                  size="sm"
                  className="text-xs"
                  onClick={() => fetchLeads()}
                  disabled={leadsLoading}
                >
                  {leadsLoading && <Loader2 size={12} className="animate-spin mr-1" />}
                  Actualizar
                </Button>
              </div>

              <Card className="border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Nombre</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Email</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Teléfono</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Origen</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Estado</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Fecha</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {leadsLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                          <TableRow key={i}>
                            {Array.from({ length: 7 }).map((_, j) => (
                              <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : leads.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-12 text-slate-400 text-sm">
                            No hay leads registrados
                          </TableCell>
                        </TableRow>
                      ) : (
                        leads.map((lead) => (
                          <TableRow key={lead.id} className="hover:bg-slate-50">
                            <TableCell className="text-sm font-medium text-slate-900">
                              {lead.name}
                            </TableCell>
                            <TableCell className="text-sm text-slate-600">{lead.email}</TableCell>
                            <TableCell className="text-sm text-slate-600">{lead.phone || '-'}</TableCell>
                            <TableCell className="text-sm text-slate-600 capitalize">{lead.source}</TableCell>
                            <TableCell>
                              <LeadStatusBadge status={lead.status as DbLead['status']} />
                            </TableCell>
                            <TableCell className="text-sm text-slate-500">
                              {new Date(lead.created_at).toLocaleDateString('es-ES')}
                            </TableCell>
                            <TableCell>
                              <select
                                className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-[#1548a0]"
                                value={lead.status}
                                onChange={(e) => updateLeadStatus(lead.id, e.target.value as DbLead['status'])}
                              >
                                <option value="new">Nuevo</option>
                                <option value="contacted">Contactado</option>
                                <option value="qualified">Calificado</option>
                                <option value="converted">Convertido</option>
                                <option value="lost">Perdido</option>
                              </select>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          )}

          {/* ─── Users Tab ─── */}
          {activeTab === 'users' && (
            <div>
              {/* User Creation Dialog */}
              <Dialog open={userDialogOpen} onOpenChange={setUserDialogOpen}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg">Crear Nuevo Usuario</DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 py-2">
                    {userFormErrors.submit && (
                      <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{userFormErrors.submit}</div>
                    )}

                    {createdUserPassword ? (
                      <div className="bg-green-50 border border-green-200 rounded-lg p-4 space-y-3">
                        <h3 className="text-sm font-bold text-green-800">✅ Usuario creado exitosamente</h3>
                        <div>
                          <p className="text-xs text-green-700">Email:</p>
                          <p className="text-sm font-mono font-medium">{userForm.email}</p>
                        </div>
                        <div>
                          <p className="text-xs text-green-700">Contraseña temporal:</p>
                          <p className="text-sm font-mono font-bold bg-white border border-green-300 rounded px-2 py-1 select-all">{createdUserPassword}</p>
                        </div>
                        <p className="text-xs text-green-600">Copia esta contraseña y compártela con el usuario. No se mostrará de nuevo.</p>
                      </div>
                    ) : (
                      <>
                        <div>
                          <Label className="text-xs font-semibold uppercase text-slate-500">Nombre completo *</Label>
                          <Input
                            value={userForm.full_name}
                            onChange={e => setUserForm(prev => ({ ...prev, full_name: e.target.value }))}
                            placeholder="Juan Pérez"
                            className="mt-1"
                          />
                          {userFormErrors.full_name && <p className="text-xs text-red-500 mt-1">{userFormErrors.full_name}</p>}
                        </div>

                        <div>
                          <Label className="text-xs font-semibold uppercase text-slate-500">Email *</Label>
                          <Input
                            type="email"
                            value={userForm.email}
                            onChange={e => setUserForm(prev => ({ ...prev, email: e.target.value }))}
                            placeholder="juan@ejemplo.com"
                            className="mt-1"
                          />
                          {userFormErrors.email && <p className="text-xs text-red-500 mt-1">{userFormErrors.email}</p>}
                        </div>

                        <div>
                          <Label className="text-xs font-semibold uppercase text-slate-500">Teléfono</Label>
                          <Input
                            value={userForm.phone}
                            onChange={e => setUserForm(prev => ({ ...prev, phone: e.target.value }))}
                            placeholder="+56 9 1234 5678"
                            className="mt-1"
                          />
                        </div>

                        <div className="grid grid-cols-2 gap-3">
                          <div>
                            <Label className="text-xs font-semibold uppercase text-slate-500">País</Label>
                            <Input
                              value={userForm.country}
                              onChange={e => setUserForm(prev => ({ ...prev, country: e.target.value }))}
                              placeholder="Chile"
                              className="mt-1"
                            />
                          </div>
                          <div>
                            <Label className="text-xs font-semibold uppercase text-slate-500">Ciudad</Label>
                            <Input
                              value={userForm.city}
                              onChange={e => setUserForm(prev => ({ ...prev, city: e.target.value }))}
                              placeholder="Santiago"
                              className="mt-1"
                            />
                          </div>
                        </div>

                        <div>
                          <Label className="text-xs font-semibold uppercase text-slate-500">Empresa</Label>
                          <Input
                            value={userForm.company_name}
                            onChange={e => setUserForm(prev => ({ ...prev, company_name: e.target.value }))}
                            placeholder="Opcional"
                            className="mt-1"
                          />
                        </div>

                        <div>
                          <Label className="text-xs font-semibold uppercase text-slate-500">Tipo de usuario</Label>
                          <select
                            value={userForm.role}
                            onChange={e => setUserForm(prev => ({ ...prev, role: e.target.value as 'personal_natural' | 'instalador' | 'distribuidor_acs' }))}
                            className="w-full mt-1 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1548a0]"
                          >
                            <option value="personal_natural">Personal Natural</option>
                            <option value="instalador">Instalador de Productos</option>
                            <option value="distribuidor_acs">Distribuidor ACS</option>
                          </select>
                        </div>

                        <div>
                          <Label className="text-xs font-semibold uppercase text-slate-500">Contraseña (opcional)</Label>
                          <Input
                            type="text"
                            value={userForm.password}
                            onChange={e => setUserForm(prev => ({ ...prev, password: e.target.value }))}
                            placeholder="Se genera automáticamente si se deja vacío"
                            className="mt-1"
                          />
                          <p className="text-xs text-slate-400 mt-1">Si la dejas vacía, se generará una contraseña segura automáticamente.</p>
                        </div>
                      </>
                    )}
                  </div>

                  <DialogFooter className="gap-2">
                    {createdUserPassword ? (
                      <Button
                        onClick={() => { setUserDialogOpen(false); resetUserForm(); }}
                        style={{ backgroundColor: '#1548a0', color: 'white' }}
                      >
                        Cerrar
                      </Button>
                    ) : (
                      <>
                        <Button variant="outline" onClick={() => { setUserDialogOpen(false); resetUserForm(); }}>
                          Cancelar
                        </Button>
                        <Button
                          onClick={createUser}
                          disabled={userSubmitting}
                          style={{ backgroundColor: '#1548a0', color: 'white' }}
                        >
                          {userSubmitting && <Loader2 size={14} className="animate-spin mr-1" />}
                          Crear Usuario
                        </Button>
                      </>
                    )}
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase text-slate-900 tracking-wider">
                  Usuarios Registrados ({users.length})
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => fetchAllData()}
                    disabled={adminDataLoading}
                  >
                    {adminDataLoading && <Loader2 size={12} className="animate-spin mr-1" />}
                    Actualizar
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs"
                    style={{ backgroundColor: '#1548a0', color: 'white' }}
                    onClick={openCreateUser}
                  >
                    <Plus size={14} className="mr-1" />
                    Nuevo Usuario
                  </Button>
                </div>
              </div>

              <Card className="border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Nombre</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Email</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Rol</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">País</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Ciudad</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Teléfono</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminDataLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                          <TableRow key={i}>
                            {Array.from({ length: 7 }).map((_, j) => (
                              <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : users.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={7} className="text-center py-12 text-slate-400 text-sm">
                            No hay usuarios registrados
                          </TableCell>
                        </TableRow>
                      ) : (
                        users.map((user: DbUserProfile) => (
                          <TableRow key={user.id} className="hover:bg-slate-50">
                            <TableCell className="text-sm font-medium text-slate-900">
                              {user.full_name || '—'}
                            </TableCell>
                            <TableCell className="text-sm text-slate-600">{user.email}</TableCell>
                            <TableCell>
                              <RoleBadge role={user.role} />
                            </TableCell>
                            <TableCell className="text-sm text-slate-600">{user.country || '-'}</TableCell>
                            <TableCell className="text-sm text-slate-600">{user.city || '-'}</TableCell>
                            <TableCell className="text-sm text-slate-600">{user.phone || '-'}</TableCell>
                            <TableCell>
                              <select
                                className="text-xs border border-slate-200 rounded-md px-2 py-1 bg-white focus:outline-none focus:ring-2 focus:ring-[#1548a0]"
                                value={user.role}
                                onChange={(e) => updateUserRole(user.id, e.target.value)}
                              >
                                <option value="personal_natural">Personal Natural</option>
                                <option value="instalador">Instalador</option>
                                <option value="distribuidor_acs">Distribuidor ACS</option>
                                <option value="admin">Admin</option>
                              </select>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          )}

          {/* ─── Products Tab ─── */}
          {activeTab === 'products' && (
            <div>
              {/* Product Form Dialog */}
              <Dialog open={productDialogOpen} onOpenChange={setProductDialogOpen}>
                <DialogContent className="max-w-lg max-h-[90vh] overflow-y-auto">
                  <DialogHeader>
                    <DialogTitle className="text-lg">
                      {editingProduct ? 'Editar Producto' : 'Nuevo Producto'}
                    </DialogTitle>
                  </DialogHeader>

                  <div className="space-y-4 py-2">
                    {productFormErrors.submit && (
                      <div className="text-sm text-red-600 bg-red-50 p-3 rounded">{productFormErrors.submit}</div>
                    )}

                    <div>
                      <Label className="text-xs font-semibold uppercase text-slate-500">Nombre *</Label>
                      <Input
                        value={productForm.name}
                        onChange={e => handleProductNameChange(e.target.value)}
                        placeholder="AQUAPRO R32 8kW"
                        className="mt-1"
                      />
                      {productFormErrors.name && <p className="text-xs text-red-500 mt-1">{productFormErrors.name}</p>}
                    </div>

                    <div>
                      <Label className="text-xs font-semibold uppercase text-slate-500">Slug *</Label>
                      <Input
                        value={productForm.slug}
                        onChange={e => setProductForm(prev => ({ ...prev, slug: e.target.value }))}
                        placeholder="aquapro-r32-8kw"
                        className="mt-1"
                      />
                      {productFormErrors.slug && <p className="text-xs text-red-500 mt-1">{productFormErrors.slug}</p>}
                    </div>

                    <div>
                      <Label className="text-xs font-semibold uppercase text-slate-500">Categoría *</Label>
                      <select
                        value={productForm.category_id}
                        onChange={e => setProductForm(prev => ({ ...prev, category_id: e.target.value }))}
                        className="w-full mt-1 border border-slate-200 rounded-md px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-[#1548a0]"
                      >
                        <option value="1">Aerotermia</option>
                        <option value="2">Geotermia</option>
                        <option value="3">ACS</option>
                        <option value="4">Industrial</option>
                        <option value="5">Piscinas</option>
                      </select>
                    </div>

                    <div>
                      <Label className="text-xs font-semibold uppercase text-slate-500">Descripción corta</Label>
                      <Input
                        value={productForm.short_description}
                        onChange={e => setProductForm(prev => ({ ...prev, short_description: e.target.value }))}
                        placeholder="Monoblock R32, COP 4.2"
                        className="mt-1"
                      />
                    </div>

                    <div>
                      <Label className="text-xs font-semibold uppercase text-slate-500">Descripción completa</Label>
                      <Textarea
                        value={productForm.full_description}
                        onChange={e => setProductForm(prev => ({ ...prev, full_description: e.target.value }))}
                        placeholder="Descripción detallada del producto..."
                        className="mt-1"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <Label className="text-xs font-semibold uppercase text-slate-500">Precio distribuidor ($)</Label>
                        <Input
                          type="number"
                          value={productForm.price}
                          onChange={e => setProductForm(prev => ({ ...prev, price: e.target.value }))}
                          placeholder="1890"
                          className="mt-1"
                        />
                      </div>
                      <div>
                        <Label className="text-xs font-semibold uppercase text-slate-500">Precio venta ($)</Label>
                        <Input
                          type="number"
                          value={productForm.sale_price}
                          onChange={e => setProductForm(prev => ({ ...prev, sale_price: e.target.value }))}
                          placeholder="2990"
                          className="mt-1"
                        />
                      </div>
                    </div>

                    <div>
                      <Label className="text-xs font-semibold uppercase text-slate-500">Imagen Principal</Label>
                      <Input
                        value={productForm.primary_image_url}
                        onChange={e => setProductForm(prev => ({ ...prev, primary_image_url: e.target.value }))}
                        placeholder="/product-aeroterm.jpg"
                        className="mt-1"
                      />
                    </div>

                    {/* Gallery images */}
                    <div>
                      <div className="flex items-center justify-between">
                        <Label className="text-xs font-semibold uppercase text-slate-500">Galería de Imágenes</Label>
                        <Button
                          type="button"
                          variant="outline"
                          size="sm"
                          className="text-xs h-7 px-2"
                          onClick={addGalleryImage}
                        >
                          <Plus size={12} className="mr-1" /> Agregar
                        </Button>
                      </div>
                      <div className="mt-2 space-y-2">
                        {productForm.gallery.length === 0 && (
                          <p className="text-xs text-slate-400 italic">Sin imágenes adicionales</p>
                        )}
                        {productForm.gallery.map((url, index) => (
                          <div key={index} className="flex items-center gap-2">
                            <Input
                              value={url}
                              onChange={e => updateGalleryImage(index, e.target.value)}
                              placeholder={`URL imagen ${index + 1}`}
                              className="text-sm flex-1"
                            />
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              className="h-8 w-8 p-0 text-red-500"
                              onClick={() => removeGalleryImage(index)}
                            >
                              <Trash2 size={14} />
                            </Button>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="flex items-center gap-6 pt-2">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Switch
                          checked={productForm.is_featured}
                          onCheckedChange={v => setProductForm(prev => ({ ...prev, is_featured: v }))}
                        />
                        <span className="text-sm text-slate-700">Destacado</span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <Switch
                          checked={productForm.is_active}
                          onCheckedChange={v => setProductForm(prev => ({ ...prev, is_active: v }))}
                        />
                        <span className="text-sm text-slate-700">Activo</span>
                      </label>
                    </div>
                  </div>

                  <DialogFooter className="gap-2">
                    <Button variant="outline" onClick={() => { setProductDialogOpen(false); resetProductForm(); }}>
                      Cancelar
                    </Button>
                    <Button
                      onClick={saveProduct}
                      disabled={productSubmitting}
                      style={{ backgroundColor: '#1548a0', color: 'white' }}
                    >
                      {productSubmitting && <Loader2 size={14} className="animate-spin mr-1" />}
                      {editingProduct ? 'Guardar Cambios' : 'Crear Producto'}
                    </Button>
                  </DialogFooter>
                </DialogContent>
              </Dialog>

              <div className="flex items-center justify-between mb-4">
                <h2 className="text-sm font-bold uppercase text-slate-900 tracking-wider">
                  Productos ({products.length})
                </h2>
                <div className="flex gap-2">
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-xs"
                    onClick={() => fetchAllData()}
                    disabled={adminDataLoading}
                  >
                    {adminDataLoading && <Loader2 size={12} className="animate-spin mr-1" />}
                    Actualizar
                  </Button>
                  <Button
                    size="sm"
                    className="text-xs"
                    style={{ backgroundColor: '#1548a0', color: 'white' }}
                    onClick={openCreateProduct}
                  >
                    <Plus size={14} className="mr-1" />
                    Nuevo Producto
                  </Button>
                </div>
              </div>

              <Card className="border-slate-200 overflow-hidden">
                <div className="overflow-x-auto">
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-slate-50">
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Nombre</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Categoría</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Precio</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Estado</TableHead>
                        <TableHead className="text-xs font-semibold uppercase text-slate-500">Acciones</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      {adminDataLoading ? (
                        Array.from({ length: 5 }).map((_, i) => (
                          <TableRow key={i}>
                            {Array.from({ length: 5 }).map((_, j) => (
                              <TableCell key={j}><Skeleton className="h-4 w-full" /></TableCell>
                            ))}
                          </TableRow>
                        ))
                      ) : products.length === 0 ? (
                        <TableRow>
                          <TableCell colSpan={5} className="text-center py-12 text-slate-400 text-sm">
                            No hay productos registrados
                          </TableCell>
                        </TableRow>
                      ) : (
                        products.map((product: DbProduct) => (
                          <TableRow key={product.id} className="hover:bg-slate-50">
                            <TableCell className="text-sm font-medium text-slate-900">
                              {product.name}
                            </TableCell>
                            <TableCell className="text-sm text-slate-600">
                              {['Aerotermia','Geotermia','ACS','Industrial','Piscinas'][product.category_id - 1] || `Cat.${product.category_id}`}
                            </TableCell>
                            <TableCell className="text-sm text-slate-600">
                              {product.price !== null ? `$${product.price.toLocaleString('es-ES')}` : '—'}
                              {product.sale_price ? <span className="text-xs text-slate-400 ml-1">(${product.sale_price.toLocaleString('es-ES')} venta)</span> : null}
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-2">
                                <ProductStatusBadge isActive={product.is_active} />
                                <Switch
                                  checked={product.is_active}
                                  onCheckedChange={() => toggleProductActive(product.id, product.is_active)}
                                  className="scale-75"
                                />
                              </div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center gap-1">
                                <Button
                                  variant="ghost" size="sm" className="h-8 w-8 p-0"
                                  onClick={() => openEditProduct(product)}
                                  title="Editar"
                                >
                                  <Pencil size={14} className="text-[#1548a0]" />
                                </Button>
                                <Button
                                  variant="ghost" size="sm" className="h-8 w-8 p-0"
                                  onClick={() => deleteProduct(product.id)}
                                  disabled={productDeleting === product.id}
                                  title="Eliminar"
                                >
                                  {productDeleting === product.id ? (
                                    <Loader2 size={14} className="animate-spin text-slate-400" />
                                  ) : (
                                    <Trash2 size={14} className="text-red-500" />
                                  )}
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        ))
                      )}
                    </TableBody>
                  </Table>
                </div>
              </Card>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
