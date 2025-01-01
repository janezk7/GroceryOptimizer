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
  }
  

export class AuthService implements IAuthService {
    private readonly tokenKey = "auth_token";
  
    async login(username: string, password: string): Promise<void> {
      try {
        const response = await fetch("https://your-api-endpoint.com/api/auth/login", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (!response.ok) {
          throw new Error("Failed to log in. Please check your credentials.");
        }
  
        const data = await response.json();
  
        // Assuming the token is returned as a property in the response
        const token = data.token;
  
        if (!token) {
          throw new Error("Token not provided in response.");
        }
  
        // Store the token in localStorage
        localStorage.setItem(this.tokenKey, token);
      } catch (error) {
        throw error; // Re-throw the error to handle it in the caller
      }
    }
  
    logout(): void {
      localStorage.removeItem(this.tokenKey);
    }
  
    getToken(): string | null {
      return localStorage.getItem(this.tokenKey);
    }
  }
  