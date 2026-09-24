// src/lib/formations.ts

import { FormationPreset, TacticalPlayer } from '@/types';

// Helper to quickly structure default players while maintaining consistency
const createPlayer = (
  id: string,
  name: string,
  number: number,
  category: TacticalPlayer['category'],
  role: string,
  x: number,
  y: number
): TacticalPlayer => ({ id, name, number, category, role, x, y });

export const formation433: TacticalPlayer[] = [
  createPlayer('433-gk', 'A. Onana', 24, 'GK', 'Sweeper Keeper', 50, 90),
  createPlayer('433-lb', 'A. Davies', 19, 'DEF', 'Wing Back', 15, 75),
  createPlayer('433-lcb', 'W. Saliba', 2, 'DEF', 'Ball Playing Def', 35, 75),
  createPlayer('433-rcb', 'R. Dias', 3, 'DEF', 'Center Back', 65, 75),
  createPlayer('433-rb', 'K. Walker', 2, 'DEF', 'Full Back', 85, 75),
  createPlayer('433-cdm', 'D. Rice', 41, 'MID', 'Defensive Mid', 50, 60),
  createPlayer('433-lcm', 'K. De Bruyne', 17, 'MID', 'Adv Playmaker', 30, 45),
  createPlayer('433-rcm', 'J. Bellingham', 5, 'MID', 'Box-to-Box', 70, 45),
  createPlayer('433-lw', 'K. Mbappe', 7, 'ATT', 'Inside Forward', 20, 20),
  createPlayer('433-st', 'E. Haaland', 9, 'ATT', 'Target Man', 50, 15),
  createPlayer('433-rw', 'B. Saka', 11, 'ATT', 'Winger', 80, 20),
];

export const formation4231: TacticalPlayer[] = [
  createPlayer('4231-gk', 'E. Martinez', 1, 'GK', 'Goalkeeper', 50, 90),
  createPlayer('4231-lb', 'T. Hernandez', 22, 'DEF', 'Wing Back', 15, 75),
  createPlayer('4231-lcb', 'A. Bastoni', 95, 'DEF', 'Center Back', 35, 75),
  createPlayer('4231-rcb', 'J. Stones', 5, 'DEF', 'Ball Playing Def', 65, 75),
  createPlayer('4231-rb', 'J. Frimpong', 30, 'DEF', 'Full Back', 85, 75),
  createPlayer('4231-ldm', 'Rodri', 16, 'MID', 'Deep Playmaker', 35, 60),
  createPlayer('4231-rdm', 'E. Fernandez', 8, 'MID', 'Volante', 65, 60),
  createPlayer('4231-lam', 'R. Leao', 10, 'ATT', 'Inverted Winger', 25, 35),
  createPlayer('4231-cam', 'M. Odegaard', 8, 'MID', 'Attacking Mid', 50, 35),
  createPlayer('4231-ram', 'P. Foden', 47, 'ATT', 'Advanced Winger', 75, 35),
  createPlayer('4231-st', 'V. Osimhen', 9, 'ATT', 'Advanced Forward', 50, 15),
];

export const formation352: TacticalPlayer[] = [
  createPlayer('352-gk', 'Alisson', 1, 'GK', 'Sweeper Keeper', 50, 90),
  createPlayer('352-lcb', 'J. Gvardiol', 24, 'DEF', 'Wide Center Back', 25, 75),
  createPlayer('352-cb', 'V. van Dijk', 4, 'DEF', 'Libero', 50, 75),
  createPlayer('352-rcb', 'A. Silva', 3, 'DEF', 'Center Back', 75, 75),
  createPlayer('352-lwb', 'F. Dimarco', 32, 'MID', 'Wing Back (L)', 10, 50),
  createPlayer('352-lcm', 'Pedri', 8, 'MID', 'Mezzala', 35, 55),
  createPlayer('352-cdm', 'A. Tchouameni', 14, 'MID', 'Anchor', 50, 65),
  createPlayer('352-rcm', 'F. Valverde', 15, 'MID', 'Carrilero', 65, 55),
  createPlayer('352-rwb', 'A. Hakimi', 2, 'MID', 'Wing Back (R)', 90, 50),
  createPlayer('352-lst', 'L. Martinez', 10, 'ATT', 'False Nine', 35, 20),
  createPlayer('352-rst', 'H. Kane', 9, 'ATT', 'Complete Forward', 65, 20),
];

export const defaultPresets: Record<FormationPreset, TacticalPlayer[]> = {
  '4-3-3': formation433,
  '4-2-3-1': formation4231,
  '3-5-2': formation352,
};