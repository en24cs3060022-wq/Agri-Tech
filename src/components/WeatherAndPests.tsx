import React from 'react';
import { WeatherData, PestAlert } from '../types';
import { TranslationStrings } from '../translations';
import { CloudSun, Wind, Droplets, Thermometer, ShieldAlert, AlertTriangle, CheckCircle2, Calendar, Compass, Sun, Eye, Sparkles } from 'lucide-react';

interface Props {
  weather: WeatherData | null;
  pestAlerts: PestAlert[];
  setActiveTab: (tab: string) => void;
  t: TranslationStrings;
}

export const WeatherAndPests: React.FC<Props> = ({
  weather,
  pestAlerts,
  setActiveTab,
  t
}) => {
  const current = weather?.current;
  const forecast = weather?.forecast || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-4 border-b border-stone-200">
        <div>
          <h1 className="text-xl sm:text-2xl font-bold text-stone-900 flex items-center gap-2">
            <CloudSun className="w-6 h-6 text-sky-600" />
            <span>Weather Forecasting & Regional Pest Early Warning</span>
          </h1>
          <p className="text-xs sm:text-sm text-stone-500 mt-1">
            Real-time agro-meteorology, spray window suitability index, and pest mitigation advisories.
          </p>
        </div>

        <button
          onClick={() => setActiveTab('aidoctor')}
          className="flex items-center gap-2 px-3.5 py-2 bg-amber-400 hover:bg-amber-300 text-stone-950 font-bold text-xs sm:text-sm rounded-xl shadow-xs transition-colors"
        >
          <Sparkles className="w-4 h-4 text-emerald-950" />
          <span>Launch AI Pest Scanner</span>
        </button>
      </div>

      {/* Current Agro-Weather Status Banner */}
      <div className="bg-linear-to-r from-sky-900 via-teal-900 to-emerald-900 rounded-3xl text-white p-6 shadow-md space-y-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 text-xs font-semibold text-sky-200">
              <Compass className="w-3.5 h-3.5" />
              <span>{current?.location || 'Central Agro-Meteorological Station'}</span>
            </div>
            <div className="flex items-baseline gap-4 mt-2">
              <div className="text-4xl sm:text-5xl font-extrabold">{current?.temp ?? 27.4}°C</div>
              <div className="text-sm sm:text-base text-sky-200 font-medium">
                Feels like {current?.feelsLike ?? 29.1}°C • {current?.condition || 'Partly Sunny'}
              </div>
            </div>
          </div>

          {/* Spray Window Rating Badge */}
          <div className="bg-white/10 backdrop-blur-md rounded-2xl p-4 border border-white/20 text-right md:text-left">
            <div className="text-2xs uppercase tracking-wider text-sky-300 font-bold">
              Pesticide / Foliar Spray Window
            </div>
            <div className="text-xl font-extrabold text-emerald-300 mt-0.5">
              {current?.sprayingSuitability || 'Optimal Suitability'}
            </div>
            <p className="text-xs text-stone-200 mt-1 max-w-xs">
              {current?.sprayNotice || 'Low wind (<10 km/h) and minimal rain risk.'}
            </p>
          </div>
        </div>

        {/* Real-time parameter cards */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 pt-2 border-t border-white/15">
          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-2xs text-sky-200 flex items-center justify-center gap-1">
              <Droplets className="w-3 h-3" /> Humidity
            </div>
            <div className="text-base font-bold mt-0.5">{current?.humidity ?? 58}%</div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-2xs text-sky-200 flex items-center justify-center gap-1">
              <Wind className="w-3 h-3" /> Wind
            </div>
            <div className="text-base font-bold mt-0.5">{current?.windSpeedKmh ?? 9.5} km/h {current?.windDirection || 'NE'}</div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-2xs text-sky-200 flex items-center justify-center gap-1">
              <CloudSun className="w-3 h-3" /> Rain Prob.
            </div>
            <div className="text-base font-bold mt-0.5">{current?.rainfallProbability ?? 12}%</div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-2xs text-sky-200 flex items-center justify-center gap-1">
              <Sun className="w-3 h-3" /> UV Index
            </div>
            <div className="text-base font-bold mt-0.5">{current?.uvIndex ?? 6} (Moderate)</div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-2xs text-sky-200 flex items-center justify-center gap-1">
              <Thermometer className="w-3 h-3" /> Soil Temp
            </div>
            <div className="text-base font-bold mt-0.5">{current?.soilTempCelsius ?? 22.8}°C</div>
          </div>

          <div className="bg-white/10 rounded-xl p-3 text-center">
            <div className="text-2xs text-sky-200 flex items-center justify-center gap-1">
              <Droplets className="w-3 h-3" /> Soil Moisture
            </div>
            <div className="text-base font-bold mt-0.5">{current?.soilMoisturePercent ?? 44}%</div>
          </div>
        </div>
      </div>

      {/* 7-Day Forecast Grid */}
      <div className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs space-y-4">
        <h2 className="text-base font-bold text-stone-900">7-Day Agro-Meteorological Outlook</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-3">
          {forecast.map((fc, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border text-center transition-all ${
                i === 0
                  ? 'bg-emerald-50/70 border-emerald-300 ring-2 ring-emerald-200'
                  : 'bg-stone-50 border-stone-200 hover:bg-white'
              }`}
            >
              <div className="text-2xs font-bold text-stone-500 uppercase">{fc.day}</div>
              <div className="text-2xs text-stone-400">{fc.date}</div>
              <div className="my-2 flex justify-center text-sky-600">
                <CloudSun className="w-6 h-6" />
              </div>
              <div className="text-xs font-bold text-stone-900">
                {fc.maxTemp}° / <span className="text-stone-400 font-normal">{fc.minTemp}°</span>
              </div>
              <div className="text-2xs text-stone-500 mt-1">{fc.condition}</div>
              <div className="mt-2 pt-1 border-t border-stone-200/60">
                <span className={`text-2xs font-semibold px-1.5 py-0.5 rounded-full ${
                  fc.sprayRating === 'Optimal'
                    ? 'bg-emerald-100 text-emerald-800'
                    : fc.sprayRating === 'Good'
                    ? 'bg-blue-100 text-blue-800'
                    : fc.sprayRating === 'Fair'
                    ? 'bg-amber-100 text-amber-800'
                    : 'bg-rose-100 text-rose-800'
                }`}>
                  Spray: {fc.sprayRating}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Pest Alerts Bulletin Section */}
      <div className="space-y-4">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-rose-600" />
              <span>Regional Active Pest & Disease Bulletins</span>
            </h2>
            <p className="text-xs text-stone-500">
              Verified crop pathology alerts with chemical and organic IPM (Integrated Pest Management) protocols.
            </p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {pestAlerts.map((pest) => (
            <div
              key={pest.id}
              className="bg-white rounded-2xl border border-stone-200 p-5 shadow-2xs hover:shadow-xs transition-all flex flex-col justify-between space-y-4"
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between gap-2">
                  <span className={`px-2.5 py-0.5 rounded-full text-2xs font-bold uppercase tracking-wider ${
                    pest.severity === 'Severe'
                      ? 'bg-rose-100 text-rose-800 border border-rose-300'
                      : pest.severity === 'High'
                      ? 'bg-amber-100 text-amber-800 border border-amber-300'
                      : 'bg-yellow-100 text-yellow-800 border border-yellow-300'
                  }`}>
                    {pest.severity} Alert
                  </span>
                  <span className="text-2xs text-stone-400 font-mono">{pest.detectionDate}</span>
                </div>

                <div>
                  <h3 className="font-bold text-base text-stone-900 leading-snug">{pest.name}</h3>
                  <div className="text-2xs text-stone-500 mt-1">
                    Affected Crops: <strong className="text-stone-700">{pest.affectedCrops.join(', ')}</strong>
                  </div>
                  <div className="text-2xs text-stone-500 mt-0.5">Region: {pest.region}</div>
                </div>

                <div className="p-3 bg-stone-50 rounded-xl border border-stone-200/80 text-xs">
                  <span className="font-semibold text-stone-800 block mb-0.5">Observed Symptoms:</span>
                  <span className="text-stone-600 leading-relaxed">{pest.symptoms}</span>
                </div>

                {/* Treatment Tabs */}
                <div className="space-y-2 text-xs">
                  <div className="p-2.5 bg-emerald-50 rounded-lg border border-emerald-200">
                    <span className="text-2xs font-bold uppercase text-emerald-800 block">🌿 Organic / Bio Treatment:</span>
                    <span className="text-emerald-950 font-medium mt-0.5 block">{pest.organicRemedy}</span>
                  </div>

                  <div className="p-2.5 bg-blue-50 rounded-lg border border-blue-200">
                    <span className="text-2xs font-bold uppercase text-blue-800 block">🧪 Chemical Dose:</span>
                    <span className="text-blue-950 font-medium mt-0.5 block">{pest.chemicalRemedy}</span>
                  </div>
                </div>
              </div>

              <div className="pt-3 border-t border-stone-100 text-2xs text-stone-500">
                <strong>Prevention Tip:</strong> {pest.preventionTip}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
