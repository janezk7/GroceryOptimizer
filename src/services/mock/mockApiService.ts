import { Article } from "../../models/DbEntities";
import { IApiService } from "../apiService";
import { getMockArticles } from "./mockData";

export class MockApiService implements IApiService {
  async fetchArticles(): Promise<Article[]> {
    return getMockArticles(20);
  }
}
