import {
  Article,
  ArticleStorePricing,
  ShoppingStore,
  PriceUnit,
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
      priceUnitId: 1,
      priceUnitName: 'kg'
    });
  }

  return items;
}

function getMockShops() {
  let shops: ShoppingStore[] = [
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
  let pricings: ArticleStorePricing[] = [];
  for (let i = 0; i < shops.length - 1; i++) { // Note: -1 is so we can test adding non-existing shop pricing
    pricings.push({
      id: 12,
      articleId: 99,
      shopId: shops[i].id,
      shopName: shops[i].name,
      pricePerUnit: getRandomNumberTwoFixed(0.7, 2.1),
      priceUnitName: "kilogram",
      priceUnitNameShort: "kg",
      dateInserted: new Date(),
      priceUnitId: 99,
    });
  }
  return pricings;
}

function getMockUnits() {
  let units: PriceUnit[] = [
    {
      id: 0,
      unitName: "gram",
      shortName: "g",
    },
    {
      id: 1,
      unitName: "kilogram",
      shortName: "kg",
    },
    {
      id: 2,
      unitName: "liter",
      shortName: "l",
    },
    {
      id: 3,
      unitName: "kos",
      shortName: "kos",
    },
  ];

  return units;
}

export { getMockArticles, getMockShops, getMockArticleShopPricings, getMockUnits };
