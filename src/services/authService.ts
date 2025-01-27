import { ApisauceInstance, create } from "apisauce";
import { AppConfig } from "../config";

export interface IAuthService {
  /**
   * Logs in the user by sending username and password to the API and stores the JWT token in localStorage.
   * @param username - The username of the user.
   * @param password - The password of the user.
   * @returns A promise that resolves when the token is successfully stored.
   */
  login(username: string, password: string): Promise<void>;

  /**
   * Logs out the user by removing the JWT token from localStorage.
   */
  logout(): void;

  /**
   * Retrieves the current JWT token from localStorage.
   * @returns The token string or null if no token is stored.
   */
  getToken(): string | null;

  /**
   * Retrieves the current logged-in user from localstorage
   * @returns The username or null
   */
  getLoggedUser(): string | null;
}

interface ILoginResponse {
  name: string;
  token: string;
  expiration: Date;
}

export const TOKEN_LOCALSTORAGE_KEY = "auth_token";
export const LOGGEDUSER_LOCALSTORAGE_KEY = "logged_user";

export class AuthService implements IAuthService {
  api: ApisauceInstance;

  constructor() {
    this.api = create({
      baseURL: AppConfig.BASE_API_URL,
      timeout: 10000, // 10 seconds timeout
      headers: {
        Accept: "application/json",
      },
    });
  }

  async login(username: string, password: string): Promise<void> {
    try {
      const body = JSON.stringify({
        username: username,
        password: password,
      });
      const response = await this.api.post<ILoginResponse>("/auth/login", body);
      console.log(response);

      if (!response.ok) {
        throw new Error(
          `Failed to log in. Please check your credentials: ${response.problem} (${response.status})`
        );
      }

      // Assuming the token is returned as a property in the response
      const token = response.data?.token;
      const name = response.data?.name;

      if (!token || !name) {
        throw new Error("Token or name not provided in response.");
      }

      // Store the token in localStorage
      localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, token);
      localStorage.setItem(LOGGEDUSER_LOCALSTORAGE_KEY, name);
    } catch (error) {
      throw error;
    }
  }

  logout(): void {
    localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
    localStorage.removeItem(LOGGEDUSER_LOCALSTORAGE_KEY);
  }

  getToken(): string | null {
    return localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
  }

  getLoggedUser(): string | null {
    return localStorage.getItem(LOGGEDUSER_LOCALSTORAGE_KEY);
  }
}
