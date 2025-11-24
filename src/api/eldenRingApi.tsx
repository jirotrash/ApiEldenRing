import axios, { AxiosResponse } from 'axios';
import {
  EldenRingApiResponse,
  EldenRingItem,
  EldenRingCreature,
  EldenRingBoss,
  EldenRingWeapon,
  EldenRingArmor,
  EldenRingSpell,
  EldenRingSpirit,
  EldenRingClass,
  EldenRingTalisman,
  EldenRingIncantation,
  EldenRingAsh,
  EldenRingAmmo,
  EldenRingLocation,
  EldenRingContentType,
  EldenRingQueryParams
} from '../interfaces/eldenRingInterfaces';

const BASE_URL = 'https://eldenring.fanapis.com/api';

// Instancia de axios configurada
const eldenRingApi = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Clase principal para el servicio de API
class EldenRingApiService {

  // Método genérico para hacer consultas GET
  private async get<T>(
    endpoint: string, 
    params?: EldenRingQueryParams
  ): Promise<EldenRingApiResponse<T>> {
    try {
      const response: AxiosResponse<EldenRingApiResponse<T>> = await eldenRingApi.get(
        endpoint,
        { params }
      );
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}:`, error);
      throw error;
    }
  }

  // Método genérico para buscar por ID
  private async getById<T>(
    endpoint: string, 
    id: string
  ): Promise<T> {
    try {
      const response: AxiosResponse<T> = await eldenRingApi.get(`${endpoint}/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching ${endpoint}/${id}:`, error);
      throw error;
    }
  }

  // ===================
  // MÉTODOS PARA ITEMS
  // ===================
  
  async getAllItems(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingItem>> {
    return this.get<EldenRingItem>('/items', params);
  }

  async getItemById(id: string): Promise<EldenRingItem> {
    return this.getById<EldenRingItem>('/items', id);
  }

  async searchItems(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingItem>> {
    return this.get<EldenRingItem>('/items', { name, limit });
  }

  // ===================
  // MÉTODOS PARA CRIATURAS
  // ===================

  async getAllCreatures(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingCreature>> {
    return this.get<EldenRingCreature>('/creatures', params);
  }

  async getCreatureById(id: string): Promise<EldenRingCreature> {
    return this.getById<EldenRingCreature>('/creatures', id);
  }

  async searchCreatures(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingCreature>> {
    return this.get<EldenRingCreature>('/creatures', { name, limit });
  }

  // ===================
  // MÉTODOS PARA JEFES
  // ===================

  async getAllBosses(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingBoss>> {
    return this.get<EldenRingBoss>('/bosses', params);
  }

  async getBossById(id: string): Promise<EldenRingBoss> {
    return this.getById<EldenRingBoss>('/bosses', id);
  }

  async searchBosses(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingBoss>> {
    return this.get<EldenRingBoss>('/bosses', { name, limit });
  }

  // ===================
  // MÉTODOS PARA ARMAS
  // ===================

  async getAllWeapons(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingWeapon>> {
    return this.get<EldenRingWeapon>('/weapons', params);
  }

  async getWeaponById(id: string): Promise<EldenRingWeapon> {
    return this.getById<EldenRingWeapon>('/weapons', id);
  }

  async searchWeapons(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingWeapon>> {
    return this.get<EldenRingWeapon>('/weapons', { name, limit });
  }

  // ===================
  // MÉTODOS PARA ARMADURAS
  // ===================

  async getAllArmors(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingArmor>> {
    return this.get<EldenRingArmor>('/armors', params);
  }

  async getArmorById(id: string): Promise<EldenRingArmor> {
    return this.getById<EldenRingArmor>('/armors', id);
  }

  async searchArmors(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingArmor>> {
    return this.get<EldenRingArmor>('/armors', { name, limit });
  }

  // ===================
  // MÉTODOS PARA HECHIZOS (SORCERIES)
  // ===================

  async getAllSorceries(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingSpell>> {
    return this.get<EldenRingSpell>('/sorceries', params);
  }

  async getSorceryById(id: string): Promise<EldenRingSpell> {
    return this.getById<EldenRingSpell>('/sorceries', id);
  }

  async searchSorceries(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingSpell>> {
    return this.get<EldenRingSpell>('/sorceries', { name, limit });
  }

  // ===================
  // MÉTODOS PARA ESPÍRITUS
  // ===================

  async getAllSpirits(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingSpirit>> {
    return this.get<EldenRingSpirit>('/spirits', params);
  }

  async getSpiritById(id: string): Promise<EldenRingSpirit> {
    return this.getById<EldenRingSpirit>('/spirits', id);
  }

  async searchSpirits(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingSpirit>> {
    return this.get<EldenRingSpirit>('/spirits', { name, limit });
  }

  // ===================
  // MÉTODOS PARA CLASES
  // ===================

  async getAllClasses(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingClass>> {
    return this.get<EldenRingClass>('/classes', params);
  }

  async getClassById(id: string): Promise<EldenRingClass> {
    return this.getById<EldenRingClass>('/classes', id);
  }

  async searchClasses(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingClass>> {
    return this.get<EldenRingClass>('/classes', { name, limit });
  }

  // ===================
  // MÉTODOS PARA TALISMANES
  // ===================

  async getAllTalismans(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingTalisman>> {
    return this.get<EldenRingTalisman>('/talismans', params);
  }

  async getTalismanById(id: string): Promise<EldenRingTalisman> {
    return this.getById<EldenRingTalisman>('/talismans', id);
  }

  async searchTalismans(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingTalisman>> {
    return this.get<EldenRingTalisman>('/talismans', { name, limit });
  }

  // ===================
  // MÉTODOS PARA INCANTACIONES
  // ===================

  async getAllIncantations(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingIncantation>> {
    return this.get<EldenRingIncantation>('/incantations', params);
  }

  async getIncantationById(id: string): Promise<EldenRingIncantation> {
    return this.getById<EldenRingIncantation>('/incantations', id);
  }

  async searchIncantations(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingIncantation>> {
    return this.get<EldenRingIncantation>('/incantations', { name, limit });
  }

  // ===================
  // MÉTODOS PARA CENIZAS DE GUERRA
  // ===================

  async getAllAshes(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingAsh>> {
    return this.get<EldenRingAsh>('/ashes', params);
  }

  async getAshById(id: string): Promise<EldenRingAsh> {
    return this.getById<EldenRingAsh>('/ashes', id);
  }

  async searchAshes(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingAsh>> {
    return this.get<EldenRingAsh>('/ashes', { name, limit });
  }

  // ===================
  // MÉTODOS PARA MUNICIONES
  // ===================

  async getAllAmmos(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingAmmo>> {
    return this.get<EldenRingAmmo>('/ammos', params);
  }

  async getAmmoById(id: string): Promise<EldenRingAmmo> {
    return this.getById<EldenRingAmmo>('/ammos', id);
  }

  async searchAmmos(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingAmmo>> {
    return this.get<EldenRingAmmo>('/ammos', { name, limit });
  }

  // ===================
  // MÉTODOS PARA UBICACIONES
  // ===================

  async getAllLocations(params?: EldenRingQueryParams): Promise<EldenRingApiResponse<EldenRingLocation>> {
    return this.get<EldenRingLocation>('/locations', params);
  }

  async getLocationById(id: string): Promise<EldenRingLocation> {
    return this.getById<EldenRingLocation>('/locations', id);
  }

  async searchLocations(name: string, limit?: number): Promise<EldenRingApiResponse<EldenRingLocation>> {
    return this.get<EldenRingLocation>('/locations', { name, limit });
  }

  // ===================
  // MÉTODO GENÉRICO PARA CUALQUIER ENDPOINT
  // ===================

  async getContentByType<T>(
    contentType: EldenRingContentType, 
    params?: EldenRingQueryParams
  ): Promise<EldenRingApiResponse<T>> {
    return this.get<T>(`/${contentType}`, params);
  }

  // Método para hacer búsquedas globales
  async globalSearch(query: string, limit: number = 20): Promise<{
    items: EldenRingItem[];
    creatures: EldenRingCreature[];
    bosses: EldenRingBoss[];
    weapons: EldenRingWeapon[];
    armors: EldenRingArmor[];
  }> {
    try {
      const [items, creatures, bosses, weapons, armors] = await Promise.all([
        this.searchItems(query, Math.floor(limit / 5)),
        this.searchCreatures(query, Math.floor(limit / 5)),
        this.searchBosses(query, Math.floor(limit / 5)),
        this.searchWeapons(query, Math.floor(limit / 5)),
        this.searchArmors(query, Math.floor(limit / 5)),
      ]);

      return {
        items: items.data,
        creatures: creatures.data,
        bosses: bosses.data,
        weapons: weapons.data,
        armors: armors.data,
      };
    } catch (error) {
      console.error('Error en búsqueda global:', error);
      throw error;
    }
  }
}

// Exportar una instancia del servicio
export const eldenRingApiService = new EldenRingApiService();
export default eldenRingApiService;