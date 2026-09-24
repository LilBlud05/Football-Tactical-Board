// src/components/features/TacticalFeedback.tsx

import React, { useState } from 'react';
import { AlertTriangle, CheckCircle2, Lightbulb, ChevronDown, ChevronUp } from 'lucide-react';
import { TacticalIssue } from '@/lib/analyzer';
import { cn } from '@/lib/utils';

interface TacticalFeedbackProps {
  issues: TacticalIssue[];
}

export const TacticalFeedback: React.FC<TacticalFeedbackProps> = ({ issues }) => {
  const [isOpen, setIsOpen] = useState(true);

  if (issues.length === 0) return null;

  const getIcon = (type: TacticalIssue['type']) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0" />;
      case 'strength': return <CheckCircle2 className="w-5 h-5 text-emerald-500 flex-shrink-0" />;
      case 'tip': return <Lightbulb className="w-5 h-5 text-blue-400 flex-shrink-0" />;
    }
  };

  const getBgColor = (type: TacticalIssue['type']) => {
    switch (type) {
      case 'warning': return 'bg-amber-500/10 border-amber-500/20';
      case 'strength': return 'bg-emerald-500/10 border-emerald-500/20';
      case 'tip': return 'bg-blue-500/10 border-blue-500/20';
    }
  };

  const warningsCount = issues.filter(i => i.type === 'warning').length;

  return (
    <div className="w-full max-w-3xl mx-auto mt-6 bg-slate-900 border border-slate-800 rounded-xl overflow-hidden shadow-lg transition-all">
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className="w-full flex items-center justify-between p-4 bg-slate-800/50 hover:bg-slate-800 transition-colors focus:outline-none"
      >
        <div className="flex items-center gap-2">
          <h3 className="font-semibold text-slate-200">Tactical Analysis</h3>
          {warningsCount > 0 && (
            <span className="bg-amber-500/20 text-amber-400 text-xs px-2 py-0.5 rounded-full font-bold">
              {warningsCount} Warnings
            </span>
          )}
        </div>
        {isOpen ? <ChevronUp className="w-5 h-5 text-slate-400" /> : <ChevronDown className="w-5 h-5 text-slate-400" />}
      </button>

      {isOpen && (
        <div className="p-4 space-y-3 max-h-64 overflow-y-auto">
          {issues.map((issue) => (
            <div 
              key={issue.id}
              className={cn(
                "flex items-start gap-3 p-3 rounded-lg border",
                getBgColor(issue.type)
              )}
            >
              {getIcon(issue.type)}
              <p className="text-sm text-slate-300 leading-relaxed mt-0.5">
                {issue.message}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};