import { Article, ArticleShopPricing, Shop } from "../../models/DbEntities";
import { IApiService } from "../apiService";
import { getMockArticles, getMockArticleShopPricings, getMockShops } from "./mockData";

const fetchWaitTIme = 1000;

export class MockApiService implements IApiService {
  async fetchArticleDetails(articleId: number): Promise<Article> {
    await new Promise((resolve) => setTimeout(resolve, fetchWaitTIme));
    return getMockArticles(1)[0];
  }
  async fetchArticlePricings(articleId: number): Promise<ArticleShopPricing[]> {
    await new Promise((resolve) => setTimeout(resolve, fetchWaitTIme));
    return getMockArticleShopPricings();
  }
  async fetchShops(): Promise<Shop[]> {
    await new Promise((resolve) => setTimeout(resolve, fetchWaitTIme));
    return getMockShops();
  }
  async fetchArticles(): Promise<Article[]> {
    await new Promise((resolve) => setTimeout(resolve, fetchWaitTIme));
    return getMockArticles(20);
  }
}
