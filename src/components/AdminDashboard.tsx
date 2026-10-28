import React, { useState } from 'react';
import { User, Farm } from '../types';
import { TranslationStrings } from '../translations';
import { ShieldCheck, Users, Layers, TrendingUp, AlertTriangle, Radio, CheckCircle2, Server, Send } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  currentUser: User;
  farms: Farm[];
  onBroadcastAlert: (title: string, message: string, priority: string) => Promise<void>;
  t: TranslationStrings;
}

export const AdminDashboard: React.FC<Props> = ({
  currentUser,
  farms,
  onBroadcastAlert,
  t
}) => {
  const [broadcastTitle, setBroadcastTitle] = useState('');
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [priority, setPriority] = useState('High');
  const [isSending, setIsSending] = useState(false);
  const [sentSuccess, setSentSuccess] = useState(false);

  const totalAcres = farms.reduce((sum, f) => sum + f.areaAcres, 0);

  const handleBroadcast = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!broadcastTitle || !broadcastMessage) return;
    setIsSending(true);
    try {
      await onBroadcastAlert(broadcastTitle, broadcastMessage, priority);
      setSentSuccess(true);
      confetti({ particleCount: 50, spread: 60 });
      setBroadcastTitle('');
      setBroadcastMessage('');
      setTimeout(() => setSentSuccess(false), 3000);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSending(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2">
            <span className="px-2.5 py-0.5 rounded-full text-2xs font-bold uppercase tracking-wider bg-rose-100 text-rose-800 border border-rose-300">
              Admin Privilege Level 1
            </span>
          </div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 mt-1 flex items-center gap-2">
            <ShieldCheck className="w-6 h-6 text-emerald-700" />
            <span>Admin Console & System Infrastructure Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-0.5">
            Role-based access control, regional agricultural acreage oversight, and urgent advisories.
          </p>
        </div>
      </div>

      {/* System Metrics */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase">
            <span>Registered Farmers</span>
            <Users className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 mt-2">1,248</div>
          <div className="text-xs text-stone-500 mt-1">Across 4 State Clusters</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase">
            <span>Cultivated Area</span>
            <Layers className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-3xl font-extrabold text-stone-900 mt-2">{totalAcres.toFixed(1)} Ac</div>
          <div className="text-xs text-stone-500 mt-1">Under Active Drip/Canal</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase">
            <span>API Server Uptime</span>
            <Server className="w-4 h-4 text-teal-600" />
          </div>
          <div className="text-3xl font-extrabold text-emerald-700 mt-2">99.98%</div>
          <div className="text-xs text-stone-500 mt-1">Latency &lt; 45ms</div>
        </div>

        <div className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs">
          <div className="flex items-center justify-between text-xs font-semibold text-stone-500 uppercase">
            <span>Security Status</span>
            <CheckCircle2 className="w-4 h-4 text-emerald-600" />
          </div>
          <div className="text-2xl font-bold text-stone-900 mt-2">JWT & RBAC</div>
          <div className="text-xs text-stone-500 mt-1">Encrypted Sessions Active</div>
        </div>
      </div>

      {/* Emergency Advisory Broadcast Form */}
      <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-4">
        <div className="flex items-center gap-2 pb-2 border-b border-stone-100">
          <Radio className="w-5 h-5 text-rose-600 animate-pulse" />
          <div>
            <h2 className="text-base font-bold text-stone-900">Broadcast Urgent Agricultural Advisory</h2>
            <p className="text-xs text-stone-500">
              Immediately alerts all connected farmer dashboards and triggers pest warning banners.
            </p>
          </div>
        </div>

        {sentSuccess && (
          <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl text-xs font-medium flex items-center gap-2">
            <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
            <span>Advisory broadcast sent to all farmers and recorded in pest bulletins!</span>
          </div>
        )}

        <form onSubmit={handleBroadcast} className="space-y-4 text-xs sm:text-sm">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
            <div className="sm:col-span-2">
              <label className="block text-2xs font-bold uppercase text-stone-600 mb-1">
                Advisory Title / Headline *
              </label>
              <input
                type="text"
                required
                value={broadcastTitle}
                onChange={(e) => setBroadcastTitle(e.target.value)}
                placeholder="e.g. Unseasonal Hailstorm Warning - Cover Sensitive Nurseries"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs font-medium focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
              />
            </div>

            <div>
              <label className="block text-2xs font-bold uppercase text-stone-600 mb-1">
                Priority Level
              </label>
              <select
                value={priority}
                onChange={(e) => setPriority(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-medium"
              >
                <option value="High">High Severity (Red Ticker)</option>
                <option value="Moderate">Moderate Advisory</option>
              </select>
            </div>
          </div>

          <div>
            <label className="block text-2xs font-bold uppercase text-stone-600 mb-1">
              Advisory Content & Recommended Farmer Actions *
            </label>
            <textarea
              rows={3}
              required
              value={broadcastMessage}
              onChange={(e) => setBroadcastMessage(e.target.value)}
              placeholder="Outline specific precautions, spray windows, or crop protection steps..."
              className="w-full px-3 py-2 border border-stone-300 rounded-lg text-xs leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
            />
          </div>

          <div className="flex items-center justify-end">
            <button
              type="submit"
              disabled={isSending}
              className="px-5 py-2 bg-rose-700 hover:bg-rose-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center gap-2"
            >
              <Send className="w-4 h-4" />
              <span>{isSending ? 'Transmitting...' : 'Transmit Broadcast to All Farmers'}</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
