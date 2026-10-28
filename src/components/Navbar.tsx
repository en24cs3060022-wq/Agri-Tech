import React from 'react';
import { User, Role } from '../types';
import { TranslationStrings, LanguageCode } from '../translations';
import { Sprout, Globe, UserCheck, ShoppingCart, Award, Layers, ShieldCheck } from 'lucide-react';

interface Props {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  currentUser: User;
  onSwitchRole: (role: Role) => void;
  language: LanguageCode;
  onLanguageChange: (lang: LanguageCode) => void;
  cartCount: number;
  onOpenCart: () => void;
  onOpenMentorModal: () => void;
  t: TranslationStrings;
}

export const Navbar: React.FC<Props> = ({
  activeTab,
  setActiveTab,
  currentUser,
  onSwitchRole,
  language,
  onLanguageChange,
  cartCount,
  onOpenCart,
  onOpenMentorModal,
  t
}) => {
  const navTabs = [
    { id: 'dashboard', label: t.tabs.dashboard },
    { id: 'farms', label: t.tabs.farms },
    { id: 'crops', label: t.tabs.crops },
    { id: 'soil', label: t.tabs.soil },
    { id: 'weather', label: t.tabs.weather },
    { id: 'aidoctor', label: t.tabs.aiDoctor, highlight: true },
    { id: 'marketplace', label: t.tabs.marketplace },
    { id: 'community', label: t.tabs.community },
    { id: 'admin', label: t.tabs.admin, requiresAdmin: true },
  ];

  return (
    <header className="bg-white border-b border-stone-200 sticky top-0 z-40 shadow-xs">
      {/* Top Navbar Row */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2.5 flex items-center justify-between gap-3">
        {/* Brand & Tagline */}
        <div className="flex items-center gap-3">
          <div
            onClick={() => setActiveTab('dashboard')}
            className="flex items-center gap-2.5 cursor-pointer group"
          >
            <div className="w-10 h-10 rounded-xl bg-linear-to-br from-emerald-600 to-green-700 flex items-center justify-center text-white shadow-md group-hover:scale-105 transition-transform">
              <Sprout className="w-6 h-6" />
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-extrabold text-stone-900 tracking-tight">AgriTech</span>
                <span className="text-2xs font-bold uppercase tracking-wider px-1.5 py-0.5 rounded bg-emerald-100 text-emerald-800 border border-emerald-200">
                  v2.4 Smart
                </span>
              </div>
              <p className="text-2xs text-stone-500 hidden sm:block font-medium">
                {t.tagline}
              </p>
            </div>
          </div>
        </div>

        {/* Right Tools: Language, Role Switcher, Cart, Mentor Hub */}
        <div className="flex items-center gap-2 sm:gap-3">
          {/* Multilingual Selector */}
          <div className="flex items-center bg-stone-100 rounded-lg p-1 border border-stone-200 text-xs">
            <Globe className="w-3.5 h-3.5 text-stone-500 ml-1.5 mr-1" />
            <select
              value={language}
              onChange={(e) => onLanguageChange(e.target.value as LanguageCode)}
              className="bg-transparent text-stone-700 font-semibold focus:outline-hidden pr-2 cursor-pointer"
            >
              <option value="en">English (EN)</option>
              <option value="hi">हिन्दी (HI)</option>
              <option value="es">Español (ES)</option>
              <option value="pa">ਪੰਜਾਬੀ (PA)</option>
              <option value="te">తెలుగు (TE)</option>
            </select>
          </div>

          {/* Role Switcher (Farmer, Expert, Admin) */}
          <div className="flex items-center bg-stone-100 rounded-lg p-1 border border-stone-200 text-xs">
            <UserCheck className="w-3.5 h-3.5 text-emerald-600 ml-1.5 mr-1" />
            <select
              value={currentUser.role}
              onChange={(e) => onSwitchRole(e.target.value as Role)}
              className="bg-transparent text-stone-800 font-semibold focus:outline-hidden pr-2 cursor-pointer"
              title="Switch user role"
            >
              <option value="farmer">Farmer (Ramesh)</option>
              <option value="expert">Agronomist (Dr. Sharma)</option>
              <option value="admin">System Admin</option>
            </select>
          </div>

          {/* Marketplace Cart Button */}
          <button
            onClick={onOpenCart}
            className="relative p-2 rounded-lg bg-stone-100 hover:bg-stone-200 text-stone-700 transition-colors"
            title="Open Shopping Cart"
          >
            <ShoppingCart className="w-4 h-4" />
            {cartCount > 0 && (
              <span className="absolute -top-1 -right-1 bg-emerald-600 text-white text-2xs font-bold w-4 h-4 rounded-full flex items-center justify-center animate-bounce">
                {cartCount}
              </span>
            )}
          </button>

          {/* Project Review Hub Button */}
          <button
            onClick={onOpenMentorModal}
            className="flex items-center gap-1.5 bg-emerald-800 hover:bg-emerald-900 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-xs transition-colors"
          >
            <Award className="w-3.5 h-3.5 text-amber-300" />
            <span className="hidden md:inline">Mentor Links</span>
          </button>
        </div>
      </div>

      {/* Tabs Row */}
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 flex items-center gap-1 overflow-x-auto no-scrollbar border-t border-stone-100 py-1 text-xs sm:text-sm">
        {navTabs.map(tab => {
          if (tab.requiresAdmin && currentUser.role !== 'admin') return null;
          const isActive = activeTab === tab.id;

          return (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-3 py-1.5 rounded-lg font-medium whitespace-nowrap transition-all flex items-center gap-1.5 ${
                isActive
                  ? 'bg-emerald-700 text-white shadow-2xs font-semibold'
                  : 'text-stone-600 hover:text-stone-900 hover:bg-stone-100'
              } ${tab.highlight && !isActive ? 'text-emerald-700 font-semibold' : ''}`}
            >
              {tab.highlight && (
                <span className="flex h-1.5 w-1.5 rounded-full bg-emerald-500 animate-ping" />
              )}
              {tab.label}
            </button>
          );
        })}
      </nav>
    </header>
  );
};
