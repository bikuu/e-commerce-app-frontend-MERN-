import axios from "axios";

const API = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
});

API.interceptors.request.use((req) => {
  if (localStorage.getItem("access_token")) {
    req.headers.Authorization = `Bearer ${JSON.parse(
      localStorage.getItem("access_token")
    )}`;
  }

  return req;
});

export const logIn = (data) => API.post("/users/login", data);

export const signUp = (data) => API.post("/users/signup", data);

export const getUser = () => API.get(`/users/get-user`);

export const uploadProductImage = (data) => API.post("/upload", data);

export const getAllProducts = () => API.get("/products");
export const getProduct = (id) => API.get(`/products/${id}`);
export const deleteProduct = (id) => API.delete(`/products/${id}`);
export const updateProduct = (id, data) =>
  API.put(`/products/review/${id}`,data);
export const uploadProducts = (data) => API.post("/products", data);

export const getAllOrders = () => API.get("/orders");
export const postOrders = (data) => API.post("/orders", data);
export const getOrder = (id) => API.get(`/orders/${id}`);
