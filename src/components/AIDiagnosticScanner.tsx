import React, { useState } from 'react';
import { TranslationStrings } from '../translations';
import { Sparkles, AlertCircle, CheckCircle2, ShieldCheck, Droplet, ArrowRight, RefreshCw, Leaf, Bug, Zap } from 'lucide-react';

interface DiagnosticResult {
  diagnosis: string;
  probabilityScore: number;
  severity: 'Low' | 'Moderate' | 'High' | 'Severe';
  immediateAction: string;
  organicRemedy: string;
  chemicalRemedy: string;
  preventativeAdvice: string;
  irrigationAdvice: string;
}

interface Props {
  t: TranslationStrings;
}

const COMMON_SYMPTOM_PRESETS = [
  { label: 'Yellow rust stripes on wheat leaves', crop: 'Wheat', symptoms: 'Yellow powdery pustules forming linear stripes along leaf veins; leaves wilting under heavy dew.' },
  { label: 'Ragged leaf holes & caterpillar frass', crop: 'Maize / Corn', symptoms: 'Irregular feeding holes in the leaf whorls with sawdust-like frass; central shoot damage.' },
  { label: 'Leaf curl & sticky honeydew', crop: 'Cotton', symptoms: 'Upward curling of leaf margins, yellow vein clearing, sticky honeydew secretion with black sooty mold.' },
  { label: 'Brown circular spots with yellow halo', crop: 'Soybean', symptoms: 'Concentric brown necrotic lesions on lower foliage surrounded by yellow halos.' },
  { label: 'Wilting seedlings at soil collar', crop: 'Chickpea', symptoms: 'Dark brown constriction at collar level near soil, roots rotting with stunted growth.' },
];

