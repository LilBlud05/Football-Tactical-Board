// src/app/page.tsx

"use client";

import React, { useState, useEffect, useRef, useMemo } from 'react';
import { toPng } from 'html-to-image';
import { TacticalPitch } from '@/components/features/TacticalPitch';
import { TacticalToolbar } from '@/components/features/TacticalToolbar';
import { PlayerInspector } from '@/components/features/PlayerInspector';
import { TacticalFeedback } from '@/components/features/TacticalFeedback';
import { defaultPresets } from '@/lib/formations';
import { analyzeTactics } from '@/lib/analyzer';
import { FormationPreset, TacticalPlayer, TacticalPlan } from '@/types';
import { cn } from '@/lib/utils';

export default function TacticalBoardPage() {
  const pitchContainerRef = useRef<HTMLDivElement>(null);
  
  // Initialize state via callback so structuredClone only runs once
  const [formation, setFormation] = useState<FormationPreset>('4-3-3');
  const [mentality, setMentality] = useState<string>('Balanced');
  const [players, setPlayers] = useState<TacticalPlayer[]>(() => 
    structuredClone(defaultPresets['4-3-3'])
  );
  const [selectedPlayerId, setSelectedPlayerId] = useState<string | null>(null);

  // Hydration safety: ensure client-side rendering is complete before showing the app
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const handleFormationChange = (newFormation: FormationPreset) => {
    setFormation(newFormation);
    setPlayers(structuredClone(defaultPresets[newFormation]));
    setSelectedPlayerId(null);
  };

  const handleResetPositions = () => {
    setPlayers(structuredClone(defaultPresets[formation]));
    setSelectedPlayerId(null);
  };

  const handlePlayerMove = (id: string, x: number, y: number) => {
    setPlayers((currentPlayers) =>
      currentPlayers.map((p) => (p.id === id ? { ...p, x, y } : p))
    );
  };

  const handleUpdatePlayer = (id: string, updates: Partial<TacticalPlayer>) => {
    setPlayers((currentPlayers) =>
      currentPlayers.map((p) => (p.id === id ? { ...p, ...updates } : p))
    );
  };

  const handleExportBoard = async () => {
    if (!pitchContainerRef.current) return;
    try {
      // Temporarily remove selection highlight before screenshot
      const prevSelected = selectedPlayerId;
      setSelectedPlayerId(null);
      
      // Set timeout allows React to re-render without the yellow selection ring before capturing
      setTimeout(async () => {
        if (pitchContainerRef.current) {
          const dataUrl = await toPng(pitchContainerRef.current, {
            quality: 1.0,
            pixelRatio: 2, // High resolution for clear tactical sharing
          });
          
          const link = document.createElement('a');
          link.download = `tactics-${formation}-${mentality.toLowerCase()}.png`;
          link.href = dataUrl;
          link.click();
        }
        
        // Restore selection state
        setSelectedPlayerId(prevSelected);
      }, 150);
    } catch (err) {
      console.error('Failed to export image', err);
    }
  };

  const selectedPlayer = players.find((p) => p.id === selectedPlayerId) || null;

  // Real-time calculation of tactical flaws based on our rule engine
  const analysisIssues = useMemo(() => {
    if (players.length === 0) return [];
    
    const plan: TacticalPlan = {
      id: 'current-plan',
      teamName: 'My Team',
      formation,
      mentality,
      defensiveLine: 'Standard',
      players,
    };
    
    return analyzeTactics(plan);
  }, [players, formation, mentality]);

  if (!mounted) return null;

  return (
    <main className="flex h-screen w-full bg-slate-950 overflow-hidden font-sans">
      
      {/* Main Board Area */}
      <div 
        className={cn(
          "flex-1 flex flex-col h-full overflow-y-auto transition-all duration-300",
          selectedPlayerId ? "md:pr-96" : "" // Gracefully compress width when inspector opens
        )}
      >
        <div className="max-w-5xl mx-auto w-full p-4 md:p-8 flex flex-col gap-6 pb-20">
          
          <header className="text-center sm:text-left mb-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-100 mb-2">
              Tactical Board
            </h1>
            <p className="text-sm text-slate-400">
              Drag players to position them. Click a player to inspect and edit their role.
            </p>
          </header>

          <TacticalToolbar
            currentFormation={formation}
            onFormationChange={handleFormationChange}
            currentMentality={mentality}
            onMentalityChange={setMentality}
            onReset={handleResetPositions}
            onExport={handleExportBoard}
          />

          {/* Wrapped specifically with our ref to capture a clean PNG export */}
          <div ref={pitchContainerRef} className="rounded-2xl bg-slate-950 p-2 md:p-0">
            <TacticalPitch
              players={players}
              selectedPlayerId={selectedPlayerId || undefined}
              onSelectPlayer={(player) => setSelectedPlayerId(player.id)}
              onPlayerMove={handlePlayerMove}
            />
          </div>

          <TacticalFeedback issues={analysisIssues} />
          
        </div>
      </div>

      {/* Slide-out Player Editor Sidebar */}
      <PlayerInspector
        player={selectedPlayer}
        onUpdate={handleUpdatePlayer}
        onClose={() => setSelectedPlayerId(null)}
      />

    </main>
  );
}