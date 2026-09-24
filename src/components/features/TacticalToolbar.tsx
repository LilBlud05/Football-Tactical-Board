// src/components/features/TacticalToolbar.tsx

import React from 'react';
import { RotateCcw, LayoutTemplate, BrainCircuit, Download } from 'lucide-react';
import { FormationPreset } from '@/types';

interface TacticalToolbarProps {
  currentFormation: FormationPreset;
  onFormationChange: (formation: FormationPreset) => void;
  currentMentality: string;
  onMentalityChange: (mentality: string) => void;
  onReset: () => void;
  onExport: () => void;
}

export const MENTALITIES = ['Defensive', 'Balanced', 'Attacking', 'Gegenpress'];
export const FORMATIONS: FormationPreset[] = ['4-3-3', '4-2-3-1', '3-5-2'];

export const TacticalToolbar: React.FC<TacticalToolbarProps> = ({
  currentFormation,
  onFormationChange,
  currentMentality,
  onMentalityChange,
  onReset,
  onExport,
}) => {
  return (
    <div className="w-full max-w-3xl mx-auto bg-slate-900 border border-slate-800 rounded-xl p-4 shadow-lg mb-6 text-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
      
      <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
        <div className="flex items-center gap-2 w-full sm:w-auto">
          <LayoutTemplate className="w-5 h-5 text-emerald-500" />
          <div className="relative w-full sm:w-auto">
            <select
              value={currentFormation}
              onChange={(e) => onFormationChange(e.target.value as FormationPreset)}
              className="w-full sm:w-auto appearance-none bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-colors cursor-pointer"
            >
              {FORMATIONS.map((form) => (
                <option key={form} value={form}>Formation: {form}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>

        <div className="flex items-center gap-2 w-full sm:w-auto">
          <BrainCircuit className="w-5 h-5 text-yellow-500" />
          <div className="relative w-full sm:w-auto">
            <select
              value={currentMentality}
              onChange={(e) => onMentalityChange(e.target.value)}
              className="w-full sm:w-auto appearance-none bg-slate-800 border border-slate-700 text-sm rounded-lg px-3 py-2 pr-8 focus:outline-none focus:ring-2 focus:ring-yellow-500 transition-colors cursor-pointer"
            >
              {MENTALITIES.map((mentality) => (
                <option key={mentality} value={mentality}>Style: {mentality}</option>
              ))}
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-slate-400">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="flex items-center gap-3 w-full md:w-auto">
        <button
          onClick={onReset}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-700 text-sm text-slate-200 px-4 py-2 rounded-lg border border-slate-700 transition-colors focus:outline-none focus:ring-2 focus:ring-slate-500"
        >
          <RotateCcw className="w-4 h-4" />
          Reset
        </button>
        <button
          onClick={onExport}
          className="flex-1 md:flex-none flex items-center justify-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-sm text-white px-4 py-2 rounded-lg border border-emerald-500 transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-400 shadow-lg shadow-emerald-900/20"
        >
          <Download className="w-4 h-4" />
          Export
        </button>
      </div>

    </div>
  );
};