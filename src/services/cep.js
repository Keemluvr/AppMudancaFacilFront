import axios from "axios"

const apiCEP = axios.create({
  baseURL: "https://viacep.com.br/ws"
})

export const getLocationByCEP = cep => apiCEP.get(`/${cep}/json/`)
