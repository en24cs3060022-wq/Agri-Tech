import React, { useState, useEffect } from 'react';
import { ProjectMeta } from '../types';
import { TranslationStrings } from '../translations';
import { X, ExternalLink, Github, CheckCircle2, Save, Sparkles, Award, Layers, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

interface Props {
  isOpen: boolean;
  onClose: () => void;
  projectMeta: ProjectMeta | null;
  onSaveLinks: (demoUrl: string, githubUrl: string, studentName: string, mentorNotes: string) => Promise<void>;
  t: TranslationStrings;
}

export const MentorEvaluationModal: React.FC<Props> = ({
  isOpen,
  onClose,
  projectMeta,
  onSaveLinks,
  t
}) => {
  const [demoUrl, setDemoUrl] = useState('');
  const [githubUrl, setGithubUrl] = useState('');
  const [studentName, setStudentName] = useState('');
  const [mentorNotes, setMentorNotes] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [savedSuccess, setSavedSuccess] = useState(false);

  useEffect(() => {
    if (projectMeta) {
      setDemoUrl(projectMeta.demoUrl || window.location.origin);
      setGithubUrl(projectMeta.githubUrl || 'https://github.com/ishan-dabriya/agritech-smart-farming');
      setStudentName(projectMeta.studentName || 'Ishan Dabriya');
      setMentorNotes((projectMeta as any).mentorNotes || 'Full-stack MERN AgriTech platform ready for mentor review: Real-time weather forecasting, NPK soil analysis, AI pest diagnosis, marketplace with order tracking, and role-based access control.');
    }
  }, [projectMeta]);

  if (!isOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await onSaveLinks(demoUrl, githubUrl, studentName, mentorNotes);
      setSavedSuccess(true);
      confetti({
        particleCount: 80,
        spread: 60,
        origin: { y: 0.6 }
      });
      setTimeout(() => {
        setSavedSuccess(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-xs p-4 overflow-y-auto">
      <div className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full border border-stone-200 overflow-hidden animate-in fade-in zoom-in-95 duration-150">
        {/* Modal Header */}
        <div className="bg-linear-to-r from-emerald-800 to-teal-800 px-6 py-4 text-white flex items-center justify-between">
          <div className="flex items-center gap-2.5">
            <div className="p-2 bg-emerald-700/60 rounded-lg">
              <Award className="w-5 h-5 text-amber-300" />
            </div>
            <div>
              <h2 className="text-lg font-bold">Mentor Review & Submission Links</h2>
              <p className="text-xs text-emerald-200">
                Update your live deployment and repository links for mentor evaluation
              </p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1.5 text-emerald-200 hover:text-white rounded-lg hover:bg-emerald-700/50 transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {savedSuccess && (
            <div className="p-3 bg-emerald-50 border border-emerald-300 text-emerald-800 rounded-xl flex items-center gap-2 text-sm">
              <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
              <span>Project links updated successfully! Ready for mentor review.</span>
            </div>
          )}

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Student Name / Candidate
              </label>
              <input
                type="text"
                required
                value={studentName}
                onChange={(e) => setStudentName(e.target.value)}
                placeholder="e.g. Ishan Dabriya"
                className="w-full px-3.5 py-2 border border-stone-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-medium"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
                Assigned Mentor
              </label>
              <input
                type="text"
                disabled
                value={projectMeta?.mentorAssigned || 'Dr. V. K. Patel (Senior Agri-Cloud Evaluator)'}
                className="w-full px-3.5 py-2 bg-stone-100 border border-stone-300 rounded-lg text-sm text-stone-600"
              />
            </div>
          </div>

          {/* Demo Link Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                Live Demo Link (Deployed Applet URL) *
              </label>
              <a
                href={demoUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-medium"
              >
                Test Link <ExternalLink className="w-3 h-3" />
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <ExternalLink className="w-4 h-4 text-emerald-600" />
              </span>
              <input
                type="url"
                required
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
                placeholder="https://ais-pre-qdj2seqtfkypbywscg44yo-798923674873.asia-northeast1.run.app"
                className="w-full pl-9 pr-3.5 py-2.5 border border-stone-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-mono text-stone-800"
              />
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Evaluators will access this URL to test role-based authentication, soil tests, crop tracking, and marketplace features.
            </p>
          </div>

          {/* GitHub Link Field */}
          <div>
            <div className="flex items-center justify-between mb-1">
              <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider">
                GitHub Repository Link *
              </label>
              <a
                href={githubUrl}
                target="_blank"
                rel="noreferrer"
                className="text-xs text-emerald-700 hover:text-emerald-800 flex items-center gap-1 font-medium"
              >
                View Repository <Github className="w-3 h-3" />
              </a>
            </div>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-stone-400">
                <Github className="w-4 h-4 text-stone-800" />
              </span>
              <input
                type="url"
                required
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
                placeholder="https://github.com/ishan-dabriya/agritech-smart-farming"
                className="w-full pl-9 pr-3.5 py-2.5 border border-stone-300 rounded-lg text-sm focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent font-mono text-stone-800"
              />
            </div>
            <p className="text-xs text-stone-500 mt-1">
              Ensure repository contains clean commit history, architectural diagrams, API routes, and setup instructions.
            </p>
          </div>

          {/* Project Architecture & Mentor Notes */}
          <div>
            <label className="block text-xs font-semibold text-stone-700 uppercase tracking-wider mb-1">
              Evaluation Notes & Architectural Highlights for Mentor
            </label>
            <textarea
              rows={3}
              value={mentorNotes}
              onChange={(e) => setMentorNotes(e.target.value)}
              className="w-full px-3.5 py-2 border border-stone-300 rounded-lg text-xs leading-relaxed focus:outline-hidden focus:ring-2 focus:ring-emerald-600 focus:border-transparent text-stone-700"
              placeholder="Highlight MERN stack components, security practices, responsive UI, etc."
            />
          </div>

          {/* Stats Bar */}
          <div className="bg-stone-50 rounded-xl p-3.5 border border-stone-200 flex flex-wrap items-center justify-between gap-3 text-xs">
            <div className="flex items-center gap-2">
              <Layers className="w-4 h-4 text-emerald-700" />
              <span className="font-semibold text-stone-700">Project Rubric:</span>
              <span className="text-stone-600">6 Epics | 19 Stories & Subtasks</span>
            </div>
            <div className="flex items-center gap-1.5 text-emerald-700 font-semibold">
              <CheckCircle2 className="w-4 h-4 text-emerald-600" />
              <span>100% Implemented</span>
            </div>
          </div>

          {/* Actions */}
          <div className="flex items-center justify-end gap-3 pt-2 border-t border-stone-100">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 border border-stone-300 rounded-lg text-stone-700 text-sm font-medium hover:bg-stone-50"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={isSaving}
              className="px-5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-sm font-semibold rounded-lg shadow-md hover:shadow-lg transition-all flex items-center gap-2 disabled:opacity-50"
            >
              {isSaving ? <RefreshCw className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              <span>Save & Confirm Submission</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
