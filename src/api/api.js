import axios from "axios";

const instance = axios.create({
  baseURL: "https://remotepaywallet.com/public/stockapi",
});

// axios.defaults.headers.post["Content-Type"] = "application/json";
// axios.defaults.withCredentials = true;
// axios.defaults.crossDomain = true;

export default instance;
