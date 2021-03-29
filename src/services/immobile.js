import api from "./api";

export const listProperties = ({ search, filter, page = 1, limit = 5 }) => {
  return search && filter
    ? api.get(`/properties?page=${page}&limit=${limit}`, {
        params: {
          search,
          filter,
        },
      })
    : api.get(`/properties?page=${page}&limit=${limit}`);
};

export const listPropertiesByOwner = ownerId => api.get(`/immobile/owner/${ownerId}`);

export const listImmobileById = immobileId => api.get(`/immobile/${immobileId}`);

export const registrationImmobile = (immobile, token) => api.post(`/immobile`, immobile, { headers: { Authorization: `Bearer ${token}` }});