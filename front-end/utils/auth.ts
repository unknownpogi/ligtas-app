import { storage } from "./storage";

export const authStorage = {
  setToken: (token: string) => storage.set("token", token),
  getToken: () => storage.get("token"),
  removeToken: () => storage.remove("token"),
};

export const userStorage = {
  setUser: (user: any) => storage.set("user", user),
  getUser: () => storage.get("user"),
  removeUser: () => storage.remove("user"),
};
