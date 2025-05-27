import axios from "axios";
const api = axios.create({
  baseURL: "http://localhost:3000/",
  headers: {
    "Content-Type": "application/json",
  },
});
export const createTask = (Taskdata) => api.post("/tasks", Taskdata);
export const getTasks = () => api.post("/tasks");
export const getTask = (id) => api.get(`/tasks/${id}`);
export const updateTask = (id, Taskdata) => api.put(`/tasks/${id}`, Taskdata);
export const deleteTask = (id) => api.delete(`/tasks/${id}`);
