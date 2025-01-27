import { create } from "zustand";
import { authService } from "../services/authServiceFactory";

interface AuthStore {
  token: string | null;
  loggedUser: string | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
  getToken: () => string | null;
  getLoggedUser: () => string | null;
  isAuthenticated: () => boolean;
}

const useAuthStore = create<AuthStore>((set, get) => ({
  token: authService.getToken(),
  loggedUser: authService.getLoggedUser(),

  login: async (username, password) => {
    await authService.login(username, password);
    const token = authService.getToken();
    const loggedUser = authService.getLoggedUser();
    set({ token: token, loggedUser: loggedUser });
  },

  logout: () => {
    authService.logout();
    set({ token: null, loggedUser: null });
  },

  getToken: () => authService.getToken(),
  getLoggedUser: () => authService.getLoggedUser(),
  isAuthenticated: () => {
    const isAuthenticated = get().token != null;
    return isAuthenticated;
  },
}));

export default useAuthStore;
