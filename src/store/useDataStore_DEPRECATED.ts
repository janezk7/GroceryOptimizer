// import { create } from "zustand";
// import {
//   Article,
//   ArticleStorePricing,
//   ShoppingStore,
// } from "../models/DbEntities";
// import { apiService } from "../services/apiServiceFactory";

// interface DataStore {
//   shoppingStoresCache: ShoppingStore[] | undefined;
//   articleCache: Article | undefined;
//   articlesCache: Article[] | undefined;
//   articlePricingsCache:
//     | { articleId: number; pricings: ArticleStorePricing[] }
//     | undefined;
//   clearCache: () => void;
//   getOrLoadShoppingStores: () => Promise<ShoppingStore[]>;
//   getOrLoadArticle: (id: number) => Promise<Article>;
//   getOrLoadArticles: () => Promise<Article[]>;
//   getOrLoadArticlePricings: (
//     articleId: number
//   ) => Promise<ArticleStorePricing[]>;
// }

// const useDataStore = create<DataStore>((set, get) => ({
//   shoppingStoresCache: undefined,
//   articleCache: undefined,
//   articlesCache: undefined,
//   articlePricingsCache: undefined,
//   clearCache: () => {
//     set({
//       shoppingStoresCache: undefined,
//       articlesCache: undefined,
//       articlePricingsCache: undefined,
//     });
//   },
//   getOrLoadShoppingStores: async () => {
//     const response = await apiService.fetchShoppingStores();
//     if (!response.ok) throw new Error(response.problem);
//     set({ shoppingStoresCache: response.data });
    
//   },
//   getOrLoadArticle: (id:number) => {
//     return undefined;
//   },
//   getOrLoadArticles: () => {},
//   getOrLoadArticlePricings: (articleId: number) => {},
// }));

// export default useDataStore;
export {};