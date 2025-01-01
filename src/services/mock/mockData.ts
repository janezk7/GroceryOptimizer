import { Article } from "../../models/DbEntities";

const mockArticles10: Article[] = [
  {
    id: 1,
    userId: 101,
    name: "Mock Article 1",
    note: "This is a note for Mock Article 1",
  },
  {
    id: 2,
    userId: 102,
    name: "Mock Article 2",
    note: "This is a note for Mock Article 2",
  },
  {
    id: 3,
    userId: 103,
    name: "Mock Article 3",
    note: null, // Example of a nullable note
  },
  {
    id: 4,
    userId: 104,
    name: "Mock Article 4",
    note: "This is a note for Mock Article 4",
  },
  {
    id: 5,
    userId: 105,
    name: "Mock Article 5",
    note: "This is a note for Mock Article 5",
  },
  {
    id: 6,
    userId: 106,
    name: "Mock Article 6",
    note: "This is a note for Mock Article 6",
  },
  {
    id: 7,
    userId: 107,
    name: "Mock Article 7",
    note: null, // Another nullable note
  },
  {
    id: 8,
    userId: 108,
    name: "Mock Article 8",
    note: "This is a note for Mock Article 8",
  },
  {
    id: 9,
    userId: 109,
    name: "Mock Article 9",
    note: "This is a note for Mock Article 9",
  },
  {
    id: 10,
    userId: 110,
    name: "Mock Article 10",
    note: "This is a note for Mock Article 10",
  },
];

function getMockArticles(n: number) {
  let items: Article[] = [];
  for (let i = 0; i < n; i++) {
    items.push({
      id: i+1,
      userId: 110,
      name: "Mock Article " + (i + 1),
      note: "This is a note for Mock Article " + (i + 1),
    })
  }

  return items;
}

export { mockArticles10, getMockArticles };
