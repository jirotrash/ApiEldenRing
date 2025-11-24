// Interfaces para la API de Elden Ring

export interface EldenRingApiResponse<T> {
  success: boolean;
  count: number;
  data: T[];
}

export interface BaseEldenRingItem {
  id: string;
  name: string;
  image?: string;
  description?: string;
}

// Interfaces para Items
export interface EldenRingItem extends BaseEldenRingItem {
  scaling?: string;
  effect?: string;
  type?: string;
}

// Interfaces para Criaturas
export interface EldenRingCreature extends BaseEldenRingItem {
  location?: string;
  drops?: string[];
  health?: string;
  weakness?: string[];
  resistance?: string[];
}

// Interfaces para Jefes
export interface EldenRingBoss extends BaseEldenRingItem {
  location?: string;
  drops?: string[];
  healthPoints?: string;
  weakness?: string[];
  resistance?: string[];
  region?: string;
}

// Interfaces para Armas
export interface EldenRingWeapon extends BaseEldenRingItem {
  type?: string;
  attack?: {
    physical?: number;
    magic?: number;
    fire?: number;
    lightning?: number;
    holy?: number;
    critical?: number;
  };
  defence?: {
    physical?: number;
    magic?: number;
    fire?: number;
    lightning?: number;
    holy?: number;
    boost?: number;
  };
  scalesWith?: {
    str?: string;
    dex?: string;
    int?: string;
    faith?: string;
    arc?: string;
  };
  requiredAttributes?: {
    str?: number;
    dex?: number;
    int?: number;
    faith?: number;
    arc?: number;
  };
  category?: string;
  weight?: number;
}

// Interfaces para Armaduras
export interface EldenRingArmor extends BaseEldenRingItem {
  type?: string;
  dmgNegation?: {
    physical?: number;
    vs_strike?: number;
    vs_slash?: number;
    vs_pierce?: number;
    magic?: number;
    fire?: number;
    lightning?: number;
    holy?: number;
  };
  resistance?: {
    immunity?: number;
    robustness?: number;
    focus?: number;
    vitality?: number;
    poise?: number;
  };
  category?: string;
  weight?: number;
}

// Interfaces para Hechizos
export interface EldenRingSpell extends BaseEldenRingItem {
  type?: string;
  cost?: string;
  slots?: number;
  effects?: string;
  requires?: {
    intelligence?: number;
    faith?: number;
    arcane?: number;
  };
}

// Interfaces para Espíritus
export interface EldenRingSpirit extends BaseEldenRingItem {
  fpCost?: string;
  hpCost?: string;
  effects?: string;
}

// Interfaces para Clases
export interface EldenRingClass extends BaseEldenRingItem {
  stats?: {
    level?: number;
    vigor?: number;
    mind?: number;
    endurance?: number;
    strength?: number;
    dexterity?: number;
    intelligence?: number;
    faith?: number;
    arcane?: number;
  };
}

// Interfaces para Talismanes
export interface EldenRingTalisman extends BaseEldenRingItem {
  effect?: string;
}

// Interfaces para Incantaciones
export interface EldenRingIncantation extends BaseEldenRingItem {
  type?: string;
  cost?: string;
  slots?: number;
  effects?: string;
  requires?: {
    faith?: number;
    intelligence?: number;
    arcane?: number;
  };
}

// Interfaces para Cenizas de Guerra
export interface EldenRingAsh extends BaseEldenRingItem {
  affinity?: string;
  skill?: string;
}

// Interfaces para Municiones
export interface EldenRingAmmo extends BaseEldenRingItem {
  type?: string;
  attack?: {
    physical?: number;
    magic?: number;
    fire?: number;
    lightning?: number;
    holy?: number;
    critical?: number;
  };
  passive?: string;
}

// Interfaces para Ubicaciones
export interface EldenRingLocation extends BaseEldenRingItem {
  region?: string;
}

// Union type para todos los elementos
export type EldenRingElement = 
  | EldenRingItem 
  | EldenRingCreature 
  | EldenRingBoss 
  | EldenRingWeapon 
  | EldenRingArmor 
  | EldenRingSpell 
  | EldenRingSpirit 
  | EldenRingClass 
  | EldenRingTalisman 
  | EldenRingIncantation 
  | EldenRingAsh 
  | EldenRingAmmo 
  | EldenRingLocation;

// Enum para tipos de contenido
export enum EldenRingContentType {
  ITEMS = 'items',
  CREATURES = 'creatures', 
  BOSSES = 'bosses',
  WEAPONS = 'weapons',
  ARMORS = 'armors',
  ASHES = 'ashes',
  CLASSES = 'classes',
  INCANTATIONS = 'incantations',
  SORCERIES = 'sorceries',
  SPIRITS = 'spirits',
  TALISMANS = 'talismans',
  AMMOS = 'ammos',
  LOCATIONS = 'locations'
}

// Parámetros para las consultas
export interface EldenRingQueryParams {
  limit?: number;
  page?: number;
  name?: string;
}