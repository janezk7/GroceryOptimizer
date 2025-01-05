import { create, ApiResponse, ApisauceInstance } from "apisauce";
import { Article, ArticleShopPricing, Shop } from "../models/DbEntities";
import { AppConfig } from "../config";

export interface IApiService {
  fetchArticles(): Promise<Article[]>;
  fetchArticleDetails(articleId: number): Promise<Article>;
  fetchArticlePricings(articleId: number): Promise<ArticleShopPricing[]>;
  fetchShops(): Promise<Shop[]>;
  updateArticleShopPricing(
    shopId: number,
    pricePerUnit: number
  ): Promise<boolean>;
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
      const token = localStorage.getItem("token"); // Replace with your token retrieval method
      if (token) {
        if (!request.headers) request.headers = {};
        request.headers.Authorization = `Bearer ${token}`;
      }
    });
  }

  async fetchArticles(): Promise<Article[]> {
    const response = await this.api.get<Article[]>("/Article");
    console.log("Response:", response);

    if (response.ok && response.data) {
      return response.data;
    } else {
      throw new Error(response.problem || "Failed to fetch articles");
    }
  }

  async fetchArticleDetails(articleId: number): Promise<Article> {
    const response = await this.api.get<Article>("/ArticleDetails", {
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
      "/ArticlePricings",
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
    const response = await this.api.get<Shop[]>("/shops");

    console.log("Response:", response);
    if (response.ok && response.data) {
      return response.data;
    } else {
      throw new Error(response.problem || "Failed to fetch shops");
    }
  }

  async updateArticleShopPricing(
    shopId: number,
    pricePerUnit: number
  ): Promise<boolean> {
    const response = await this.api.post("/UpdateArticleShopPricing", {
      shopId,
      pricePerUnit,
    });

    console.log("Response:", response);
    return response.ok;
  }
}
