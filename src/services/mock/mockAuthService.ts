import { IAuthService, LOGGEDUSER_LOCALSTORAGE_KEY, TOKEN_LOCALSTORAGE_KEY } from "../authService";

export class MockAuthService implements IAuthService {
  async login(username: string, password: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    localStorage.setItem(TOKEN_LOCALSTORAGE_KEY, "MOCK_TOKEN");
  }
  logout(): void {
    localStorage.removeItem(TOKEN_LOCALSTORAGE_KEY);
  }
  getToken(): string | null {
    return localStorage.getItem(TOKEN_LOCALSTORAGE_KEY);
  }

  getLoggedUser(): string | null {
    return localStorage.getItem(LOGGEDUSER_LOCALSTORAGE_KEY);
  }
}
