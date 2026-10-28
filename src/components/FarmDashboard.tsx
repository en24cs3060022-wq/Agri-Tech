import React from 'react';
import { User, Farm, Crop, SoilReport, WeatherData, PestAlert } from '../types';
import { TranslationStrings } from '../translations';
import { Sprout, CloudSun, AlertTriangle, Droplet, Thermometer, Wind, CheckCircle2, ArrowUpRight, Sparkles, Plus, Calendar, Compass, ShieldAlert } from 'lucide-react';

interface Props {
  currentUser: User;
  farms: Farm[];
  crops: Crop[];
  soilReports: SoilReport[];
  weather: WeatherData | null;
  pestAlerts: PestAlert[];
  setActiveTab: (tab: string) => void;
  onOpenAddFarm: () => void;
  onOpenAddCrop: () => void;
  t: TranslationStrings;
}

export const FarmDashboard: React.FC<Props> = ({
  currentUser,
  farms,
  crops,
  soilReports,
  weather,
  pestAlerts,
  setActiveTab,
  onOpenAddFarm,
  onOpenAddCrop,
  t
}) => {
  const totalAcres = farms.reduce((sum, f) => sum + f.areaAcres, 0);
  const averageCropHealth = crops.length > 0
    ? Math.round(crops.reduce((sum, c) => sum + c.healthScore, 0) / crops.length)
    : 90;

  const urgentPest = pestAlerts.find(p => p.severity === 'Severe' || p.severity === 'High');
  const latestSoil = soilReports[0];

  return (
    <div className="space-y-6">
      {/* Welcome Hero Card */}
      <div className="relative overflow-hidden bg-linear-to-r from-emerald-900 via-emerald-800 to-teal-800 rounded-3xl text-white p-6 sm:p-8 shadow-md">
        <div className="relative z-10 max-w-3xl space-y-3">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-700/60 border border-emerald-500/50 text-xs font-semibold text-emerald-200">
            <Compass className="w-3.5 h-3.5 text-amber-300" />
            <span>Region: {currentUser.location}</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            Welcome back, {currentUser.name}! 🌾
          </h1>
          <p className="text-emerald-100/90 text-sm sm:text-base leading-relaxed">
            Your fields are in optimal condition. Safe spraying window is open this morning, and 
            {crops.length} active crop cycles are progressing toward harvest.
          </p>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              onClick={() => setActiveTab('aidoctor')}
              className="px-4 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-md transition-all flex items-center gap-2"
            >
              <Sparkles className="w-4 h-4 text-emerald-950" />
              <span>AI Crop Doctor Scanner</span>
            </button>
            <button
              onClick={() => setActiveTab('soil')}
              className="px-4 py-2 bg-emerald-700/80 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm rounded-xl border border-emerald-500/60 transition-colors flex items-center gap-2"
            >
              <Droplet className="w-4 h-4 text-emerald-300" />
              <span>Analyze Soil Health</span>
            </button>
            <button
              onClick={onOpenAddFarm}
              className="px-4 py-2 bg-emerald-700/80 hover:bg-emerald-600 text-white font-semibold text-xs sm:text-sm rounded-xl border border-emerald-500/60 transition-colors flex items-center gap-2"
            >
              <Plus className="w-4 h-4" />
              <span>Add Farm Parcel</span>
            </button>
          </div>
        </div>

        {/* Decorative background circle */}
        <div className="absolute right-0 bottom-0 translate-x-12 translate-y-12 w-64 h-64 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none" />
      </div>

      {/* Urgent Alert Banner (if any active high severity pest) */}
      {urgentPest && (
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-xl shadow-2xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3">
          <div className="flex items-start gap-3">
            <div className="p-2 bg-amber-100 rounded-lg text-amber-800 shrink-0">
              <ShieldAlert className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="font-bold text-sm text-amber-900">Pest Alert: {urgentPest.name}</span>
                <span className="px-2 py-0.5 rounded text-2xs font-bold uppercase bg-rose-100 text-rose-800 border border-rose-300">
                  {urgentPest.severity}
                </span>
              </div>
              <p className="text-xs text-amber-800 mt-0.5">
                Affects: {urgentPest.affectedCrops.join(', ')} • {urgentPest.symptoms}
              </p>
            </div>
          </div>
          <button
            onClick={() => setActiveTab('weather')}
            className="px-3.5 py-1.5 bg-amber-700 hover:bg-amber-800 text-white text-xs font-semibold rounded-lg shrink-0 transition-colors"
          >
            View Treatment Plan
          </button>
        </div>
      )}

      {/* Metric Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {/* Total Land Parcel Card */}
        <div
          onClick={() => setActiveTab('farms')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold uppercase tracking-wider">
            <span>{t.metrics.totalFarms}</span>
            <div className="p-2 rounded-xl bg-emerald-50 text-emerald-700 group-hover:bg-emerald-100 transition-colors">
              <Sprout className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-stone-900 mt-2">{farms.length}</div>
          <div className="text-xs text-stone-500 mt-1 flex items-center justify-between">
            <span>{totalAcres.toFixed(1)} Acres Total</span>
            <span className="text-emerald-700 font-semibold group-hover:underline flex items-center">
              Manage <ArrowUpRight className="w-3 h-3 ml-0.5" />
            </span>
          </div>
        </div>

        {/* Active Crops Health Card */}
        <div
          onClick={() => setActiveTab('crops')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold uppercase tracking-wider">
            <span>{t.metrics.activeCrops}</span>
            <div className="p-2 rounded-xl bg-teal-50 text-teal-700 group-hover:bg-teal-100 transition-colors">
              <CheckCircle2 className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-stone-900 mt-2">{crops.length}</div>
          <div className="text-xs text-stone-500 mt-1 flex items-center justify-between">
            <span className="text-teal-700 font-semibold">{averageCropHealth}% Average Vigor</span>
            <span className="text-stone-400">Track cycle →</span>
          </div>
        </div>

        {/* Live Weather Card */}
        <div
          onClick={() => setActiveTab('weather')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold uppercase tracking-wider">
            <span>{t.metrics.weatherIndex}</span>
            <div className="p-2 rounded-xl bg-sky-50 text-sky-700 group-hover:bg-sky-100 transition-colors">
              <CloudSun className="w-4 h-4" />
            </div>
          </div>
          <div className="text-3xl font-bold text-stone-900 mt-2">
            {weather?.current.temp ?? 27.4}°C
          </div>
          <div className="text-xs text-stone-500 mt-1 flex items-center justify-between">
            <span>{weather?.current.condition || 'Partly Sunny'} • {weather?.current.humidity ?? 58}% Humid</span>
            <span className="text-sky-700 font-medium">7-Day →</span>
          </div>
        </div>

        {/* Spray Window / Soil Card */}
        <div
          onClick={() => setActiveTab('soil')}
          className="bg-white p-5 rounded-2xl border border-stone-200 shadow-2xs hover:shadow-xs transition-all cursor-pointer group"
        >
          <div className="flex items-center justify-between text-stone-500 text-xs font-semibold uppercase tracking-wider">
            <span>{t.metrics.sprayWindow}</span>
            <div className="p-2 rounded-xl bg-amber-50 text-amber-700 group-hover:bg-amber-100 transition-colors">
              <Droplet className="w-4 h-4" />
            </div>
          </div>
          <div className="text-2xl font-bold text-emerald-700 mt-2">
            {weather?.current.sprayingSuitability || 'Optimal'}
          </div>
          <div className="text-xs text-stone-500 mt-1 truncate" title={weather?.current.sprayNotice}>
            {weather?.current.sprayNotice || '8:00 AM - 11:30 AM'}
          </div>
        </div>
      </div>

      {/* Main Grid: Active Crop Timeline & Soil Analysis Quick Card */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Active Crops Lifecycle Preview */}
        <div className="lg:col-span-2 bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h2 className="text-base font-bold text-stone-900">Active Crop Cycles</h2>
              <p className="text-xs text-stone-500">Live developmental stage tracking & projected yield</p>
            </div>
            <button
              onClick={onOpenAddCrop}
              className="flex items-center gap-1.5 px-3 py-1.5 bg-emerald-700 hover:bg-emerald-800 text-white rounded-lg text-xs font-semibold transition-colors"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>New Crop</span>
            </button>
          </div>

          <div className="space-y-3.5">
            {crops.map(crop => {
              const farm = farms.find(f => f.id === crop.farmId);
              return (
                <div
                  key={crop.id}
                  className="p-4 rounded-xl border border-stone-200 bg-stone-50/70 hover:bg-white transition-all space-y-3"
                >
                  <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2">
                    <div>
                      <div className="flex items-center gap-2">
                        <h3 className="font-bold text-sm text-stone-900">{crop.name}</h3>
                        <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-stone-200 text-stone-700">
                          {crop.variety}
                        </span>
                        <span className="text-2xs font-bold px-2 py-0.5 rounded-full bg-emerald-100 text-emerald-800">
                          {crop.currentStage}
                        </span>
                      </div>
                      <p className="text-xs text-stone-500 mt-0.5">
                        Parcel: {farm?.name || 'Main Land'} • Target Yield: {crop.targetYieldTons} Tons
                      </p>
                    </div>

                    <div className="flex items-center gap-2 text-xs">
                      <span className="text-stone-500">Health:</span>
                      <span className="font-bold text-emerald-700 bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
                        {crop.healthScore}/100
                      </span>
                    </div>
                  </div>

                  {/* Stage Progress Bar */}
                  <div>
                    <div className="flex items-center justify-between text-2xs font-semibold text-stone-600 mb-1">
                      <span>Lifecycle Progression</span>
                      <span>{crop.stageProgress}%</span>
                    </div>
                    <div className="w-full bg-stone-200 h-2 rounded-full overflow-hidden">
                      <div
                        className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                        style={{ width: `${crop.stageProgress}%` }}
                      />
                    </div>
                  </div>

                  <div className="flex items-center justify-between text-2xs text-stone-500 pt-1 border-t border-stone-200/60">
                    <div className="flex items-center gap-1.5">
                      <Calendar className="w-3 h-3 text-stone-400" />
                      <span>Harvest: {crop.expectedHarvest}</span>
                    </div>
                    <div className="flex items-center gap-1.5">
                      <Droplet className="w-3 h-3 text-sky-500" />
                      <span>Moisture: {crop.soilMoistureCurrent}% ({crop.waterNeed} water need)</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Soil Health Summary & Quick Test */}
        <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4 flex flex-col justify-between">
          <div>
            <div className="flex items-center justify-between mb-3">
              <div>
                <h2 className="text-base font-bold text-stone-900">Soil Health Snapshot</h2>
                <p className="text-xs text-stone-500">{latestSoil?.farmName || 'Primary Farm'}</p>
              </div>
              <span className={`px-2.5 py-0.5 rounded-full text-xs font-bold ${
                latestSoil?.healthStatus === 'Excellent' || latestSoil?.healthStatus === 'Good'
                  ? 'bg-emerald-100 text-emerald-800'
                  : 'bg-amber-100 text-amber-800'
              }`}>
                {latestSoil?.healthStatus || 'Good'}
              </span>
            </div>

            {/* N-P-K Indicators */}
            <div className="grid grid-cols-3 gap-2.5 my-4">
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-center">
                <div className="text-2xs font-bold text-stone-500">Nitrogen (N)</div>
                <div className="text-lg font-extrabold text-stone-800 mt-0.5">{latestSoil?.nitrogen ?? 310}</div>
                <div className="text-2xs text-stone-400">kg/ha</div>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-center">
                <div className="text-2xs font-bold text-stone-500">Phosphorus (P)</div>
                <div className="text-lg font-extrabold text-stone-800 mt-0.5">{latestSoil?.phosphorus ?? 22}</div>
                <div className="text-2xs text-stone-400">kg/ha</div>
              </div>
              <div className="bg-stone-50 p-2.5 rounded-xl border border-stone-200 text-center">
                <div className="text-2xs font-bold text-stone-500">Potassium (K)</div>
                <div className="text-lg font-extrabold text-stone-800 mt-0.5">{latestSoil?.potassium ?? 240}</div>
                <div className="text-2xs text-stone-400">kg/ha</div>
              </div>
            </div>

            {/* pH and Organic Carbon */}
            <div className="space-y-2 text-xs">
              <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-150">
                <span className="text-stone-600 font-medium">Soil pH Level:</span>
                <span className="font-bold text-stone-900">{latestSoil?.phLevel ?? 7.2} (Ideal Neutral)</span>
              </div>
              <div className="flex items-center justify-between p-2 rounded-lg bg-stone-50 border border-stone-150">
                <span className="text-stone-600 font-medium">Organic Carbon:</span>
                <span className="font-bold text-emerald-700">{latestSoil?.organicCarbon ?? 0.82}% (Optimal)</span>
              </div>
            </div>

            {/* Latest Recommendation snippet */}
            {latestSoil && latestSoil.recommendations.length > 0 && (
              <div className="mt-4 p-3 bg-emerald-50/80 border border-emerald-200 rounded-xl">
                <div className="text-2xs font-bold text-emerald-800 uppercase tracking-wider mb-1">
                  Agronomic Recommendation
                </div>
                <p className="text-xs text-emerald-950 leading-relaxed">
                  {latestSoil.recommendations[0]}
                </p>
              </div>
            )}
          </div>

          <button
            onClick={() => setActiveTab('soil')}
            className="w-full mt-4 py-2 bg-stone-900 hover:bg-stone-800 text-white rounded-xl text-xs font-semibold transition-colors text-center"
          >
            Open Soil Fertilizer Calculator →
          </button>
        </div>
      </div>
    </div>
  );
};
