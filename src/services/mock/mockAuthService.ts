import { IAuthService } from "../authService";

export class MockAuthService implements IAuthService {
  private readonly tokenKey = "auth_token";

  async login(username: string, password: string): Promise<void> {
    await new Promise((resolve) => setTimeout(resolve, 1000));
    localStorage.setItem(this.tokenKey, "MOCK_TOKEN");
  }
  logout(): void {
    localStorage.removeItem(this.tokenKey);
  }
  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }
}
