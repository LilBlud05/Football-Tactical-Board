// src/types/index.ts

export type PlayerCategory = 'GK' | 'DEF' | 'MID' | 'ATT';
export type FormationPreset = '4-3-3' | '4-2-3-1' | '3-5-2';

export type PlayerRole = 
  | 'Goalkeeper' | 'Sweeper Keeper' 
  | 'Full Back' | 'Wing Back' | 'Center Back' | 'Ball Playing Def' | 'Wide Center Back' | 'Libero'
  | 'Defensive Mid' | 'Deep Playmaker' | 'Volante' | 'Anchor' | 'Box-to-Box' | 'Adv Playmaker' | 'Attacking Mid' | 'Mezzala' | 'Carrilero' | 'Wing Back (L)' | 'Wing Back (R)'
  | 'Inside Forward' | 'Inverted Winger' | 'Advanced Winger' | 'Winger' | 'Target Man' | 'Advanced Forward' | 'False Nine' | 'Complete Forward';

export interface TacticalPlayer {
  id: string;
  name: string;
  number: number;
  category: PlayerCategory;
  role: PlayerRole | string;
  x: number;
  y: number;
}

export interface TacticalPlan {
  id: string;
  teamName: string;
  formation: FormationPreset;
  mentality: string;
  defensiveLine: string;
  players: TacticalPlayer[];
}

export const CATEGORY_ROLES: Record<PlayerCategory, PlayerRole[]> = {
  GK: ['Goalkeeper', 'Sweeper Keeper'],
  DEF: ['Full Back', 'Wing Back', 'Center Back', 'Ball Playing Def', 'Wide Center Back', 'Libero'],
  MID: ['Defensive Mid', 'Deep Playmaker', 'Volante', 'Anchor', 'Box-to-Box', 'Adv Playmaker', 'Attacking Mid', 'Mezzala', 'Carrilero', 'Wing Back (L)', 'Wing Back (R)'],
  ATT: ['Inside Forward', 'Inverted Winger', 'Advanced Winger', 'Winger', 'Target Man', 'Advanced Forward', 'False Nine', 'Complete Forward']
};

export const ROLE_DESCRIPTIONS: Record<string, string> = {
  'Goalkeeper': 'Focuses primarily on shot-stopping and standard distribution.',
  'Sweeper Keeper': 'Plays higher up the pitch, acts as an extra defender and initiates counter-attacks.',
  'Full Back': 'Defends the flanks and supports the winger ahead of them.',
  'Wing Back': 'Provides width in attack while dropping back to form a flat defensive line out of possession.',
  'Center Back': 'Traditional defender tasked with stopping opposition attackers and clearing danger.',
  'Ball Playing Def': 'Steps out of defense with the ball and sprays passes to launch attacks.',
  'Wide Center Back': 'Used in a back three; defends wide areas and frequently overlaps in attack.',
  'Libero': 'Drops behind the defense to sweep up through balls, and strides into midfield when in possession.',
  'Defensive Mid': 'Sits in front of the defense, breaking up attacks and retaining possession.',
  'Deep Playmaker': 'Operates in deep areas to dictate the tempo of the game with expansive passing.',
  'Volante': 'A defensive midfielder who drives forward with the ball to support attacks late.',
  'Anchor': 'Holds position strictly in front of the defense without venturing forward.',
  'Box-to-Box': 'Contributes tirelessly to both defense and attack, operating between the penalty areas.',
  'Adv Playmaker': 'The main creative outlet, finding pockets of space to thread key passes.',
  'Attacking Mid': 'Operates higher up the pitch to create chances and take shots around the box.',
  'Mezzala': 'A central midfielder who drifts wide to operate in the half-spaces and create overloads.',
  'Carrilero': 'Shuttles laterally across the midfield to cover the gaps left by attacking wing-backs.',
  'Wing Back (L)': 'Left-sided player providing the entire flank\'s width and defensive cover.',
  'Wing Back (R)': 'Right-sided player providing the entire flank\'s width and defensive cover.',
  'Inside Forward': 'Starts wide but cuts inside onto their stronger foot to shoot or create centrally.',
  'Inverted Winger': 'Similar to inside forward but focuses more on creating overloads than direct shooting.',
  'Advanced Winger': 'Hugs the touchline, aiming to beat their man on the outside and cross.',
  'Winger': 'Traditional wide player tasked with beating defenders and delivering crosses.',
  'Target Man': 'Uses physical presence to hold up the ball and bring others into play.',
  'Advanced Forward': 'Spearheads the attack, leading the line and looking to break behind the defense.',
  'False Nine': 'Drops deep into midfield to drag defenders out of position and link play.',
  'Complete Forward': 'Possesses the physical and technical attributes to play multiple striker roles simultaneously.'
};