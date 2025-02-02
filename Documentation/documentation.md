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

**Features:**
- inspired by `Bring`
- 3 tab layout

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

## Azure deploy

**Deploy troubleshooting:**
- Can't download publishing profile (basic auth not enabled)
    - ➡️ `Settings -> Configuration`
        - enable `SCM Basic Auth Publishing` in `FTP Basic Auth Publishing`
        - stop app, restart. 
        - click "download publishing profile" again.
- "could not be reached, check if deploy is installed, error_host_unreachable" ali kaj podobnega
    - ➡️ v `Settings -> Environment variables` Dodaj:
        - `WEBSITE_WEBDEPLOY_USE_SCM=false`
- Db calls don't work when deployed on azure
    - ➡️ check `Settings -> Networking -> Allow public access from any Azure service within Azure to this server`
- Github CI/CD Action for Static Web App fails on push with error "The engine "node" is incompatible with this module. Expected version ">=20.0.0". Got "18.20.5"
    1. Added `.nvmrc` with `v20.18.1` -> Didn't work ❌
    2. Added a node version step to azure CI CD .yaml -> Didn't work ❌
    ```yaml
    - name: Set up Node.js
        uses: actions/setup-node@v2
        with:
          node-version: '20.18.1' 
    ```
    3. Added engines node version in `package.json` -> Worked ✅
    ```json
    "engines": {
        "node": ">=20.18.1"
    },
    ```
- Github CI/CD Action for Static Web App fails on push with error "Treating warnings as errors because process.env.CI = true." and error "Oryx has failed to build the solution."
    - Set `CI = false` in build script
```json
"build": "CI=false && react-scripts build",
```