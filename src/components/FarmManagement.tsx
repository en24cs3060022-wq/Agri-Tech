import React, { useState } from 'react';
import { Farm, Crop } from '../types';
import { TranslationStrings } from '../translations';
import { Sprout, Plus, MapPin, Layers, Droplet, Trash2, Edit2, CheckCircle2, AlertCircle } from 'lucide-react';

interface Props {
  farms: Farm[];
  crops: Crop[];
  onAddFarm: (farmData: Partial<Farm>) => Promise<void>;
  onDeleteFarm: (farmId: string) => Promise<void>;
  t: TranslationStrings;
}

export const FarmManagement: React.FC<Props> = ({
  farms,
  crops,
  onAddFarm,
  onDeleteFarm,
  t
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [name, setName] = useState('');
  const [location, setLocation] = useState('');
  const [areaAcres, setAreaAcres] = useState('');
  const [soilType, setSoilType] = useState<Farm['soilType']>('Black Cotton');
  const [irrigationType, setIrrigationType] = useState<Farm['irrigationType']>('Drip');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !areaAcres) return;
    setIsSubmitting(true);
    try {
      await onAddFarm({
        name,
        location: location || 'Indore Rural Agricultural Cluster',
        areaAcres: parseFloat(areaAcres),
        soilType,
        irrigationType,
      });
      setName('');
      setLocation('');
      setAreaAcres('');
      setIsModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header Row */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <Sprout className="w-6 h-6 text-emerald-700" />
            <span>Farm Profile Setup & Land Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Register land parcels, map soil types, and monitor irrigation systems across your holdings.
          </p>
        </div>

        <button
          onClick={() => setIsModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Register New Farm Parcel</span>
        </button>
      </div>

      {/* Farms Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
        {farms.map((farm) => {
          const farmCrops = crops.filter((c) => c.farmId === farm.id);

          return (
            <div
              key={farm.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between"
            >
              <div className="space-y-4">
                <div className="flex items-start justify-between gap-2">
                  <div>
                    <span className="text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800 border border-emerald-200">
                      {farm.status}
                    </span>
                    <h3 className="font-bold text-base text-stone-900 mt-1.5">{farm.name}</h3>
                    <div className="flex items-center gap-1.5 text-xs text-stone-500 mt-1">
                      <MapPin className="w-3.5 h-3.5 text-stone-400 shrink-0" />
                      <span className="truncate">{farm.location}</span>
                    </div>
                  </div>
                  <button
                    onClick={() => onDeleteFarm(farm.id)}
                    className="p-1.5 text-stone-400 hover:text-rose-600 rounded-lg hover:bg-rose-50 transition-colors"
                    title="Delete Farm Parcel"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>

                {/* Details Grid */}
                <div className="grid grid-cols-2 gap-2.5 pt-2 border-t border-stone-100 text-xs">
                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                    <span className="text-stone-500 font-medium block">Total Acreage</span>
                    <span className="font-bold text-stone-800 text-sm mt-0.5">{farm.areaAcres} Acres</span>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                    <span className="text-stone-500 font-medium block">Soil Type</span>
                    <span className="font-bold text-stone-800 text-sm mt-0.5">{farm.soilType}</span>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                    <span className="text-stone-500 font-medium block">Irrigation Mode</span>
                    <span className="font-bold text-stone-800 text-sm mt-0.5">{farm.irrigationType}</span>
                  </div>
                  <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-150">
                    <span className="text-stone-500 font-medium block">Active Crops</span>
                    <span className="font-bold text-emerald-700 text-sm mt-0.5">{farmCrops.length} Standing</span>
                  </div>
                </div>

                {/* Standing Crops Chips */}
                {farmCrops.length > 0 && (
                  <div className="pt-2">
                    <span className="text-2xs font-semibold text-stone-500 uppercase tracking-wider block mb-1.5">
                      Cultivated Crops:
                    </span>
                    <div className="flex flex-wrap gap-1.5">
                      {farmCrops.map((c) => (
                        <span
                          key={c.id}
                          className="px-2 py-0.5 bg-stone-100 text-stone-700 rounded-md text-2xs font-medium border border-stone-200"
                        >
                          {c.name} ({c.currentStage})
                        </span>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              <div className="mt-4 pt-3 border-t border-stone-100 flex items-center justify-between text-2xs text-stone-400">
                <span>Registered: {farm.registeredDate}</span>
                <span className="text-emerald-700 font-semibold">Parcels active</span>
              </div>
            </div>
          );
        })}
      </div>

      {/* Add Farm Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-md w-full border border-stone-200 p-6 space-y-4">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-700" />
              <span>Register New Farm Parcel</span>
            </h3>

            <form onSubmit={handleSubmit} className="space-y-4 text-xs sm:text-sm">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Farm Parcel Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. North Khasra Field No. 4"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Location / GPS Coordinates</label>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="e.g. Dewas Sector B (22.96° N, 76.05° E)"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Land Area (in Acres) *</label>
                <input
                  type="number"
                  step="0.1"
                  required
                  value={areaAcres}
                  onChange={(e) => setAreaAcres(e.target.value)}
                  placeholder="e.g. 8.5"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-medium"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Soil Classification</label>
                  <select
                    value={soilType}
                    onChange={(e) => setSoilType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Black Cotton">Black Cotton</option>
                    <option value="Loamy">Loamy</option>
                    <option value="Alluvial">Alluvial</option>
                    <option value="Clay">Clay</option>
                    <option value="Sandy">Sandy</option>
                    <option value="Red">Red Soil</option>
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Irrigation System</label>
                  <select
                    value={irrigationType}
                    onChange={(e) => setIrrigationType(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Drip">Drip Irrigation</option>
                    <option value="Sprinkler">Sprinkler System</option>
                    <option value="Canal">Canal Irrigation</option>
                    <option value="Rainfed">Rainfed</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-sm transition-colors"
                >
                  {isSubmitting ? 'Registering...' : 'Save Parcel'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
