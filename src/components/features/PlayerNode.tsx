// src/components/features/PlayerNode.tsx

import React from 'react';
import { Hand, Shield, Waypoints, Crosshair } from 'lucide-react';
import { TacticalPlayer } from '@/types';
import { cn } from '@/lib/utils';

interface PlayerNodeProps {
  player: TacticalPlayer;
  isSelected?: boolean;
  isDragging?: boolean;
  onSelect?: (player: TacticalPlayer) => void;
  onPointerDown?: (e: React.PointerEvent<HTMLDivElement>) => void;
}

const getCategoryStyles = (category: TacticalPlayer['category']) => {
  switch (category) {
    case 'GK': return { icon: <Hand className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-emerald-400" />, ring: 'ring-emerald-500/50' };
    case 'DEF': return { icon: <Shield className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-blue-400" />, ring: 'ring-blue-500/50' };
    case 'MID': return { icon: <Waypoints className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-yellow-400" />, ring: 'ring-yellow-500/50' };
    case 'ATT': return { icon: <Crosshair className="w-2.5 h-2.5 sm:w-3 sm:h-3 text-red-400" />, ring: 'ring-red-500/50' };
    default: return { icon: null, ring: 'ring-slate-500/50' };
  }
};

export const PlayerNode: React.FC<PlayerNodeProps> = ({
  player,
  isSelected = false,
  isDragging = false,
  onSelect,
  onPointerDown,
}) => {
  const { icon, ring } = getCategoryStyles(player.category);

  return (
    <div
      onPointerDown={onPointerDown}
      onClick={() => onSelect?.(player)}
      className={cn(
        "absolute transform -translate-x-1/2 -translate-y-1/2 group flex flex-col items-center canvas-drag-element",
        isDragging 
          ? "z-50 scale-110 cursor-grabbing" 
          : "cursor-grab z-10 transition-transform duration-200 hover:scale-110 hover:z-20"
      )}
      style={{ left: `${player.x}%`, top: `${player.y}%` }}
    >
      {/* Jersey Token */}
      <div 
        className={cn(
          "w-8 h-8 sm:w-10 sm:h-10 rounded-full flex items-center justify-center text-sm sm:text-base font-bold shadow-lg border-2 transition-colors",
          isSelected
            ? "bg-yellow-400 text-emerald-950 border-yellow-200 ring-4 ring-yellow-400/30"
            : "bg-white text-emerald-950 border-slate-200 group-hover:bg-gray-100",
          isDragging && "ring-4 shadow-2xl bg-slate-100",
          !isSelected && !isDragging && `ring-2 ${ring}`
        )}
      >
        {player.number}
      </div>
      
      {/* Label Badge */}
      <div className="mt-1.5 flex flex-col items-center bg-black/75 backdrop-blur-md rounded-lg px-2.5 py-1 pointer-events-none shadow-sm border border-white/10">
        <span className="text-[10px] sm:text-[11px] text-white font-bold whitespace-nowrap leading-tight tracking-wide drop-shadow-md">
          {player.name}
        </span>
        <div className="flex items-center gap-1.5 mt-0.5">
          {icon}
          <span className="text-[8px] sm:text-[9px] text-slate-300 font-medium whitespace-nowrap leading-none uppercase tracking-wider">
            {player.role}
          </span>
        </div>
      </div>
    </div>
  );
};