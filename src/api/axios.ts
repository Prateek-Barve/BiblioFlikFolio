import axios from "axios";

const api = axios.create({
  baseURL: "https://mediallog-febcdaa6fjgdhkfh.centralindia-01.azurewebsites.net/api",
});

export default api;