import { ApiResponse } from "apisauce";
import { Article, ArticleStorePricing, PriceUnit, ShoppingStore } from "../../models/DbEntities";
import { IApiService } from "../apiService";
import {
  getMockArticles,
  getMockArticleShopPricings,
  getMockShops,
  getMockUnits,
} from "./mockData";

const fetchWaitTIme = 500;

const mockOriginalError = {
  config: {},
  isAxiosError: false,
  name: "",
  message: "[MOCK] Operation failed. Please try again later",
  toJSON: () => Object,
};

const mockApiResponseSuccess: ApiResponse<string> = {
  ok: true,
  problem: null,
  originalError: null,
};

const mockApiResponseFailure: ApiResponse<string> = {
  ok: false,
  problem: "SERVER_ERROR",
  originalError: mockOriginalError,
  data: "mock data",
};

export class MockApiService implements IApiService {
  async fetchPriceUnits(): Promise<PriceUnit[]> {
    await new Promise((resolve) => setTimeout(resolve, fetchWaitTIme));
    return getMockUnits();
  }
  async createArticle(name: string, priceUnitId: number, note: string): Promise<ApiResponse<number, string>> {
    await new Promise((resolve) => setTimeout(resolve, fetchWaitTIme));
    return mockApiResponseSuccess as ApiResponse<number, string>;
  }
  async fetchArticleDetails(articleId: number): Promise<Article> {
    await new Promise((resolve) => setTimeout(resolve, fetchWaitTIme));
    return getMockArticles(1)[0];
  }
  async fetchArticlePricings(articleId: number): Promise<ArticleStorePricing[]> {
    await new Promise((resolve) => setTimeout(resolve, fetchWaitTIme));
    return getMockArticleShopPricings();
  }
  async fetchShoppingStores(): Promise<ShoppingStore[]> {
    await new Promise((resolve) => setTimeout(resolve, fetchWaitTIme));
    return getMockShops();
  }
  async fetchArticles(): Promise<Article[]> {
    await new Promise((resolve) => setTimeout(resolve, fetchWaitTIme));
    return getMockArticles(20);
  }

  async addArticleShopPricing(
    articleId: number,
    shopId: number,
    pricePerUnit: number
  ): Promise<ApiResponse<string>> {
    console.log("Adding pricing");
    await new Promise((resolve) => setTimeout(resolve, fetchWaitTIme));
    const response = mockApiResponseSuccess;
    // const response = mockApiResponseFailure;
    return response;
  }

  async updateArticleShopPricing(
    articleId: number,
    shopId: number,
    pricePerUnit: number
  ): Promise<ApiResponse<string>> {
    console.log("Updating pricing");
    await new Promise((resolve) => setTimeout(resolve, fetchWaitTIme));
    const response = mockApiResponseSuccess;
    // const response = mockApiResponseFailure;
    return response;
  }
}
