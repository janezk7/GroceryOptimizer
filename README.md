# Groceries optimizer
Date: november 2024

**Features:**
- Intuitivelly note down the price of common everyday items in a shop. 
- Note price: item, brand (optional), price per unit, shop, size package (optional), total price (optional)
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

**App layout:**
- Login
- (tabs)
    - Home 
        - Items shortcuts 
        - (+) hero button to add new
    - Shop run
        - Choose items to add to cart (see all functionalities)
    - Profile
        - Settings
        - Logout
