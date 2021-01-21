import axios from "axios";

const api = axios.create({
  baseURL: "https://teste-mf.herokuapp.com"
});

export default api;
