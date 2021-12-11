import axios from "axios";

export const axiosInstance = axios.create({
  baseUrl: "https://travgenda.herokuapp.com/",
});
