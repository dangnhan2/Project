import axios from "./Customize-axios";

const fetchAllUser = (page) => {
  return axios.get(`/api/users?page=${page}`);
};
const postCreateUse = (name, job) => {
  return axios.post("/api/users", { name: name, job: job });
};
export { fetchAllUser, postCreateUse };
