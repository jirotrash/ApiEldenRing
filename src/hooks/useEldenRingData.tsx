import { useState, useEffect } from 'react';
import { eldenRingApiService } from '../api/eldenRingApi';
import {
  EldenRingApiResponse,
  EldenRingElement,
  EldenRingContentType,
  EldenRingQueryParams
} from '../interfaces/eldenRingInterfaces';

interface UseEldenRingDataState<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  currentPage: number;
  totalCount: number;
}

interface UseEldenRingDataReturn<T> extends UseEldenRingDataState<T> {
  loadMore: () => void;
  refresh: () => void;
  search: (query: string) => void;
  clearSearch: () => void;
}

export const useEldenRingData = <T extends EldenRingElement>(
  contentType: EldenRingContentType,
  initialLimit: number = 10
): UseEldenRingDataReturn<T> => {
  
  const [state, setState] = useState<UseEldenRingDataState<T>>({
    data: [],
    loading: false,
    error: null,
    hasMore: true,
    currentPage: 0,
    totalCount: 0,
  });

  const [searchQuery, setSearchQuery] = useState<string>('');

  const fetchData = async (
    page: number = 0, 
    reset: boolean = false, 
    query?: string
  ) => {
    try {
      setState(prev => ({ ...prev, loading: true, error: null }));

      const params: EldenRingQueryParams = {
        limit: initialLimit,
        page: page,
      };

      if (query) {
        params.name = query;
      }

      let response: EldenRingApiResponse<T>;

      // Usar el método apropiado según el tipo de contenido
      switch (contentType) {
        case EldenRingContentType.ITEMS:
          response = query 
            ? await eldenRingApiService.searchItems(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllItems(params) as EldenRingApiResponse<T>;
          break;
        case EldenRingContentType.CREATURES:
          response = query
            ? await eldenRingApiService.searchCreatures(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllCreatures(params) as EldenRingApiResponse<T>;
          break;
        case EldenRingContentType.BOSSES:
          response = query
            ? await eldenRingApiService.searchBosses(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllBosses(params) as EldenRingApiResponse<T>;
          break;
        case EldenRingContentType.WEAPONS:
          response = query
            ? await eldenRingApiService.searchWeapons(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllWeapons(params) as EldenRingApiResponse<T>;
          break;
        case EldenRingContentType.ARMORS:
          response = query
            ? await eldenRingApiService.searchArmors(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllArmors(params) as EldenRingApiResponse<T>;
          break;
        case EldenRingContentType.SORCERIES:
          response = query
            ? await eldenRingApiService.searchSorceries(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllSorceries(params) as EldenRingApiResponse<T>;
          break;
        case EldenRingContentType.SPIRITS:
          response = query
            ? await eldenRingApiService.searchSpirits(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllSpirits(params) as EldenRingApiResponse<T>;
          break;
        case EldenRingContentType.CLASSES:
          response = query
            ? await eldenRingApiService.searchClasses(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllClasses(params) as EldenRingApiResponse<T>;
          break;
        case EldenRingContentType.TALISMANS:
          response = query
            ? await eldenRingApiService.searchTalismans(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllTalismans(params) as EldenRingApiResponse<T>;
          break;
        case EldenRingContentType.INCANTATIONS:
          response = query
            ? await eldenRingApiService.searchIncantations(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllIncantations(params) as EldenRingApiResponse<T>;
          break;
        case EldenRingContentType.ASHES:
          response = query
            ? await eldenRingApiService.searchAshes(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllAshes(params) as EldenRingApiResponse<T>;
          break;
        case EldenRingContentType.AMMOS:
          response = query
            ? await eldenRingApiService.searchAmmos(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllAmmos(params) as EldenRingApiResponse<T>;
          break;
        case EldenRingContentType.LOCATIONS:
          response = query
            ? await eldenRingApiService.searchLocations(query, initialLimit) as EldenRingApiResponse<T>
            : await eldenRingApiService.getAllLocations(params) as EldenRingApiResponse<T>;
          break;
        default:
          response = await eldenRingApiService.getContentByType<T>(contentType, params);
          break;
      }

      if (response.success) {
        setState(prev => ({
          ...prev,
          data: reset ? response.data : [...prev.data, ...response.data],
          loading: false,
          hasMore: response.data.length === initialLimit,
          currentPage: page,
          totalCount: response.count,
        }));
      }
    } catch (error) {
      setState(prev => ({
        ...prev,
        loading: false,
        error: error instanceof Error ? error.message : 'Error desconocido',
      }));
    }
  };

  // Cargar datos iniciales
  useEffect(() => {
    fetchData(0, true, searchQuery);
  }, [contentType, searchQuery]);

  const loadMore = () => {
    if (!state.loading && state.hasMore) {
      fetchData(state.currentPage + 1, false, searchQuery);
    }
  };

  const refresh = () => {
    setState(prev => ({
      ...prev,
      data: [],
      currentPage: 0,
      hasMore: true,
    }));
    fetchData(0, true, searchQuery);
  };

  const search = (query: string) => {
    setSearchQuery(query);
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  return {
    ...state,
    loadMore,
    refresh,
    search,
    clearSearch,
  };
};