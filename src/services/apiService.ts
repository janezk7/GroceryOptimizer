import { create, ApiResponse, ApisauceInstance } from "apisauce";
import { Article, ArticleShopPricing, PriceUnit, Shop } from "../models/DbEntities";
import { AppConfig } from "../config";
import { TOKEN_LOCALSTORAGE_KEY } from "./authService";
import useAuthStore from "../store/useAuthStore";

export interface IApiService {
  fetchArticles(): Promise<Article[]>;
  fetchArticleDetails(articleId: number): Promise<Article>;
  fetchArticlePricings(articleId: number): Promise<ArticleShopPricing[]>;
  fetchShops(): Promise<Shop[]>;
  fetchPriceUnits(): Promise<PriceUnit[]>;
  createArticle(name: string, priceUnitId: number, note: string): Promise<ApiResponse<number, string>>;
  addArticleShopPricing(
    articleId: number,
    shopId: number,
    pricePerUnit: number
  ): Promise<ApiResponse<string>>;
  updateArticleShopPricing(
    articleId: number,
    shopId: number,
    pricePerUnit: number
  ): Promise<ApiResponse<string>>;
}

export class ApiService implements IApiService {
  api: ApisauceInstance;

  constructor() {
    this.api = create({
      baseURL: AppConfig.BASE_API_URL,
      timeout: 10000, // 10 seconds timeout
      headers: {
        Accept: "application/json",
      },
    });

    this.api.addRequestTransform((request) => {
      const token = useAuthStore.getState().getToken();
      if (token) {
        if (!request.headers) request.headers = {};
        request.headers.Authorization = `Bearer ${token}`;
      }
    });
  }

  async fetchArticles(): Promise<Article[]> {
    const response = await this.api.get<Article[]>("/Article/Articles");
    console.log("Response:", response);

    if (response.ok && response.data) {
      return response.data;
    } else {
      throw new Error(response.problem || "Failed to fetch articles");
    }
  }

  async fetchArticleDetails(articleId: number): Promise<Article> {
    const response = await this.api.get<Article>("/Article/ArticleDetails", {
      articleId: articleId,
    });

    console.log("Response:", response);
    if (response.ok && response.data) {
      return response.data;
    } else {
      throw new Error(response.problem || "Failed to fetch article");
    }
  }

  async fetchArticlePricings(articleId: number): Promise<ArticleShopPricing[]> {
    const response = await this.api.get<ArticleShopPricing[]>(
      "/Article/LatestArticlePricing",
      {
        articleId: articleId,
      }
    );

    console.log("Response:", response);
    if (response.ok && response.data) {
      return response.data;
    } else {
      throw new Error(
        response.problem || "Failed to fetch article shop pricings"
      );
    }
  }

  async fetchShops(): Promise<Shop[]> {
    const response = await this.api.get<Shop[]>("/Shop/Shops");

    console.log("Response:", response);
    if (response.ok && response.data) {
      return response.data;
    } else {
      throw new Error(response.problem || "Failed to fetch shops");
    }
  }

  async fetchPriceUnits(): Promise<PriceUnit[]> {
    const response = await this.api.get<PriceUnit[]>("/Article/PriceUnits");
    console.log("Response:", response);
    if (response.ok && response.data) {
      return response.data;
    } else {
      throw new Error(response.problem || "Failed to fetch price units");
    }
  }


  async createArticle(name: string, priceUnitId: number, note: string): Promise<ApiResponse<number, string>> {
    const response = await this.api.post<number, string>(
      "/Article/Create",
      {
        name,
        priceUnitId,
        note,
      }
    );

    console.log("Response:", response);
    return response;
  }

  async addArticleShopPricing(
    articleId: number,
    shopId: number,
    pricePerUnit: number
  ): Promise<ApiResponse<string>> {
    const response = await this.api.post<string>(
      "/Article/AddArticleShopPricing",
      {
        articleId,
        shopId,
        pricePerUnit,
      }
    );

    console.log("Response:", response);
    return response;
  }

  async updateArticleShopPricing(
    articleId: number,
    shopId: number,
    pricePerUnit: number
  ): Promise<ApiResponse<string>> {
    const response = await this.api.post<string>(
      "/Article/UpdateArticleShopPricing",
      {
        articleId,
        shopId,
        pricePerUnit,
      }
    );

    console.log("Response:", response);
    return response;
  }
}
