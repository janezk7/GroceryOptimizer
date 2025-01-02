import {
  Article,
  ArticleShopPricing,
  Shop,
  Unit,
} from "../../models/DbEntities";
import { getRandomNumberTwoFixed } from "../../util/utilMethods";

function getMockArticles(n: number) {
  let items: Article[] = [];
  for (let i = 0; i < n; i++) {
    items.push({
      id: i + 1,
      addedByUserId: 110,
      addedByUserName: "Janez",
      name: "Mock Article " + (i + 1),
      note: "This is a note for Mock Article " + (i + 1),
    });
  }

  return items;
}

function getMockShops() {
  let shops: Shop[] = [
    {
      id: 0,
      name: "spar",
    },
    {
      id: 0,
      name: "hofer",
    },
    {
      id: 0,
      name: "lidl",
    },
    {
      id: 0,
      name: "merkator",
    },
  ];

  return shops;
}

function getMockArticleShopPricings() {
  let shops = getMockShops();
  let pricings: ArticleShopPricing[] = [];
  for (let i = 0; i < shops.length; i++) {
    pricings.push({
      articleId: 99,
      shopId: shops[i].id,
      shopName: shops[i].name,
      pricePerUnit: getRandomNumberTwoFixed(0.7, 2.1),
      unitName: "kg",
    });
  }
  return pricings;
}

function getMockUnits() {
  let units: Unit[] = [
    {
      id: 0,
      name: "gram",
      shortName: "g",
    },
    {
      id: 1,
      name: "kilogram",
      shortName: "kg",
    },
    {
      id: 2,
      name: "liter",
      shortName: "l",
    },
    {
      id: 3,
      name: "kos",
      shortName: "kos",
    },
  ];

  return units;
}

export { getMockArticles, getMockShops, getMockArticleShopPricings, getMockUnits };
