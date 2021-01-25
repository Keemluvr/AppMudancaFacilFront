import api from "./api";

export const listProperties = ({ search, filter }) => {
  return search && filter
    ? api.get("/properties", {
        params: {
          search,
          filter,
        },
      })
    : api.get("/properties");
};

export const listPropertiesByOwner = ownerId => api.get(`/immobile/owner/${ownerId}`);

export const listImmobileById = immobileId => api.get(`/immobile/${immobileId}`);