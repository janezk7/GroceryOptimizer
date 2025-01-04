import "./App.css";
import {
  BrowserRouter,
  Link,
  Route,
  Router,
  Routes,
  useNavigate,
} from "react-router-dom";
import ItemsScreen from "./screens/(tabs)/ItemsScreen";
import ShopScreen from "./screens/(tabs)/ShopScreen";
import ProfileScreen from "./screens/(tabs)/ProfileScreen";
import ArticleDetails from "./screens/ArticleDetails";

import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import FaceIcon from "@mui/icons-material/Face";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BottomNavigation, BottomNavigationAction, Box } from "@mui/material";
import { useEffect, useState } from "react";

function TabLink({
  to,
  children,
  location,
}: {
  to: string;
  children: any;
  location: any;
}) {
  const isActive = location.pathname === to;

  return (
    <Link to={to} className={`tab-link ${isActive ? "active" : ""}`}>
      {children}
    </Link>
  );
}

function App() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);

  useEffect(() => {
    console.log("Navigating to home.");
    navigate('./items')
  }, [])

  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/items" Component={ItemsScreen} />
          <Route path="/shop" Component={ShopScreen} />
          <Route path="/profile" Component={ProfileScreen} />
          <Route path="/articleDetails/:id" Component={ArticleDetails} />
        </Routes>
      </div>

      <Box className="bottom-navigation">
        <BottomNavigation
          showLabels
          value={value}
          onChange={(ev, newValue) => {
            setValue(newValue);
            console.log(newValue);
            switch (newValue) {
              case 0:
                console.log("Navigating home!");
                navigate("/items");
                break;
              case 1:
                navigate("/shop");
                break;
              case 2:
                navigate("/profile");
                break;
            }
          }}
        >
          <BottomNavigationAction label="Artikli" icon={<BakeryDiningIcon />} />
          <BottomNavigationAction label="Ceh" icon={<ShoppingCartIcon />} />
          <BottomNavigationAction label="Profil" icon={<FaceIcon />} />
        </BottomNavigation>
      </Box>

      {/* <div className="tabs">
        <TabLink to="/items" location={location}>
          <div className="tabIcon">🍌</div>
          <div>Artikli</div>
        </TabLink>
        <TabLink to="/shop" location={location}>
          <div className="tabIcon">🛒</div>
          <div>Céh</div>
        </TabLink>
        <TabLink to="/profile" location={location}>
          <div className="tabIcon">😄</div>
          <div>Profil</div>
        </TabLink>
      </div> */}
    </div>
  );
}

export default App;
