interface User {
  id: number,
  name: string,
}

interface Article {
  id: number;
  addedByUserId: number;
  priceUnitId: number;
  name: string;
  note: string | undefined;

  addedByUserName: string;
  priceUnitName: string;
}

interface Shop {
  id: number,
  name: string,
  note?: string | undefined,
}

interface ArticleShopPricing {
  id: number,
  articleId: number,
  shopId: number,
  pricePerUnit: number,
  shopName: string,
  priceUnitId: number | undefined,
  priceUnitName: string
  priceUnitNameShort: string
  dateInserted: Date | undefined,
}

interface PriceUnit {
  id: number,
  unitName: string,
  shortName: string,
}

export type { User, Article, Shop, ArticleShopPricing, PriceUnit };
