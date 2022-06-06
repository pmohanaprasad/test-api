import axios from "axios";

const client = axios.create({
  baseURL: "https://reqres.in/api/users",
});

export default client;
