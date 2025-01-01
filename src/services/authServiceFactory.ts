import { AuthService, IAuthService } from "./authService";
import { MockAuthService } from "./mock/mockAuthService";

export class AuthServiceFactory {
  static createAuthService(): IAuthService {
    // const authService = new AuthService;
    const authService = new MockAuthService;
    return authService;
  }
}

export const authService = AuthServiceFactory.createAuthService();