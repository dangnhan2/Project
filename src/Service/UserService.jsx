import axios from "./Customize-axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};
const postCreateUse = (name, job) => {
  return axios.post("/api/users", { name: name, job: job });
};

const updateUser = (name, job) => {
  return axios.put("/api/users/", { name: name, job: job });
};

const deleteUser = (id) => {
  return axios.delete("/api/users/", { id: id });
};

const loginApi = (email, password) => {
  return axios.post("/api/login", { email: email, password: password });
};
export { fetchAllUser, postCreateUse, updateUser, deleteUser, loginApi };
