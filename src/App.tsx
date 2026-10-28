import React, { useState, useEffect } from 'react';
import { User, Farm, Crop, SoilReport, WeatherData, PestAlert, Product, Order, ForumPost, ProjectMeta, CartItem, Role } from './types';
import { translations, LanguageCode } from './translations';
import { MentorBar } from './components/MentorBar';
import { MentorEvaluationModal } from './components/MentorEvaluationModal';
import { KanbanWorkspace } from './components/KanbanWorkspace';
import { Navbar } from './components/Navbar';
import { FarmDashboard } from './components/FarmDashboard';
import { FarmManagement } from './components/FarmManagement';
import { CropMonitoring } from './components/CropMonitoring';
import { SoilHealthAnalysis } from './components/SoilHealthAnalysis';
import { WeatherAndPests } from './components/WeatherAndPests';
import { AIDiagnosticScanner } from './components/AIDiagnosticScanner';
import { AgriMarketplace } from './components/AgriMarketplace';
import { CommunityForum } from './components/CommunityForum';
import { AdminDashboard } from './components/AdminDashboard';
import { RefreshCw } from 'lucide-react';

export default function App() {
  const [language, setLanguage] = useState<LanguageCode>('en');
  const t = translations[language];

  // Navigation State
  const [activeTab, setActiveTab] = useState<string>('dashboard');
  const [isWorkspaceOpen, setIsWorkspaceOpen] = useState(false);
  const [isMentorModalOpen, setIsMentorModalOpen] = useState(false);
  const [isAddFarmOpen, setIsAddFarmOpen] = useState(false);
  const [isAddCropOpen, setIsAddCropOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  // Data States
  const [currentUser, setCurrentUser] = useState<User>({
    id: 'user-1',
    name: 'Ramesh Kumar Patel',
    email: 'ramesh.farmer@agritech.org',
    role: 'farmer',
    phone: '+91 98765 43210',
    location: 'Indore, Madhya Pradesh',
    avatar: 'https://images.unsplash.com/photo-1544717305-2782549b5136?w=150&auto=format&fit=crop&q=80',
    language: 'en'
  });

  const [farms, setFarms] = useState<Farm[]>([]);
  const [crops, setCrops] = useState<Crop[]>([]);
  const [soilReports, setSoilReports] = useState<SoilReport[]>([]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [pestAlerts, setPestAlerts] = useState<PestAlert[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [forumPosts, setForumPosts] = useState<ForumPost[]>([]);
  const [projectMeta, setProjectMeta] = useState<ProjectMeta | null>(null);
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch initial data from Express backend
  const loadData = async () => {
    try {
      const [
        metaRes,
        userRes,
        farmsRes,
        cropsRes,
        soilRes,
        weatherRes,
        pestsRes,
        prodsRes,
        ordersRes,
        forumRes
      ] = await Promise.all([
        fetch('/api/project-meta').then(r => r.json()),
        fetch('/api/auth/me').then(r => r.json()).catch(() => ({ user: currentUser })),
        fetch('/api/farms').then(r => r.json()).catch(() => ({ farms: [] })),
        fetch('/api/crops').then(r => r.json()).catch(() => ({ crops: [] })),
        fetch('/api/soil-reports').then(r => r.json()).catch(() => ({ soilReports: [] })),
        fetch('/api/weather').then(r => r.json()).catch(() => null),
        fetch('/api/pest-alerts').then(r => r.json()).catch(() => ({ pestAlerts: [] })),
        fetch('/api/marketplace/products').then(r => r.json()).catch(() => ({ products: [] })),
        fetch('/api/marketplace/orders').then(r => r.json()).catch(() => ({ orders: [] })),
        fetch('/api/forum').then(r => r.json()).catch(() => ({ posts: [] }))
      ]);

      if (metaRes) setProjectMeta(metaRes);
      if (userRes?.user) setCurrentUser(userRes.user);
      if (farmsRes?.farms) setFarms(farmsRes.farms);
      if (cropsRes?.crops) setCrops(cropsRes.crops);
      if (soilRes?.soilReports) setSoilReports(soilRes.soilReports);
      if (weatherRes) setWeather(weatherRes);
      if (pestsRes?.pestAlerts) setPestAlerts(pestsRes.pestAlerts);
      if (prodsRes?.products) setProducts(prodsRes.products);
      if (ordersRes?.orders) setOrders(ordersRes.orders);
      if (forumRes?.posts) setForumPosts(forumRes.posts);
    } catch (err) {
      console.error('Error fetching data from API:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  // Role Switcher
  const handleSwitchRole = async (role: Role) => {
    try {
      const res = await fetch('/api/auth/switch-role', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ role })
      });
      const data = await res.json();
      if (data.user) {
        setCurrentUser(data.user);
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Add Farm
  const handleAddFarm = async (farmData: Partial<Farm>) => {
    const res = await fetch('/api/farms', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(farmData)
    });
    const data = await res.json();
    if (data.farm) {
      setFarms([data.farm, ...farms]);
    }
  };

  // Delete Farm
  const handleDeleteFarm = async (farmId: string) => {
    await fetch(`/api/farms/${farmId}`, { method: 'DELETE' });
    setFarms(farms.filter(f => f.id !== farmId));
    setCrops(crops.filter(c => c.farmId !== farmId));
  };

  // Add Crop
  const handleAddCrop = async (cropData: Partial<Crop>) => {
    const res = await fetch('/api/crops', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(cropData)
    });
    const data = await res.json();
    if (data.crop) {
      setCrops([data.crop, ...crops]);
    }
  };

  // Update Crop
  const handleUpdateCrop = async (cropId: string, updates: Partial<Crop>) => {
    const res = await fetch(`/api/crops/${cropId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(updates)
    });
    const data = await res.json();
    if (data.crop) {
      setCrops(crops.map(c => (c.id === cropId ? data.crop : c)));
    }
  };

  // Delete Crop
  const handleDeleteCrop = async (cropId: string) => {
    await fetch(`/api/crops/${cropId}`, { method: 'DELETE' });
    setCrops(crops.filter(c => c.id !== cropId));
  };

  // Add Soil Report
  const handleAddSoilReport = async (reportData: any) => {
    const res = await fetch('/api/soil-reports', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(reportData)
    });
    const data = await res.json();
    if (data.report) {
      setSoilReports([data.report, ...soilReports]);
    }
  };

  // Cart operations
  const handleAddToCart = (product: Product) => {
    setCart(prev => {
      const existing = prev.find(p => p.id === product.id);
      if (existing) {
        return prev.map(p => (p.id === product.id ? { ...p, quantity: p.quantity + 1 } : p));
      }
      return [...prev, { ...product, quantity: 1 }];
    });
  };

  const handleUpdateCartQty = (productId: string, delta: number) => {
    setCart(prev =>
      prev
        .map(item => (item.id === productId ? { ...item, quantity: item.quantity + delta } : item))
        .filter(item => item.quantity > 0)
    );
  };

  const handleClearCart = () => setCart([]);

  const handlePlaceOrder = async (items: CartItem[], address: string) => {
    const res = await fetch('/api/marketplace/orders', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ items, deliveryAddress: address })
    });
    const data = await res.json();
    if (data.order) {
      setOrders([data.order, ...orders]);
      handleClearCart();
    }
  };

  // Forum Q&A
  const handleAddQuestion = async (title: string, content: string, category: ForumPost['category']) => {
    const res = await fetch('/api/forum/questions', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content, category })
    });
    const data = await res.json();
    if (data.post) {
      setForumPosts([data.post, ...forumPosts]);
    }
  };

  const handleAddAnswer = async (postId: string, content: string) => {
    const res = await fetch(`/api/forum/${postId}/answers`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ content })
    });
    const data = await res.json();
    if (data.answer) {
      setForumPosts(prev =>
        prev.map(p => (p.id === postId ? { ...p, answers: [...p.answers, data.answer] } : p))
      );
    }
  };

  // Admin Broadcast
  const handleBroadcastAlert = async (title: string, message: string, priority: string) => {
    const res = await fetch('/api/admin/broadcast', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, message, priority })
    });
    const data = await res.json();
    if (data.alert) {
      setPestAlerts([data.alert, ...pestAlerts]);
    }
  };

  // Toggle Task in Kanban / Workspace
  const handleToggleTask = async (taskId: string, newStatus: 'Done' | 'In Progress' | 'To Do') => {
    try {
      const res = await fetch('/api/project-meta/toggle-task', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ taskId, status: newStatus })
      });
      const data = await res.json();
      if (data.task && projectMeta) {
        const updatedTasks = projectMeta.tasks.map(t => (t.id === taskId ? data.task : t));
        const completed = updatedTasks.filter(t => t.status === 'Done').length;
        setProjectMeta({
          ...projectMeta,
          tasks: updatedTasks,
          completedTasks: completed,
          progressPercent: Math.round((completed / updatedTasks.length) * 100)
        });
      }
    } catch (err) {
      console.error(err);
    }
  };

  // Save Demo & GitHub Links
  const handleSaveLinks = async (demoUrl: string, githubUrl: string, studentName: string, mentorNotes: string) => {
    const res = await fetch('/api/project-meta', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ demoUrl, githubUrl, studentName, mentorNotes })
    });
    const data = await res.json();
    if (data.projectMetadata) {
      setProjectMeta(prev => (prev ? { ...prev, ...data.projectMetadata } : null));
    }
  };

  return (
    <div className="min-h-screen bg-stone-100/70 text-stone-900 flex flex-col font-sans selection:bg-emerald-200">
      {/* Top Persistent Mentor & Submission Links Bar */}
      <MentorBar
        projectMeta={projectMeta}
        t={t}
        onOpenModal={() => setIsMentorModalOpen(true)}
        onOpenWorkspace={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
        isWorkspaceOpen={isWorkspaceOpen}
      />

      {/* Main Navigation Header */}
      <Navbar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        currentUser={currentUser}
        onSwitchRole={handleSwitchRole}
        language={language}
        onLanguageChange={setLanguage}
        cartCount={cart.reduce((s, i) => s + i.quantity, 0)}
        onOpenCart={() => setIsCartOpen(true)}
        onOpenMentorModal={() => setIsMentorModalOpen(true)}
        t={t}
      />

      {/* Main App Content Area */}
      <main className="max-w-7xl w-full mx-auto px-4 sm:px-6 py-6 flex-1 space-y-6">
        {/* Kanban Workspace (Toggleable or Accessible) */}
        {isWorkspaceOpen && (
          <KanbanWorkspace
            projectMeta={projectMeta}
            t={t}
            onOpenModal={() => setIsMentorModalOpen(true)}
            onToggleTask={handleToggleTask}
          />
        )}

        {/* Feature Views based on activeTab */}
        {activeTab === 'dashboard' && (
          <FarmDashboard
            currentUser={currentUser}
            farms={farms}
            crops={crops}
            soilReports={soilReports}
            weather={weather}
            pestAlerts={pestAlerts}
            setActiveTab={setActiveTab}
            onOpenAddFarm={() => setIsAddFarmOpen(true)}
            onOpenAddCrop={() => setIsAddCropOpen(true)}
            t={t}
          />
        )}

        {activeTab === 'farms' && (
          <FarmManagement
            farms={farms}
            crops={crops}
            onAddFarm={handleAddFarm}
            onDeleteFarm={handleDeleteFarm}
            t={t}
          />
        )}

        {activeTab === 'crops' && (
          <CropMonitoring
            crops={crops}
            farms={farms}
            onAddCrop={handleAddCrop}
            onUpdateCrop={handleUpdateCrop}
            onDeleteCrop={handleDeleteCrop}
            isAddModalOpen={isAddCropOpen}
            setIsAddModalOpen={setIsAddCropOpen}
            t={t}
          />
        )}

        {activeTab === 'soil' && (
          <SoilHealthAnalysis
            soilReports={soilReports}
            farms={farms}
            onAddSoilReport={handleAddSoilReport}
            t={t}
          />
        )}

        {activeTab === 'weather' && (
          <WeatherAndPests
            weather={weather}
            pestAlerts={pestAlerts}
            setActiveTab={setActiveTab}
            t={t}
          />
        )}

        {activeTab === 'aidoctor' && (
          <AIDiagnosticScanner t={t} />
        )}

        {activeTab === 'marketplace' && (
          <AgriMarketplace
            products={products}
            orders={orders}
            cart={cart}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={handleUpdateCartQty}
            onClearCart={handleClearCart}
            onPlaceOrder={handlePlaceOrder}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            t={t}
          />
        )}

        {activeTab === 'community' && (
          <CommunityForum
            posts={forumPosts}
            currentUser={currentUser}
            onAddQuestion={handleAddQuestion}
            onAddAnswer={handleAddAnswer}
            t={t}
          />
        )}

        {activeTab === 'admin' && (
          <AdminDashboard
            currentUser={currentUser}
            farms={farms}
            onBroadcastAlert={handleBroadcastAlert}
            t={t}
          />
        )}
      </main>

      {/* Footer */}
      <footer className="bg-white border-t border-stone-200 mt-12 py-6 text-xs text-stone-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <span className="font-bold text-stone-800">AgriTech Platform</span>
            <span>• Built for Rural Sustainability & Productivity</span>
          </div>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setIsMentorModalOpen(true)}
              className="text-emerald-700 hover:underline font-semibold"
            >
              Mentor Review & Submission Links
            </button>
            <span>•</span>
            <button
              onClick={() => setIsWorkspaceOpen(!isWorkspaceOpen)}
              className="text-stone-600 hover:text-stone-900 font-medium"
            >
              6 Epics / 19 Tasks Kanban
            </button>
          </div>
        </div>
      </footer>

      {/* Mentor Submission & Links Modal */}
      <MentorEvaluationModal
        isOpen={isMentorModalOpen}
        onClose={() => setIsMentorModalOpen(false)}
        projectMeta={projectMeta}
        onSaveLinks={handleSaveLinks}
        t={t}
      />
    </div>
  );
}
