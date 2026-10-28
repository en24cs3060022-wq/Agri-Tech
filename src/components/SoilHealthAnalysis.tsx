import React, { useState } from 'react';
import { SoilReport, Farm } from '../types';
import { TranslationStrings } from '../translations';
import { Droplet, Activity, Sparkles, CheckCircle2, AlertTriangle, Calculator, FileText, FlaskConical } from 'lucide-react';

interface Props {
  soilReports: SoilReport[];
  farms: Farm[];
  onAddSoilReport: (reportData: any) => Promise<void>;
  t: TranslationStrings;
}

export const SoilHealthAnalysis: React.FC<Props> = ({
  soilReports,
  farms,
  onAddSoilReport,
  t
}) => {
  const [selectedReportId, setSelectedReportId] = useState<string>(soilReports[0]?.id || '');
  const [farmId, setFarmId] = useState(farms[0]?.id || '');
  const [nitrogen, setNitrogen] = useState('320');
  const [phosphorus, setPhosphorus] = useState('22');
  const [potassium, setPotassium] = useState('240');
  const [phLevel, setPhLevel] = useState('7.2');
  const [organicCarbon, setOrganicCarbon] = useState('0.78');
  const [moisture, setMoisture] = useState('42');
  const [isCalculating, setIsCalculating] = useState(false);

  const activeReport = soilReports.find((r) => r.id === selectedReportId) || soilReports[0];

  const handleCalculateDosage = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsCalculating(true);
    try {
      await onAddSoilReport({
        farmId: farmId || farms[0]?.id,
        nitrogen: parseFloat(nitrogen),
        phosphorus: parseFloat(phosphorus),
        potassium: parseFloat(potassium),
        phLevel: parseFloat(phLevel),
        organicCarbon: parseFloat(organicCarbon),
        moisture: parseFloat(moisture),
        ec: 0.55
      });
    } catch (err) {
      console.error(err);
    } finally {
      setIsCalculating(false);
    }
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <FlaskConical className="w-6 h-6 text-emerald-700" />
            <span>Soil Health Analysis & Nutrient Management</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            NPK macronutrient balance, pH diagnosis, and automated fertilizer dosage calculators.
          </p>
        </div>

        {/* Report Selector Dropdown */}
        {soilReports.length > 1 && (
          <div className="flex items-center gap-2 bg-white px-3 py-1.5 rounded-xl border border-stone-300 text-xs shadow-2xs">
            <span className="text-stone-500 font-medium">Select Report:</span>
            <select
              value={activeReport?.id}
              onChange={(e) => setSelectedReportId(e.target.value)}
              className="bg-transparent font-bold text-stone-800 focus:outline-hidden cursor-pointer"
            >
              {soilReports.map((r) => (
                <option key={r.id} value={r.id}>
                  {r.farmName} ({r.testDate})
                </option>
              ))}
            </select>
          </div>
        )}
      </div>

      {/* Main Grid: Active Report Gauges & Calculator */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Column: Active Soil Report Visualizer */}
        <div className="lg:col-span-7 space-y-5">
          {activeReport ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-6">
              <div className="flex items-center justify-between">
                <div>
                  <span className="text-2xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full">
                    Health Status: {activeReport.healthStatus}
                  </span>
                  <h2 className="text-lg font-bold text-stone-900 mt-1">{activeReport.farmName}</h2>
                  <p className="text-xs text-stone-500">Soil Testing Date: {activeReport.testDate}</p>
                </div>
                <div className="w-12 h-12 rounded-2xl bg-emerald-50 border border-emerald-200 flex items-center justify-center text-emerald-700">
                  <Activity className="w-6 h-6" />
                </div>
              </div>

              {/* NPK Macronutrients Breakdown */}
              <div className="space-y-4 pt-2 border-t border-stone-100">
                <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500">
                  Primary Macronutrients (N - P - K)
                </h3>

                {/* Nitrogen */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800">Available Nitrogen (N)</span>
                    <span className="font-bold text-emerald-700">
                      {activeReport.nitrogen} kg/ha{' '}
                      <span className="text-stone-400 font-normal">(Ideal: 280-560 kg/ha)</span>
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        activeReport.nitrogen < 250
                          ? 'bg-amber-500'
                          : activeReport.nitrogen > 500
                          ? 'bg-blue-500'
                          : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.min(100, (activeReport.nitrogen / 600) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Phosphorus */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800">Available Phosphorus (P₂O₅)</span>
                    <span className="font-bold text-emerald-700">
                      {activeReport.phosphorus} kg/ha{' '}
                      <span className="text-stone-400 font-normal">(Ideal: 15-25 kg/ha)</span>
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        activeReport.phosphorus < 15 ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.min(100, (activeReport.phosphorus / 35) * 100)}%` }}
                    />
                  </div>
                </div>

                {/* Potassium */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-semibold text-stone-800">Available Potassium (K₂O)</span>
                    <span className="font-bold text-emerald-700">
                      {activeReport.potassium} kg/ha{' '}
                      <span className="text-stone-400 font-normal">(Ideal: 150-300 kg/ha)</span>
                    </span>
                  </div>
                  <div className="w-full bg-stone-100 h-2.5 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all duration-500 ${
                        activeReport.potassium < 150 ? 'bg-amber-500' : 'bg-emerald-600'
                      }`}
                      style={{ width: `${Math.min(100, (activeReport.potassium / 350) * 100)}%` }}
                    />
                  </div>
                </div>
              </div>

              {/* pH & Organic Carbon Indicators */}
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 pt-2">
                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
                  <div className="text-2xs font-bold uppercase text-stone-500">Soil Reaction (pH)</div>
                  <div className="text-2xl font-extrabold text-stone-900 mt-1">{activeReport.phLevel}</div>
                  <div className="text-2xs text-emerald-700 font-semibold mt-0.5">
                    {activeReport.phLevel < 6.0
                      ? 'Acidic'
                      : activeReport.phLevel > 7.8
                      ? 'Alkaline'
                      : 'Optimal Neutral'}
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
                  <div className="text-2xs font-bold uppercase text-stone-500">Organic Carbon (OC)</div>
                  <div className="text-2xl font-extrabold text-stone-900 mt-1">{activeReport.organicCarbon}%</div>
                  <div className="text-2xs text-emerald-700 font-semibold mt-0.5">
                    {activeReport.organicCarbon >= 0.75 ? 'Healthy' : 'Moderate'}
                  </div>
                </div>

                <div className="p-3.5 bg-stone-50 rounded-xl border border-stone-200 text-center">
                  <div className="text-2xs font-bold uppercase text-stone-500">Electrical Cond.</div>
                  <div className="text-2xl font-extrabold text-stone-900 mt-1">{activeReport.ec}</div>
                  <div className="text-2xs text-stone-500 font-medium mt-0.5">dS/m (Non-saline)</div>
                </div>
              </div>

              {/* Actionable Agronomic Recommendations */}
              <div className="p-4 bg-emerald-50/70 border border-emerald-200 rounded-xl space-y-2.5">
                <div className="flex items-center gap-2 text-xs font-bold text-emerald-900 uppercase tracking-wider">
                  <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                  <span>Tailored Fertilizer & Treatment Action Plan</span>
                </div>
                <ul className="space-y-2 text-xs text-stone-800">
                  {activeReport.recommendations.map((rec, i) => (
                    <li key={i} className="flex items-start gap-2">
                      <span className="font-bold text-emerald-700 mt-0.5">•</span>
                      <span>{rec}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ) : (
            <div className="bg-white rounded-2xl border border-stone-200 p-8 text-center text-stone-500">
              No soil reports recorded yet. Use the calculator to run your first test.
            </div>
          )}
        </div>

        {/* Right Column: Fertilizer Calculator */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-5">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-100 rounded-xl text-emerald-800">
              <Calculator className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-base font-bold text-stone-900">Soil Dosage Calculator</h2>
              <p className="text-xs text-stone-500">Input lab values to compute optimal fertilizer doses</p>
            </div>
          </div>

          <form onSubmit={handleCalculateDosage} className="space-y-4 text-xs sm:text-sm">
            <div>
              <label className="block font-semibold text-stone-700 mb-1">Target Farm Parcel</label>
              <select
                value={farmId}
                onChange={(e) => setFarmId(e.target.value)}
                className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs font-medium"
              >
                {farms.map((f) => (
                  <option key={f.id} value={f.id}>
                    {f.name} ({f.soilType})
                  </option>
                ))}
              </select>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Nitrogen (N kg/ha)</label>
                <input
                  type="number"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Phosphorus (P kg/ha)</label>
                <input
                  type="number"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Potassium (K kg/ha)</label>
                <input
                  type="number"
                  value={potassium}
                  onChange={(e) => setPotassium(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Soil pH (0 - 14)</label>
                <input
                  type="number"
                  step="0.1"
                  value={phLevel}
                  onChange={(e) => setPhLevel(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs font-medium"
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Organic Carbon (%)</label>
                <input
                  type="number"
                  step="0.05"
                  value={organicCarbon}
                  onChange={(e) => setOrganicCarbon(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs font-medium"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Moisture (%)</label>
                <input
                  type="number"
                  value={moisture}
                  onChange={(e) => setMoisture(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs font-medium"
                />
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                disabled={isCalculating}
                className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-semibold text-xs sm:text-sm rounded-xl shadow-xs transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
              >
                <Sparkles className="w-4 h-4 text-amber-300" />
                <span>{isCalculating ? 'Computing Recommendations...' : 'Analyze & Save Soil Card'}</span>
              </button>
            </div>
          </form>

          <div className="p-3 bg-stone-50 rounded-xl border border-stone-200 text-2xs text-stone-500 leading-relaxed">
            💡 <strong>Expert Note:</strong> Testing soil every 2 years reduces excess chemical fertilizer usage by up to 25%, preserving microbial biodiversity and cutting input costs.
          </div>
        </div>
      </div>
    </div>
  );
};
