import axios from 'axios';
import queryString from 'query-string';
import { GameSectionInterface, GameSectionGetQueryInterface } from 'interfaces/game-section';
import { GetQueryInterface } from '../../interfaces';

export const getGameSections = async (query?: GameSectionGetQueryInterface) => {
  const response = await axios.get(`/api/game-sections${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGameSection = async (gameSection: GameSectionInterface) => {
  const response = await axios.post('/api/game-sections', gameSection);
  return response.data;
};

export const updateGameSectionById = async (id: string, gameSection: GameSectionInterface) => {
  const response = await axios.put(`/api/game-sections/${id}`, gameSection);
  return response.data;
};

export const getGameSectionById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/game-sections/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGameSectionById = async (id: string) => {
  const response = await axios.delete(`/api/game-sections/${id}`);
  return response.data;
};
