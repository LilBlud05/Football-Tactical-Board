// src/components/features/PlayerInspector.tsx

import React from 'react';
import { X, User, Hash, Info, ChevronDown } from 'lucide-react';
import { TacticalPlayer, PlayerCategory, CATEGORY_ROLES, ROLE_DESCRIPTIONS, PlayerRole } from '@/types';
import { cn } from '@/lib/utils';

interface PlayerInspectorProps {
  player: TacticalPlayer | null;
  onUpdate: (id: string, updates: Partial<TacticalPlayer>) => void;
  onClose: () => void;
}

export const PlayerInspector: React.FC<PlayerInspectorProps> = ({ player, onUpdate, onClose }) => {
  if (!player) {
    return null;
  }

  const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const newCategory = e.target.value as PlayerCategory;
    const defaultRole = CATEGORY_ROLES[newCategory][0];
    onUpdate(player.id, { category: newCategory, role: defaultRole });
  };

  return (
    <aside 
      className={cn(
        "fixed inset-y-0 right-0 z-50 w-full sm:w-80 md:w-96 bg-slate-900 border-l border-slate-800 shadow-2xl flex flex-col transition-transform duration-300 ease-in-out transform translate-x-0"
      )}
    >
      {/* Header */}
      <div className="flex items-center justify-between p-4 border-b border-slate-800 bg-slate-900/50">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-full bg-emerald-950 border border-emerald-500/30 flex items-center justify-center text-emerald-400 font-bold text-lg shadow-inner">
            {player.number}
          </div>
          <div>
            <h2 className="text-slate-100 font-semibold tracking-wide">Player Details</h2>
            <p className="text-xs text-slate-400 uppercase tracking-wider">{player.role}</p>
          </div>
        </div>
        <button 
          onClick={onClose}
          className="p-2 rounded-lg text-slate-400 hover:bg-slate-800 hover:text-white transition-colors focus:outline-none focus:ring-2 focus:ring-emerald-500"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      {/* Editor Content */}
      <div className="flex-1 overflow-y-auto p-4 space-y-6">
        
        {/* Name Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <User className="w-3.5 h-3.5" /> Player Name
          </label>
          <input
            type="text"
            value={player.name}
            onChange={(e) => onUpdate(player.id, { name: e.target.value })}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
            placeholder="Enter player name..."
          />
        </div>

        {/* Number Input */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider flex items-center gap-1.5">
            <Hash className="w-3.5 h-3.5" /> Shirt Number
          </label>
          <input
            type="number"
            min="1"
            max="99"
            value={player.number}
            onChange={(e) => onUpdate(player.id, { number: parseInt(e.target.value) || 1 })}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 focus:border-transparent transition-all"
          />
        </div>

        {/* Category Select */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Position Category
          </label>
          <div className="relative">
            <select
              value={player.category}
              onChange={handleCategoryChange}
              className="w-full appearance-none bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
            >
              <option value="GK">Goalkeeper (GK)</option>
              <option value="DEF">Defender (DEF)</option>
              <option value="MID">Midfielder (MID)</option>
              <option value="ATT">Attacker (ATT)</option>
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Role Select */}
        <div className="space-y-2">
          <label className="text-xs font-semibold text-slate-400 uppercase tracking-wider">
            Tactical Role
          </label>
          <div className="relative">
            <select
              value={player.role}
              onChange={(e) => onUpdate(player.id, { role: e.target.value as PlayerRole })}
              className="w-full appearance-none bg-slate-950 border border-slate-800 rounded-lg px-3 py-2.5 text-sm text-slate-200 focus:outline-none focus:ring-2 focus:ring-emerald-500 transition-all cursor-pointer"
            >
              {CATEGORY_ROLES[player.category].map((role) => (
                <option key={role} value={role}>{role}</option>
              ))}
            </select>
            <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400 pointer-events-none" />
          </div>
        </div>

        {/* Role Description */}
        <div className="mt-4 p-4 rounded-xl bg-slate-950/50 border border-slate-800/80 leading-relaxed">
          <div className="flex gap-2.5">
            <Info className="w-5 h-5 text-emerald-500 flex-shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-slate-300 mb-1">{player.role}</h4>
              <p className="text-xs text-slate-400">
                {ROLE_DESCRIPTIONS[player.role] || "Specific tactical instructions pending."}
              </p>
            </div>
          </div>
        </div>

      </div>
    </aside>
  );
};