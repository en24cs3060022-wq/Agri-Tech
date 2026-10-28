import React, { useState } from 'react';
import { Crop, Farm } from '../types';
import { TranslationStrings } from '../translations';
import { Sprout, Plus, Calendar, Droplets, HeartPulse, CheckCircle2, TrendingUp, AlertCircle, Trash2 } from 'lucide-react';

interface Props {
  crops: Crop[];
  farms: Farm[];
  onAddCrop: (cropData: Partial<Crop>) => Promise<void>;
  onUpdateCrop: (cropId: string, updates: Partial<Crop>) => Promise<void>;
  onDeleteCrop: (cropId: string) => Promise<void>;
  isAddModalOpen: boolean;
  setIsAddModalOpen: (open: boolean) => void;
  t: TranslationStrings;
}

const STAGES: Crop['currentStage'][] = ['Germination', 'Vegetative', 'Flowering', 'Maturity', 'Harvesting'];

export const CropMonitoring: React.FC<Props> = ({
  crops,
  farms,
  onAddCrop,
  onUpdateCrop,
  onDeleteCrop,
  isAddModalOpen,
  setIsAddModalOpen,
  t
}) => {
  const [name, setName] = useState('');
  const [variety, setVariety] = useState('');
  const [farmId, setFarmId] = useState(farms[0]?.id || '');
  const [sowingDate, setSowingDate] = useState(new Date().toISOString().split('T')[0]);
  const [expectedHarvest, setExpectedHarvest] = useState(
    new Date(Date.now() + 90 * 86400000).toISOString().split('T')[0]
  );
  const [targetYieldTons, setTargetYieldTons] = useState('15');
  const [waterNeed, setWaterNeed] = useState<Crop['waterNeed']>('Medium');
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCreateCrop = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name || !variety) return;
    setIsSubmitting(true);
    try {
      await onAddCrop({
        name,
        variety,
        farmId: farmId || (farms[0] ? farms[0].id : 'farm-1'),
        sowingDate,
        expectedHarvest,
        targetYieldTons: parseFloat(targetYieldTons) || 10,
        waterNeed,
        notes: notes || 'Crop cycle registered successfully.'
      });
      setName('');
      setVariety('');
      setNotes('');
      setIsAddModalOpen(false);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleStageChange = async (cropId: string, newStage: Crop['currentStage']) => {
    const stageIdx = STAGES.indexOf(newStage);
    const progress = Math.min(100, Math.round(((stageIdx + 1) / STAGES.length) * 100));
    await onUpdateCrop(cropId, { currentStage: newStage, stageProgress: progress });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <Sprout className="w-6 h-6 text-emerald-700" />
            <span>Crop Monitoring & Lifecycle Progression</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time phenological growth stages, vigor index, and moisture balance monitoring.
          </p>
        </div>

        <button
          onClick={() => setIsAddModalOpen(true)}
          className="flex items-center gap-2 px-4 py-2 bg-emerald-700 hover:bg-emerald-800 text-white rounded-xl text-xs sm:text-sm font-semibold shadow-xs transition-colors"
        >
          <Plus className="w-4 h-4" />
          <span>Add Crop Cycle</span>
        </button>
      </div>

      {/* Crops Cards List */}
      <div className="space-y-5">
        {crops.map((crop) => {
          const farm = farms.find((f) => f.id === crop.farmId);
          const currentStageIndex = STAGES.indexOf(crop.currentStage);

          return (
            <div
              key={crop.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 sm:p-6 shadow-2xs hover:shadow-xs transition-all space-y-5"
            >
              {/* Top Details Row */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                  <div className="flex flex-wrap items-center gap-2">
                    <h3 className="text-lg font-bold text-stone-900">{crop.name}</h3>
                    <span className="text-xs px-2.5 py-0.5 rounded-full font-semibold bg-emerald-100 text-emerald-800 border border-emerald-200">
                      Variety: {crop.variety}
                    </span>
                    <span className="text-xs px-2 py-0.5 rounded-full bg-stone-100 text-stone-600 font-medium">
                      Parcel: {farm?.name || 'Primary Farm'}
                    </span>
                  </div>
                  <p className="text-xs text-stone-500 mt-1">
                    Sown on: <strong>{crop.sowingDate}</strong> • Projected Harvest: <strong>{crop.expectedHarvest}</strong>
                  </p>
                </div>

                {/* Metrics Badges */}
                <div className="flex items-center gap-3">
                  <div className="bg-emerald-50 border border-emerald-200 px-3 py-1.5 rounded-xl text-center">
                    <div className="text-2xs font-semibold text-emerald-700 uppercase">Health Score</div>
                    <div className="text-base font-extrabold text-emerald-800">{crop.healthScore}/100</div>
                  </div>

                  <div className="bg-sky-50 border border-sky-200 px-3 py-1.5 rounded-xl text-center">
                    <div className="text-2xs font-semibold text-sky-700 uppercase">Moisture</div>
                    <div className="text-base font-extrabold text-sky-800">{crop.soilMoistureCurrent}%</div>
                  </div>

                  <div className="bg-amber-50 border border-amber-200 px-3 py-1.5 rounded-xl text-center">
                    <div className="text-2xs font-semibold text-amber-700 uppercase">Target Yield</div>
                    <div className="text-base font-extrabold text-amber-900">{crop.targetYieldTons} Tons</div>
                  </div>

                  <button
                    onClick={() => onDeleteCrop(crop.id)}
                    className="p-2 text-stone-400 hover:text-rose-600 hover:bg-rose-50 rounded-xl transition-colors ml-1"
                    title="Delete Crop Cycle"
                  >
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>

              {/* Graphical Lifecycle Stepper */}
              <div className="pt-2">
                <div className="flex items-center justify-between text-xs font-semibold text-stone-700 mb-2">
                  <span>Growth Lifecycle Stage</span>
                  <span className="text-emerald-700 font-bold">{crop.currentStage} ({crop.stageProgress}%)</span>
                </div>

                <div className="grid grid-cols-5 gap-2 relative">
                  {STAGES.map((stage, idx) => {
                    const isPassed = idx < currentStageIndex;
                    const isCurrent = idx === currentStageIndex;

                    return (
                      <button
                        key={stage}
                        onClick={() => handleStageChange(crop.id, stage)}
                        className={`text-left p-2.5 rounded-xl border text-xs transition-all ${
                          isCurrent
                            ? 'bg-emerald-700 text-white border-emerald-700 shadow-sm font-bold ring-2 ring-emerald-300'
                            : isPassed
                            ? 'bg-emerald-50 text-emerald-900 border-emerald-300 font-semibold'
                            : 'bg-stone-50 text-stone-400 border-stone-200 hover:bg-stone-100'
                        }`}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-2xs uppercase tracking-wider opacity-80">Stage {idx + 1}</span>
                          {isPassed && <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />}
                        </div>
                        <div className="font-semibold text-xs mt-1 truncate">{stage}</div>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Notes & Advice */}
              {crop.notes && (
                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs text-stone-700 flex items-start gap-2">
                  <HeartPulse className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-semibold text-stone-800">Field Observer Note: </span>
                    <span>{crop.notes}</span>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Add Crop Modal */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
          <div className="bg-white rounded-2xl shadow-xl max-w-lg w-full border border-stone-200 p-6 space-y-4">
            <h3 className="text-lg font-bold text-stone-900 flex items-center gap-2">
              <Plus className="w-5 h-5 text-emerald-700" />
              <span>Plant New Crop Cycle</span>
            </h3>

            <form onSubmit={handleCreateCrop} className="space-y-4 text-xs sm:text-sm">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Crop Name *</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Basmati Rice, Mustard"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-medium"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Crop Variety *</label>
                  <input
                    type="text"
                    required
                    value={variety}
                    onChange={(e) => setVariety(e.target.value)}
                    placeholder="e.g. Pusa-1121, HD-2967"
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-medium"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Select Farm Parcel</label>
                  <select
                    value={farmId}
                    onChange={(e) => setFarmId(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  >
                    {farms.map((f) => (
                      <option key={f.id} value={f.id}>
                        {f.name} ({f.areaAcres} Acres)
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Water Need</label>
                  <select
                    value={waterNeed}
                    onChange={(e) => setWaterNeed(e.target.value as any)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  >
                    <option value="Low">Low (Drought Resilient)</option>
                    <option value="Medium">Medium Requirement</option>
                    <option value="High">High (Flood / Wetland)</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Sowing Date</label>
                  <input
                    type="date"
                    required
                    value={sowingDate}
                    onChange={(e) => setSowingDate(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-stone-700 mb-1">Estimated Harvest</label>
                  <input
                    type="date"
                    required
                    value={expectedHarvest}
                    onChange={(e) => setExpectedHarvest(e.target.value)}
                    className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                  />
                </div>
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Target Yield (Tons)</label>
                <input
                  type="number"
                  step="0.5"
                  value={targetYieldTons}
                  onChange={(e) => setTargetYieldTons(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Field Observation Notes</label>
                <textarea
                  rows={2}
                  value={notes}
                  onChange={(e) => setNotes(e.target.value)}
                  placeholder="e.g. Sown with seed drill at 4cm depth with Rhizobium culture"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600"
                />
              </div>

              <div className="flex items-center justify-end gap-2 pt-3 border-t border-stone-100">
                <button
                  type="button"
                  onClick={() => setIsAddModalOpen(false)}
                  className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 hover:bg-stone-50 font-medium"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold rounded-lg shadow-sm transition-colors"
                >
                  {isSubmitting ? 'Adding...' : 'Plant Crop'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
