# Groceries optimizer

**Dostopi:**
- Username: `testuser`
- Email: `user@test.com`
- Password: `User1234!`

**Idea:**
- Pitch: Optimize grocery shopping, the easy way
- Features: 
    - Intuitivelly note down the price of common everyday items in a shop. 
    - Note: item, brand (optional), price per unit, shop, size package (optional), total price (optional)
    - Update the price: 
- Analitics:
    - Best shop for your items 
    - Custom run: pick items to buy today, shows best value shop 
- Interface:
    - "+" hero button to add new pricing 
    - products grid screen with most recent items to update 
    - "my next shopping run": tap items to buy, show best shop for ONE shop run, show best shop for TWO shop run, show best shop for each item (and for how much)
        // Delnice style seznam, če shop ni najbolši za nek item, pokaži kolk zadi je za cheapest.

**Stack**
- Backend: .netcore app at first
- Auth: jwt token authorization
- Frontend: React Web app. 

## Interface

**Layout:**
- Login
- (tabs)
    - Home (Artikli)
        - Items shortcuts 
        - (+) hero button to add new
    - Shop run (CEH)
        - Choose items to add to cart (see all functionalities)
    - Profile
        - Settings
        - Logout
- ProductDetailsScreen
    - Add/Update pricings
    - Update product

**Features:**
- inspired by `Bring`
- 3 tab layout

### Artikli tab
- products grid screen with most recent items to update
- "+" hero button everywhere to add new pricing 
    - Opens `New product entry screen`
- "Click on item" to update
    - Opens `Product Details screen`

**Product Details screen**:
- Screen with product info and different pricings for shops
    - Highlighted cheapest
- Section to update/add new shop pricing for article
    - Select shop (dropdown) and enter price
    - Automatically toggles button to add new or update (if selected shop already has pricing)

**New product entry screen**:
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

## Database

**User**
- Id
- Name

**Article**
- Id: int
- UserId: int
- Name: string
- Note: string

**Shop**
- Id: int
- Name: string
- Note: string

**ArticleShopPricing**
- ArticleId: int
- ShopId: int
- PricePerUnit: decimal
- UnitId: id

**Unit**
- Id: int
- UnitName: string

## Icons
- https://mui.com/material-ui/material-icons/
```ts
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
```