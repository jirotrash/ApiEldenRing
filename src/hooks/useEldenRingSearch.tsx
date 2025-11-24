import { useState, useEffect } from 'react';
import { eldenRingApiService } from '../api/eldenRingApi';
import {
  EldenRingElement,
  EldenRingItem,
  EldenRingCreature,
  EldenRingBoss,
  EldenRingWeapon,
  EldenRingArmor
} from '../interfaces/eldenRingInterfaces';

interface GlobalSearchResult {
  items: EldenRingItem[];
  creatures: EldenRingCreature[];
  bosses: EldenRingBoss[];
  weapons: EldenRingWeapon[];
  armors: EldenRingArmor[];
}

interface UseEldenRingSearchReturn {
  results: GlobalSearchResult | null;
  loading: boolean;
  error: string | null;
  search: (query: string) => void;
  clearResults: () => void;
}

export const useEldenRingSearch = (): UseEldenRingSearchReturn => {
  const [results, setResults] = useState<GlobalSearchResult | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const search = async (query: string) => {
    if (!query.trim()) {
      setResults(null);
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      const searchResults = await eldenRingApiService.globalSearch(query, 20);
      setResults(searchResults);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error en la búsqueda');
      setResults(null);
    } finally {
      setLoading(false);
    }
  };

  const clearResults = () => {
    setResults(null);
    setError(null);
  };

  return {
    results,
    loading,
    error,
    search,
    clearResults,
  };
};

// Hook para obtener detalles de un elemento específico
interface UseEldenRingDetailReturn<T> {
  item: T | null;
  loading: boolean;
  error: string | null;
  fetchItem: (id: string, type: string) => void;
}

export const useEldenRingDetail = <T extends EldenRingElement>(): UseEldenRingDetailReturn<T> => {
  const [item, setItem] = useState<T | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchItem = async (id: string, type: string) => {
    try {
      setLoading(true);
      setError(null);
      
      let result: T;
      
      switch (type.toLowerCase()) {
        case 'items':
          result = await eldenRingApiService.getItemById(id) as T;
          break;
        case 'creatures':
          result = await eldenRingApiService.getCreatureById(id) as T;
          break;
        case 'bosses':
          result = await eldenRingApiService.getBossById(id) as T;
          break;
        case 'weapons':
          result = await eldenRingApiService.getWeaponById(id) as T;
          break;
        case 'armors':
          result = await eldenRingApiService.getArmorById(id) as T;
          break;
        case 'sorceries':
          result = await eldenRingApiService.getSorceryById(id) as T;
          break;
        case 'spirits':
          result = await eldenRingApiService.getSpiritById(id) as T;
          break;
        case 'classes':
          result = await eldenRingApiService.getClassById(id) as T;
          break;
        case 'talismans':
          result = await eldenRingApiService.getTalismanById(id) as T;
          break;
        case 'incantations':
          result = await eldenRingApiService.getIncantationById(id) as T;
          break;
        case 'ashes':
          result = await eldenRingApiService.getAshById(id) as T;
          break;
        case 'ammos':
          result = await eldenRingApiService.getAmmoById(id) as T;
          break;
        case 'locations':
          result = await eldenRingApiService.getLocationById(id) as T;
          break;
        default:
          throw new Error(`Tipo desconocido: ${type}`);
      }
      
      setItem(result);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Error al obtener el detalle');
      setItem(null);
    } finally {
      setLoading(false);
    }
  };

  return {
    item,
    loading,
    error,
    fetchItem,
  };
};