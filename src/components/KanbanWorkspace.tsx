import React, { useState } from 'react';
import { ProjectMeta, TaskItem } from '../types';
import { TranslationStrings } from '../translations';
import { CheckCircle2, Clock, ListTodo, ExternalLink, Github, Sparkles, Filter, CheckSquare, ChevronRight, Layers, Award } from 'lucide-react';

interface Props {
  projectMeta: ProjectMeta | null;
  t: TranslationStrings;
  onOpenModal: () => void;
  onToggleTask: (taskId: string, newStatus: 'Done' | 'In Progress' | 'To Do') => void;
}

const EPICS = [
  { id: 1, title: 'PROJECT SETUP AND CONFIGURATION', color: 'border-blue-500 bg-blue-50 text-blue-800' },
  { id: 2, title: 'BACKEND DEVELOPMENT', color: 'border-purple-500 bg-purple-50 text-purple-800' },
  { id: 3, title: 'DATABASE DEVELOPMENT', color: 'border-amber-500 bg-amber-50 text-amber-800' },
  { id: 4, title: 'FRONT-END DEVELOPMENT', color: 'border-emerald-500 bg-emerald-50 text-emerald-800' },
  { id: 5, title: 'TESTING & VALIDATION', color: 'border-teal-500 bg-teal-50 text-teal-800' },
  { id: 6, title: 'MONITORING & DEPLOYMENT', color: 'border-rose-500 bg-rose-50 text-rose-800' },
];

