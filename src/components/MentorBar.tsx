import React, { useState } from 'react';
import { ProjectMeta } from '../types';
import { TranslationStrings } from '../translations';
import { ExternalLink, Github, CheckCircle2, Award, Sparkles, Layers, SlidersHorizontal, Copy, Check } from 'lucide-react';

interface Props {
  projectMeta: ProjectMeta | null;
  t: TranslationStrings;
  onOpenModal: () => void;
  onOpenWorkspace: () => void;
  isWorkspaceOpen: boolean;
}

export const MentorBar: React.FC<Props> = ({
  projectMeta,
  t,
  onOpenModal,
  onOpenWorkspace,
  isWorkspaceOpen
}) => {
  const [copiedDemo, setCopiedDemo] = useState(false);
  const [copiedGit, setCopiedGit] = useState(false);

  const demoUrl = projectMeta?.demoUrl || window.location.origin;
  const githubUrl = projectMeta?.githubUrl || 'https://github.com/ishan-dabriya/agritech-smart-farming';
  const progressPercent = projectMeta?.progressPercent ?? 100;

  const copyToClipboard = (text: string, type: 'demo' | 'git') => {
    navigator.clipboard.writeText(text);
    if (type === 'demo') {
      setCopiedDemo(true);
      setTimeout(() => setCopiedDemo(false), 2000);
    } else {
      setCopiedGit(true);
      setTimeout(() => setCopiedGit(false), 2000);
    }
  };

  return (
    <div className="bg-emerald-950 text-emerald-50 border-b border-emerald-800/80 px-3 sm:px-6 py-2.5 shadow-md">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center justify-between gap-3 text-xs sm:text-sm">
        {/* Left: Project Stats & Mentor Status */}
        <div className="flex flex-wrap items-center gap-2 sm:gap-4 justify-center sm:justify-start">
          <div className="flex items-center gap-2 font-semibold text-emerald-300">
            <span className="flex h-2.5 w-2.5 rounded-full bg-emerald-400 animate-pulse" />
            <Award className="w-4 h-4 text-amber-400" />
            <span className="hidden sm:inline">Project:</span> AgriTech Smart Farming
          </div>

          <div className="h-4 w-px bg-emerald-700/60 hidden sm:block" />

          {/* Epics & Tasks Count */}
          <div className="flex items-center gap-3 text-emerald-200">
            <span className="bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700/60 font-mono">
              Epics: <strong>6</strong>
            </span>
            <span className="bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700/60 font-mono">
              Tasks: <strong>{projectMeta?.completedTasks || 19}/{projectMeta?.totalTasks || 19}</strong>
            </span>
            <div className="flex items-center gap-1.5 bg-emerald-900/80 px-2 py-0.5 rounded border border-emerald-700/60 font-mono text-emerald-300">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              <span>{progressPercent}% Complete</span>
            </div>
          </div>
        </div>

        {/* Center/Right: Demo & GitHub Links with Quick Actions */}
        <div className="flex flex-wrap items-center gap-2 justify-center">
          {/* Demo Link button */}
          <div className="flex items-center bg-emerald-900/90 border border-emerald-700/80 rounded-md overflow-hidden text-xs">
            <a
              href={demoUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 text-emerald-200 hover:text-white flex items-center gap-1 transition-colors hover:bg-emerald-800"
              title="Open Live Deployed App"
            >
              <ExternalLink className="w-3.5 h-3.5 text-emerald-400" />
              <span className="font-medium">Live Demo</span>
            </a>
            <button
              onClick={() => copyToClipboard(demoUrl, 'demo')}
              className="px-2 py-1 text-emerald-300 hover:text-white border-l border-emerald-700/60 hover:bg-emerald-800"
              title="Copy Demo URL"
            >
              {copiedDemo ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          {/* GitHub Repo button */}
          <div className="flex items-center bg-emerald-900/90 border border-emerald-700/80 rounded-md overflow-hidden text-xs">
            <a
              href={githubUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="px-2.5 py-1 text-emerald-200 hover:text-white flex items-center gap-1 transition-colors hover:bg-emerald-800"
              title="View Source on GitHub"
            >
              <Github className="w-3.5 h-3.5 text-emerald-300" />
              <span className="font-medium">GitHub Repo</span>
            </a>
            <button
              onClick={() => copyToClipboard(githubUrl, 'git')}
              className="px-2 py-1 text-emerald-300 hover:text-white border-l border-emerald-700/60 hover:bg-emerald-800"
              title="Copy GitHub URL"
            >
              {copiedGit ? <Check className="w-3 h-3 text-emerald-300" /> : <Copy className="w-3 h-3" />}
            </button>
          </div>

          {/* Update Links / Evaluation Modal */}
          <button
            onClick={onOpenModal}
            className="flex items-center gap-1.5 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold px-2.5 py-1 rounded shadow text-xs transition-all hover:scale-102"
          >
            <Sparkles className="w-3.5 h-3.5" />
            <span>Update Links</span>
          </button>

          {/* Kanban / Workspace View Toggle */}
          <button
            onClick={onOpenWorkspace}
            className={`flex items-center gap-1.5 px-2.5 py-1 rounded text-xs font-medium border transition-colors ${
              isWorkspaceOpen
                ? 'bg-emerald-700 border-emerald-500 text-white'
                : 'bg-emerald-900/60 hover:bg-emerald-800 border-emerald-700 text-emerald-200'
            }`}
          >
            <Layers className="w-3.5 h-3.5 text-emerald-400" />
            <span>Kanban Board</span>
          </button>
        </div>
      </div>
    </div>
  );
};
