# Groceries optimizer
**25.11.2024**

**Description:**
- Helper app to help you track and note best grocery prices across different stores
- Create and analyze shopping list. Show optimal shopping runs
- Sync and share your shopping list with your loved one. 
- Inspired by `Bring`

**Features:** 
- Dashboard with recent items to update. 
    - Filter or search for item to find it quicker. 
- Add new items, update latest item pricings for differente stores
- Create shopping list
    - Tap existing items to buy
    - Set quantity (optional, but will produce better results) 
- 1-store-run optimization: 
    - Analyze shopping list item prices and get optimized list for cheapest store to go to for your whole list
    - Visualize loss when the store is non-optimal for a specific item 
- 2-store-run optimization (advanced): Get an ever cheaper run by doing 2-store run optimization. Result is two lists with two sets of items for two stores that will yield best price
- Show best store for each item (and price differences)
- Analytics:
    - How much will you gain by going to 2 stores instead of 1
    - Strict optimization and lean optimization allows for some head room when selecting an optimal store. Example: allow unoptimal item/store set when the total price difference is below a threshold (e.g.: few cents) 
    - Detailed list of best shop for every item on list. Remove or save some items for later, if it means you can do your run faster or visit less shops.  

**Stack**
- Backend: .NET Core web API
- Auth: jwt token authorization
- Database: PostgreSQL
- Frontend: React Web app. 
- Hosting: Azure ops

## Interface

**Layout:**
- ✅Login
- (tabs)
    - ✅ Home (Artikli)
        - ✅ Items shortcuts 
        - ✅ (+) hero button to add new
    - Shop run (CEH)
        - ➡️ Choose items to add to cart (see all functionalities)
    - Profile
        - Settings
        - ✅ Logout
- ProductDetailsScreen
    - ✅ Add/Update pricings
    - ✅ Update product

### ✅ Artikli tab
- products grid screen with most recent items to update
- "+" hero button everywhere to add new pricing 
    - Opens `New product entry screen`
- "Click on item" to update
    - Opens `Product Details screen`

**✅Product Details screen**:
- Screen with product info and different pricings for shops
    - Highlighted cheapest
- Section to update/add new shop pricing for article
    - Select shop (dropdown) and enter price
    - Automatically toggles button to add new or update (if selected shop already has pricing)

**✅New product entry screen**:
- Enter name
- Select unit (g, kg, l, kos)
- `Add new product` button

### Ceh tab

**Novi ceh button**:
- Izbira artiklov
- Analyze button
- show best shop for ONE shop run, show best shop for TWO shop run, show best shop for each item (and for how much)

**Current session** section: 
- Trnutno izbrani izdelki za ceh, kot bring.

### Profil tab
- Settings in profile info
- ✅ Logout