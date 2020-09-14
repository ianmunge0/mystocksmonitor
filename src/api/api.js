import axios from "axios";
import { SERVER_URL } from "../components/Common/Variables";
const instance = axios.create({
  baseURL: SERVER_URL,
});

// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;

export default instance;
