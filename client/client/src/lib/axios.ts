import axios from "axios";

const BASE_URL = "http://localhost:8000/";
export default axios.create({
  baseURL: BASE_URL,
});
