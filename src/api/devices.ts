import axios from "axios";

export default axios.create({
  baseURL: "https://api.onecta.daikineurope.com/mock/v1/",
  headers: {
    Accept: "application/json",
  },
});