export const AIDiagnosticScanner: React.FC<Props> = ({ t }) => {
  const [cropName, setCropName] = useState('Wheat');
  const [stage, setStage] = useState('Flowering');
  const [symptoms, setSymptoms] = useState('');
  const [imageDescription, setImageDescription] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState<DiagnosticResult | null>(null);
  const [source, setSource] = useState<string>('');

  const handleDiagnose = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!symptoms) return;

    setIsLoading(true);
    try {
      const res = await fetch('/api/ai/diagnose', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cropName, stage, symptoms, imageDescription })
      });
      const data = await res.json();
      if (data.report) {
        setResult(data.report);
        setSource(data.source === 'gemini-ai' ? 'Gemini 3.8 Flash Agronomy Model' : 'Agricultural Pathology Engine');
      }
    } catch (err) {
      console.error(err);
    } finally {
      setIsLoading(false);
    }
  };

  const applyPreset = (preset: typeof COMMON_SYMPTOM_PRESETS[0]) => {
    setCropName(preset.crop);
    setSymptoms(preset.symptoms);
  };

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-linear-to-r from-emerald-900 via-teal-900 to-stone-900 rounded-3xl text-white p-6 sm:p-8 shadow-md">
        <div className="max-w-2xl space-y-2">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-400 text-stone-950 text-xs font-bold shadow-xs">
            <Sparkles className="w-3.5 h-3.5" />
            <span>AI Crop Pathology & Diagnostic Engine</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-extrabold tracking-tight">
            AI Crop Doctor & Pest Scanner
          </h1>
          <p className="text-xs sm:text-sm text-emerald-100/90 leading-relaxed">
            Diagnose plant diseases, nutrient deficiencies, and insect infestations in seconds. Get verified biological and chemical mitigation dosages tailored to your region.
          </p>
        </div>
      </div>

      {/* Main Diagnostic Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Input Form (5 cols) */}
        <div className="lg:col-span-5 bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-5">
          <div className="flex items-center justify-between pb-2 border-b border-stone-100">
            <h2 className="text-base font-bold text-stone-900 flex items-center gap-2">
              <Leaf className="w-5 h-5 text-emerald-600" />
              <span>Describe Crop Condition</span>
            </h2>
            <span className="text-2xs font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-800 border border-emerald-200">
              Interactive
            </span>
          </div>

          {/* Quick Presets */}
          <div>
            <label className="block text-2xs font-bold text-stone-500 uppercase tracking-wider mb-1.5">
              Quick Case Presets (Click to test):
            </label>
            <div className="flex flex-wrap gap-1.5">
              {COMMON_SYMPTOM_PRESETS.map((p, idx) => (
                <button
                  key={idx}
                  type="button"
                  onClick={() => applyPreset(p)}
                  className="px-2.5 py-1 bg-stone-100 hover:bg-emerald-100 hover:text-emerald-900 text-stone-700 rounded-lg text-2xs font-medium border border-stone-200 transition-colors text-left"
                >
                  {p.label}
                </button>
              ))}
            </div>
          </div>

          <form onSubmit={handleDiagnose} className="space-y-4 text-xs sm:text-sm">
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block font-semibold text-stone-700 mb-1">Crop Type *</label>
                <input
                  type="text"
                  required
                  value={cropName}
                  onChange={(e) => setCropName(e.target.value)}
                  placeholder="e.g. Wheat, Tomato"
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 font-medium text-xs"
                />
              </div>

              <div>
                <label className="block font-semibold text-stone-700 mb-1">Growth Stage</label>
                <select
                  value={stage}
                  onChange={(e) => setStage(e.target.value)}
                  className="w-full px-3 py-2 border border-stone-300 rounded-lg bg-white focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs font-medium"
                >
                  <option value="Germination">Germination / Seedling</option>
                  <option value="Vegetative">Vegetative Tillering</option>
                  <option value="Flowering">Flowering / Booting</option>
                  <option value="Maturity">Grain Filling / Pod Maturity</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Observed Symptoms & Plant Damage *
              </label>
              <textarea
                rows={3}
                required
                value={symptoms}
                onChange={(e) => setSymptoms(e.target.value)}
                placeholder="Describe leaf discoloration, spots, wilting, holes, or insect presence..."
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs leading-relaxed font-medium text-stone-800"
              />
            </div>

            <div>
              <label className="block font-semibold text-stone-700 mb-1">
                Visual Inspection / Photo Description (Optional)
              </label>
              <input
                type="text"
                value={imageDescription}
                onChange={(e) => setImageDescription(e.target.value)}
                placeholder="e.g. Yellowing started from bottom leaves, spots have concentric rings"
                className="w-full px-3 py-2 border border-stone-300 rounded-lg focus:outline-hidden focus:ring-2 focus:ring-emerald-600 text-xs"
              />
            </div>

            <button
              type="submit"
              disabled={isLoading || !symptoms}
              className="w-full py-2.5 bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs sm:text-sm rounded-xl shadow-md transition-colors flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? (
                <>
                  <RefreshCw className="w-4 h-4 animate-spin" />
                  <span>Analyzing Pathology Database...</span>
                </>
              ) : (
                <>
                  <Zap className="w-4 h-4 text-amber-300" />
                  <span>Run Diagnostic Scan</span>
                </>
              )}
            </button>
          </form>
        </div>

        {/* Results Panel (7 cols) */}
        <div className="lg:col-span-7">
          {result ? (
            <div className="bg-white rounded-2xl border border-stone-200 p-6 shadow-2xs space-y-5 animate-in fade-in duration-200">
              {/* Diagnosis Header */}
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-stone-100">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="text-2xs font-bold uppercase tracking-wider text-emerald-800 bg-emerald-100 px-2 py-0.5 rounded-full border border-emerald-300">
                      Diagnosis Confidence: {result.probabilityScore}%
                    </span>
                    <span className={`text-2xs font-bold uppercase tracking-wider px-2 py-0.5 rounded-full ${
                      result.severity === 'Severe'
                        ? 'bg-rose-100 text-rose-800 border border-rose-300'
                        : result.severity === 'High'
                        ? 'bg-amber-100 text-amber-800 border border-amber-300'
                        : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {result.severity} Severity
                    </span>
                  </div>
                  <h3 className="text-xl font-extrabold text-stone-900 mt-1">{result.diagnosis}</h3>
                  <p className="text-2xs text-stone-400 mt-0.5">Grounding: {source}</p>
                </div>

                <div className="p-3 bg-emerald-50 rounded-2xl border border-emerald-200 text-emerald-800 text-center shrink-0">
                  <ShieldCheck className="w-6 h-6 mx-auto text-emerald-600" />
                  <span className="text-2xs font-bold uppercase block mt-1">Verified Protocol</span>
                </div>
              </div>

              {/* 24-Hour Immediate Action */}
              <div className="p-4 bg-amber-50 rounded-xl border border-amber-200 space-y-1">
                <div className="flex items-center gap-1.5 text-xs font-bold text-amber-900 uppercase tracking-wider">
                  <AlertCircle className="w-4 h-4 text-amber-700" />
                  <span>Immediate 24-Hour Action:</span>
                </div>
                <p className="text-xs text-amber-950 font-medium leading-relaxed pl-5">
                  {result.immediateAction}
                </p>
              </div>

              {/* Treatments Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="p-4 bg-emerald-50/70 rounded-xl border border-emerald-200 space-y-1.5">
                  <span className="text-2xs font-bold uppercase tracking-wider text-emerald-800 flex items-center gap-1">
                    🌿 Organic / Biological Remedy
                  </span>
                  <p className="text-xs text-emerald-950 font-medium leading-relaxed">
                    {result.organicRemedy}
                  </p>
                </div>

                <div className="p-4 bg-blue-50/70 rounded-xl border border-blue-200 space-y-1.5">
                  <span className="text-2xs font-bold uppercase tracking-wider text-blue-800 flex items-center gap-1">
                    🧪 Approved Chemical Dosage
                  </span>
                  <p className="text-xs text-blue-950 font-medium leading-relaxed">
                    {result.chemicalRemedy}
                  </p>
                </div>
              </div>

              {/* Preventive and Irrigation Advice */}
              <div className="space-y-3 pt-2 text-xs">
                <div className="flex items-start gap-2 text-stone-700">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900">Long-term Cultural Prevention: </span>
                    <span>{result.preventativeAdvice}</span>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-stone-700">
                  <Droplet className="w-4 h-4 text-sky-600 shrink-0 mt-0.5" />
                  <div>
                    <span className="font-bold text-stone-900">Irrigation Guidance: </span>
                    <span>{result.irrigationAdvice}</span>
                  </div>
                </div>
              </div>
            </div>
          ) : (
            <div className="bg-stone-50 rounded-2xl border-2 border-dashed border-stone-200 p-10 text-center flex flex-col items-center justify-center space-y-3">
              <div className="w-14 h-14 rounded-2xl bg-white border border-stone-200 shadow-2xs flex items-center justify-center text-emerald-600">
                <Bug className="w-7 h-7" />
              </div>
              <h3 className="text-base font-bold text-stone-800">Awaiting Diagnostic Input</h3>
              <p className="text-xs text-stone-500 max-w-sm leading-relaxed">
                Choose a quick preset or type symptoms of your crop on the left. The engine will synthesize immediate pathology actions and chemical dosages.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
