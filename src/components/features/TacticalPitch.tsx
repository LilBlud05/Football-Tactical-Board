// src/components/features/TacticalPitch.tsx

import React, { useRef, useState } from 'react';
import { TacticalPlayer } from '@/types';
import { PlayerNode } from './PlayerNode';
import { cn } from '@/lib/utils';

interface TacticalPitchProps {
  players: TacticalPlayer[];
  onSelectPlayer?: (player: TacticalPlayer) => void;
  selectedPlayerId?: string;
  onPlayerMove?: (id: string, x: number, y: number) => void;
}

export const TacticalPitch: React.FC<TacticalPitchProps> = ({
  players,
  onSelectPlayer,
  selectedPlayerId,
  onPlayerMove,
}) => {
  const pitchRef = useRef<HTMLDivElement>(null);
  const [draggingId, setDraggingId] = useState<string | null>(null);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>, player: TacticalPlayer) => {
    e.stopPropagation();
    e.currentTarget.setPointerCapture(e.pointerId);
    setDraggingId(player.id);
    onSelectPlayer?.(player);
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!draggingId || !pitchRef.current || !onPlayerMove) return;

    const rect = pitchRef.current.getBoundingClientRect();
    
    // Convert current mouse location to precise pitch percentages
    let x = ((e.clientX - rect.left) / rect.width) * 100;
    let y = ((e.clientY - rect.top) / rect.height) * 100;

    // Clamp coordinates to keep players from being dragged outside the grass
    x = Math.max(0, Math.min(100, x));
    y = Math.max(0, Math.min(100, y));

    onPlayerMove(draggingId, x, y);
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (draggingId) {
      e.currentTarget.releasePointerCapture(e.pointerId);
      setDraggingId(null);
    }
  };

  return (
    <div className="w-full max-w-3xl mx-auto bg-[#132a1c] rounded-2xl shadow-2xl overflow-hidden p-4 md:p-8 border-4 border-[#0c1a11]">
      <div 
        ref={pitchRef}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className="relative w-full select-none touch-none" 
        style={{ aspectRatio: '68/105' }}
      >
        {/* Pitch Markings SVG */}
        <svg 
          viewBox="0 0 68 105" 
          className="absolute inset-0 w-full h-full overflow-visible text-white/30 pointer-events-none" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="0.3"
        >
          {Array.from({ length: 18 }).map((_, i) => (
            <rect
              key={`stripe-${i}`}
              x="-20"
              y={i * (105 / 18)}
              width="108"
              height={105 / 18}
              fill={i % 2 === 0 ? 'rgba(255,255,255,0.03)' : 'transparent'}
              stroke="none"
            />
          ))}

          <rect x="0" y="0" width="68" height="105" />
          <line x1="0" y1="52.5" x2="68" y2="52.5" />
          <circle cx="34" cy="52.5" r="9.15" />
          <circle cx="34" cy="52.5" r="0.5" fill="currentColor" />

          <rect x="13.84" y="0" width="40.32" height="16.5" />
          <rect x="24.84" y="0" width="18.32" height="5.5" />
          <circle cx="34" cy="11" r="0.5" fill="currentColor" />
          <path d="M 26.688 16.5 A 9.15 9.15 0 0 0 41.312 16.5" />

          <rect x="13.84" y="88.5" width="40.32" height="16.5" />
          <rect x="24.84" y="99.5" width="18.32" height="5.5" />
          <circle cx="34" cy="94" r="0.5" fill="currentColor" />
          <path d="M 26.688 88.5 A 9.15 9.15 0 0 1 41.312 88.5" />

          <path d="M 0 1 A 1 1 0 0 0 1 0" />
          <path d="M 67 0 A 1 1 0 0 0 68 1" />
          <path d="M 0 104 A 1 1 0 0 1 1 105" />
          <path d="M 68 104 A 1 1 0 0 0 67 105" />
        </svg>

        {/* Players Overlay */}
        {players.map((player) => (
          <PlayerNode
            key={player.id}
            player={player}
            isSelected={selectedPlayerId === player.id}
            isDragging={draggingId === player.id}
            onSelect={onSelectPlayer}
            onPointerDown={(e) => handlePointerDown(e, player)}
          />
        ))}
      </div>
    </div>
  );
};