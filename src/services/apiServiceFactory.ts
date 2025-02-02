import { ApiService, IApiService } from "./apiService";
import { MockApiService } from "./mock/mockApiService";

export class ApiServiceFactory {
  static createApiService(): IApiService {
    const apiService = new ApiService;
    //const apiService = new MockApiService;
    return apiService;
  }
}

export const apiService = ApiServiceFactory.createApiService();