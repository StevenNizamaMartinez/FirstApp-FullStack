import axios from "axios"

const app = axios.create({
  baseURL: "https://stevennizama.onrender.com/api/v1",
  withCredentials: true,
})

app.interceptors.request.use(config => {
  // agregar encabezados a la solicitud
  config.headers = {
    'Content-Type': 'application/json',
    'SameSite': 'none'
  };
  return config;
});

export default app