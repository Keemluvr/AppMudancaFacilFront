import axios from "axios";

const api = axios.create({
  baseURL: "https://mudanca-facil-back-end.herokuapp.com"
});

export default api;
