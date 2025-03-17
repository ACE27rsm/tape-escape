import axios from "axios";

/// * config
import config from "../config";

const myAxios = axios.create({
  baseURL: config.apiURL,
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true,
});

export default myAxios;
