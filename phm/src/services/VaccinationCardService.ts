import { api } from './apiClient';
import { VaccinationCardPayload } from '../types/models';

/**
 * Service for handling vaccination card operations
 */
export const VaccinationCardService = {
  /**
   * Fetch vaccination card data for a child
   * @param childId - The child's unique identifier
   * @returns Promise containing the vaccination card payload
   */
  async getChildVaccinationCard(childId: string): Promise<VaccinationCardPayload> {
    try {
      const response = await api.get<VaccinationCardPayload>(
        `/parent/child/${childId}/vaccination-card`
      );
      return response;
    } catch (error) {
      console.error('Failed to fetch vaccination card:', error);
      throw new Error('Unable to load vaccination card. Please try again.');
    }
  },

  /**
   * Fetch vaccination card data for multiple children
   * @param childIds - Array of child identifiers
   * @returns Promise containing array of vaccination card payloads
   */
  async getMultipleVaccinationCards(
    childIds: string[]
  ): Promise<VaccinationCardPayload[]> {
    try {
      const promises = childIds.map((childId) =>
        this.getChildVaccinationCard(childId)
      );
      return await Promise.all(promises);
    } catch (error) {
      console.error('Failed to fetch multiple vaccination cards:', error);
      throw new Error('Unable to load vaccination cards. Please try again.');
    }
  },
};

