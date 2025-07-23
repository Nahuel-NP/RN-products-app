import axios from "axios";
//TODO: conectar mediante envs vars, android  e Ios

const productsApi = axios.create({
  baseURL: "http://localhost:3000/api",
});

//TODO: interceptores
export { productsApi };

