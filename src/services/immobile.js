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
