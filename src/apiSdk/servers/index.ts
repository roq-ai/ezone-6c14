import axios from 'axios';
import queryString from 'query-string';
import { ServerInterface, ServerGetQueryInterface } from 'interfaces/server';
import { GetQueryInterface } from '../../interfaces';

export const getServers = async (query?: ServerGetQueryInterface) => {
  const response = await axios.get(`/api/servers${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createServer = async (server: ServerInterface) => {
  const response = await axios.post('/api/servers', server);
  return response.data;
};

export const updateServerById = async (id: string, server: ServerInterface) => {
  const response = await axios.put(`/api/servers/${id}`, server);
  return response.data;
};

export const getServerById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/servers/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteServerById = async (id: string) => {
  const response = await axios.delete(`/api/servers/${id}`);
  return response.data;
};
