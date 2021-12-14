import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://travgenda.herokuapp.com/",
});
