interface User {
  id: number,
  name: string,
}

interface Article {
  id: number;
  addedByUserId: number;

  addedByUserName: string;
  name: string;
  note: string | undefined;
}

interface Shop {
  id: number,
  name: string,
  note?: string | undefined,
}

interface ArticleShopPricing {
  articleId: number,
  shopId: number,

  shopName: string,
  pricePerUnit: number,
  unitName: string
}

interface Unit {
  id: number,
  name: string,
  shortName: string,
}

export type { User, Article, Shop, ArticleShopPricing, Unit };
