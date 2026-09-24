// src/lib/analyzer.ts

import { TacticalPlan } from '@/types';

export interface TacticalIssue {
  id: string;
  type: 'warning' | 'strength' | 'tip';
  message: string;
}

export function analyzeTactics(plan: TacticalPlan): TacticalIssue[] {
  const issues: TacticalIssue[] = [];
  const { players, mentality } = plan;

  // Rule 1: Central Midfield Cover
  const hasDefensiveMid = players.some(
    (p) =>
      p.category === 'MID' &&
      ['Defensive Mid', 'Deep Playmaker', 'Anchor', 'Volante'].includes(p.role)
  );

  if (!hasDefensiveMid) {
    issues.push({
      id: 'no-dm',
      type: 'warning',
      message: 'Central midfield exposed: Consider assigning a holding midfielder to protect the defense.',
    });
  } else {
    issues.push({
      id: 'has-dm',
      type: 'strength',
      message: 'Solid midfield base with a dedicated defensive pivot.',
    });
  }

  // Rule 2: Full-backs Positioning vs Mentality
  // Assuming y=0 is opponent goal, y=100 is own goal. y < 45 is high up the pitch.
  // x < 30 is left flank, x > 70 is right flank.
  const leftBacks = players.filter(p => p.x < 30 && (p.role.includes('Back') || p.category === 'DEF'));
  const rightBacks = players.filter(p => p.x > 70 && (p.role.includes('Back') || p.category === 'DEF'));
  
  const highLB = leftBacks.some(p => p.y < 45);
  const highRB = rightBacks.some(p => p.y < 45);

  if (highLB && highRB && (mentality === 'Attacking' || mentality === 'Gegenpress')) {
    issues.push({
      id: 'high-fb-counter',
      type: 'warning',
      message: 'Vulnerable to counter-attacks in wide areas. Both full-backs are pushed very high up the pitch.',
    });
  }

  // Rule 3: Deep Defensive Line Detachment
  // Average y > 75 means defenders are sitting very deep (low block).
  const defenders = players.filter(p => p.category === 'DEF');
  const avgDefY = defenders.length 
    ? defenders.reduce((sum, p) => sum + p.y, 0) / defenders.length 
    : 0;
    
  const forwardsCount = players.filter(p => p.category === 'ATT').length;
  
  if (avgDefY > 75 && forwardsCount >= 3) {
    issues.push({
      id: 'low-block-3fwd',
      type: 'tip',
      message: 'Playing a deep defensive line with 3 advanced forwards can leave a massive gap in midfield. Try having wingers drop back or utilizing a False Nine.',
    });
  }

  // Rule 4: Overcrowded Flanks
  const rightFlankPlayers = players.filter(p => p.x > 80).length;
  const leftFlankPlayers = players.filter(p => p.x < 20).length;

  if (rightFlankPlayers > 2 || leftFlankPlayers > 2) {
    issues.push({
      id: 'overcrowded-flanks',
      type: 'warning',
      message: 'Players are tripping over each other out wide. Ensure clear attacking lanes on the flanks.',
    });
  }

  return issues;
}