export const KanbanWorkspace: React.FC<Props> = ({
  projectMeta,
  t,
  onOpenModal,
  onToggleTask
}) => {
  const [selectedEpicFilter, setSelectedEpicFilter] = useState<number | 'all'>('all');
  const [viewMode, setViewMode] = useState<'kanban' | 'epics'>('kanban');

  const tasks: TaskItem[] = projectMeta?.tasks || [];
  const filteredTasks = selectedEpicFilter === 'all'
    ? tasks
    : tasks.filter(t => t.epicId === selectedEpicFilter);

  const todoTasks = filteredTasks.filter(t => t.status === 'To Do');
  const inProgressTasks = filteredTasks.filter(t => t.status === 'In Progress');
  const doneTasks = filteredTasks.filter(t => t.status === 'Done');

  const completedCount = tasks.filter(t => t.status === 'Done').length;
  const progressPercent = Math.round((completedCount / (tasks.length || 19)) * 100);

  return (
    <div className="bg-stone-50 border border-stone-200 rounded-2xl p-4 sm:p-6 shadow-xs space-y-6">
      {/* Workspace Header & Action Banner */}
      <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-4 pb-5 border-b border-stone-200">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800 border border-emerald-300">
              MERN Agriculture Platform
            </span>
            <span className="text-xs text-stone-500">• Individual Project</span>
          </div>
          <h1 className="text-2xl font-bold text-stone-900 flex items-center gap-2.5">
            <Layers className="w-6 h-6 text-emerald-700" />
            <span>Workspace & Kanban Board</span>
          </h1>
          <p className="text-sm text-stone-600 mt-0.5">
            Track all 6 Epics and 19 Stories & Subtasks with real-time links for mentor review.
          </p>
        </div>

        {/* Buttons to update Demo and GitHub links */}
        <div className="flex flex-wrap items-center gap-2.5">
          <button
            onClick={onOpenModal}
            className="flex items-center gap-1.5 px-3.5 py-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs sm:text-sm font-semibold rounded-xl shadow-xs transition-colors"
          >
            <Sparkles className="w-4 h-4 text-amber-300" />
            <span>Add / Edit Demo & GitHub Links</span>
          </button>

          <a
            href={projectMeta?.demoUrl || '#'}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs sm:text-sm font-medium rounded-xl shadow-2xs transition-colors"
          >
            <ExternalLink className="w-4 h-4 text-emerald-600" />
            <span>Demo Link</span>
          </a>

          <a
            href={projectMeta?.githubUrl || '#'}
            target="_blank"
            rel="noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 bg-white hover:bg-stone-100 text-stone-700 border border-stone-300 text-xs sm:text-sm font-medium rounded-xl shadow-2xs transition-colors"
          >
            <Github className="w-4 h-4 text-stone-800" />
            <span>GitHub Link</span>
          </a>
        </div>
      </div>

      {/* Project Stats Summary Row */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 sm:gap-4">
        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Total Epics</div>
          <div className="text-2xl font-bold text-stone-800 mt-1">6</div>
          <div className="text-xs text-stone-500 mt-0.5">Setup to Deployment</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Total Tasks</div>
          <div className="text-2xl font-bold text-stone-800 mt-1">19</div>
          <div className="text-xs text-stone-500 mt-0.5">0 Subtasks remaining</div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Project Progress</div>
          <div className="text-2xl font-bold text-emerald-600 mt-1">{progressPercent}%</div>
          <div className="w-full bg-stone-100 h-1.5 rounded-full mt-2 overflow-hidden">
            <div
              className="bg-emerald-600 h-full rounded-full transition-all duration-500"
              style={{ width: `${progressPercent}%` }}
            />
          </div>
        </div>

        <div className="bg-white p-4 rounded-xl border border-stone-200 shadow-2xs">
          <div className="text-xs font-semibold text-stone-500 uppercase tracking-wider">Mentor Evaluation</div>
          <div className="text-xs font-bold text-stone-800 mt-1 truncate">
            {projectMeta?.mentorAssigned || 'Dr. V. K. Patel'}
          </div>
          <div className="text-xs text-emerald-600 font-medium mt-1 flex items-center gap-1">
            <CheckCircle2 className="w-3.5 h-3.5" />
            <span>Ready for Scoring</span>
          </div>
        </div>
      </div>

      {/* Filter and View Mode Toolbar */}
      <div className="flex flex-wrap items-center justify-between gap-3 bg-white p-3 rounded-xl border border-stone-200">
        <div className="flex flex-wrap items-center gap-1.5">
          <Filter className="w-4 h-4 text-stone-400 mr-1" />
          <span className="text-xs font-semibold text-stone-600 mr-1">Filter Epic:</span>
          <button
            onClick={() => setSelectedEpicFilter('all')}
            className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
              selectedEpicFilter === 'all'
                ? 'bg-stone-900 text-white'
                : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
            }`}
          >
            All (19)
          </button>
          {EPICS.map(epic => (
            <button
              key={epic.id}
              onClick={() => setSelectedEpicFilter(epic.id)}
              className={`px-2.5 py-1 rounded-lg text-xs font-medium transition-colors ${
                selectedEpicFilter === epic.id
                  ? 'bg-emerald-700 text-white'
                  : 'bg-stone-100 text-stone-600 hover:bg-stone-200'
              }`}
            >
              Epic {epic.id}
            </button>
          ))}
        </div>

        <div className="flex items-center gap-1 bg-stone-100 p-1 rounded-lg text-xs">
          <button
            onClick={() => setViewMode('kanban')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              viewMode === 'kanban' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Kanban Columns
          </button>
          <button
            onClick={() => setViewMode('epics')}
            className={`px-3 py-1 rounded-md font-medium transition-colors ${
              viewMode === 'epics' ? 'bg-white shadow-2xs text-stone-900' : 'text-stone-600 hover:text-stone-900'
            }`}
          >
            Epics Breakdown
          </button>
        </div>
      </div>

      {/* Kanban Board Columns View */}
      {viewMode === 'kanban' ? (
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {/* TO DO Column */}
          <div className="bg-stone-100/80 rounded-xl p-3.5 border border-stone-200/80 flex flex-col">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <ListTodo className="w-4 h-4 text-stone-500" />
                <span className="font-bold text-xs uppercase tracking-wider text-stone-700">To Do</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-stone-200 text-stone-700 font-semibold">
                {todoTasks.length}
              </span>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[500px]">
              {todoTasks.length === 0 ? (
                <div className="text-center py-8 text-xs text-stone-400 bg-white/50 rounded-lg border border-dashed border-stone-300">
                  No tasks in backlog
                </div>
              ) : (
                todoTasks.map(task => (
                  <TaskCard key={task.id} task={task} onToggleTask={onToggleTask} />
                ))
              )}
            </div>
          </div>

          {/* IN PROGRESS Column */}
          <div className="bg-amber-50/60 rounded-xl p-3.5 border border-amber-200/70 flex flex-col">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-amber-600" />
                <span className="font-bold text-xs uppercase tracking-wider text-amber-900">In Progress</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-amber-200 text-amber-800 font-semibold">
                {inProgressTasks.length}
              </span>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[500px]">
              {inProgressTasks.length === 0 ? (
                <div className="text-center py-8 text-xs text-amber-600/70 bg-white/50 rounded-lg border border-dashed border-amber-300">
                  All active items moved to Done
                </div>
              ) : (
                inProgressTasks.map(task => (
                  <TaskCard key={task.id} task={task} onToggleTask={onToggleTask} />
                ))
              )}
            </div>
          </div>

          {/* DONE Column */}
          <div className="bg-emerald-50/70 rounded-xl p-3.5 border border-emerald-200/80 flex flex-col">
            <div className="flex items-center justify-between mb-3 px-1">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                <span className="font-bold text-xs uppercase tracking-wider text-emerald-900">Done / Verified</span>
              </div>
              <span className="text-xs px-2 py-0.5 rounded-full bg-emerald-200 text-emerald-800 font-semibold">
                {doneTasks.length}
              </span>
            </div>

            <div className="space-y-2.5 flex-1 overflow-y-auto max-h-[500px]">
              {doneTasks.map(task => (
                <TaskCard key={task.id} task={task} onToggleTask={onToggleTask} />
              ))}
            </div>
          </div>
        </div>
      ) : (
        /* Epics Breakdown View */
        <div className="space-y-4">
          {EPICS.map(epic => {
            const epicTasks = tasks.filter(t => t.epicId === epic.id);
            const epicDone = epicTasks.filter(t => t.status === 'Done').length;
            const epicPct = Math.round((epicDone / (epicTasks.length || 1)) * 100);

            return (
              <div key={epic.id} className="bg-white rounded-xl border border-stone-200 p-4 shadow-2xs">
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 pb-3 border-b border-stone-100">
                  <div className="flex items-center gap-2.5">
                    <span className="px-2.5 py-1 rounded-md text-xs font-bold uppercase tracking-wider bg-stone-100 text-stone-800">
                      Epic {epic.id}
                    </span>
                    <h3 className="font-bold text-stone-900 text-sm">{epic.title}</h3>
                  </div>
                  <div className="flex items-center gap-3 text-xs text-stone-600 font-medium">
                    <span>{epicDone} of {epicTasks.length} Completed</span>
                    <span className="px-2 py-0.5 rounded bg-emerald-100 text-emerald-800 font-semibold">
                      {epicPct}%
                    </span>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3 mt-3">
                  {epicTasks.map(task => (
                    <div
                      key={task.id}
                      className="p-3 rounded-lg border border-stone-200 bg-stone-50/60 hover:bg-white transition-all flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between text-xs mb-1">
                          <span className="font-mono text-stone-500 font-semibold">{task.id}</span>
                          <span className={`px-2 py-0.5 rounded-full text-2xs font-semibold ${
                            task.status === 'Done' ? 'bg-emerald-100 text-emerald-800' : 'bg-amber-100 text-amber-800'
                          }`}>
                            {task.status}
                          </span>
                        </div>
                        <h4 className="font-semibold text-xs text-stone-800">{task.title}</h4>
                        <p className="text-2xs text-stone-500 mt-1 line-clamp-2">{task.description}</p>
                      </div>

                      <div className="mt-2.5 pt-2 border-t border-stone-200/60 flex items-center justify-between text-2xs">
                        <span className="text-stone-400 font-medium">{task.points} pts</span>
                        <button
                          onClick={() => onToggleTask(task.id, task.status === 'Done' ? 'In Progress' : 'Done')}
                          className="text-emerald-700 hover:text-emerald-900 font-medium flex items-center gap-1"
                        >
                          <CheckSquare className="w-3 h-3" />
                          <span>Toggle Status</span>
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

const TaskCard: React.FC<{
  task: TaskItem;
  onToggleTask: (taskId: string, newStatus: 'Done' | 'In Progress' | 'To Do') => void;
}> = ({ task, onToggleTask }) => {
  const isDone = task.status === 'Done';

  return (
    <div className="bg-white rounded-xl p-3 border border-stone-200 shadow-2xs hover:shadow-xs transition-shadow flex flex-col justify-between">
      <div>
        <div className="flex items-center justify-between gap-2 mb-1.5">
          <span className="text-2xs font-mono font-bold text-stone-500 uppercase px-1.5 py-0.5 bg-stone-100 rounded">
            Epic {task.epicId} • {task.id}
          </span>
          <span className="text-2xs font-semibold text-emerald-700 bg-emerald-50 px-1.5 py-0.5 rounded border border-emerald-200">
            {task.points} pts
          </span>
        </div>
        <h4 className="font-semibold text-xs text-stone-900 leading-snug">{task.title}</h4>
        <p className="text-2xs text-stone-500 mt-1 line-clamp-2 leading-relaxed">{task.description}</p>
      </div>

      <div className="mt-3 pt-2 border-t border-stone-100 flex items-center justify-between">
        <select
          value={task.status}
          onChange={(e) => onToggleTask(task.id, e.target.value as any)}
          className="text-2xs font-medium bg-stone-50 border border-stone-200 rounded px-1.5 py-0.5 text-stone-700 focus:outline-hidden"
        >
          <option value="Done">Done</option>
          <option value="In Progress">In Progress</option>
          <option value="To Do">To Do</option>
        </select>

        <button
          onClick={() => onToggleTask(task.id, isDone ? 'In Progress' : 'Done')}
          className={`flex items-center gap-1 text-2xs font-semibold transition-colors ${
            isDone ? 'text-emerald-700 hover:text-emerald-900' : 'text-stone-500 hover:text-emerald-700'
          }`}
          title="Mark complete or in progress"
        >
          <CheckCircle2 className={`w-3.5 h-3.5 ${isDone ? 'text-emerald-600' : 'text-stone-300'}`} />
          <span>{isDone ? 'Completed' : 'Mark Done'}</span>
        </button>
      </div>
    </div>
  );
};
