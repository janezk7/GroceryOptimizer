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
import ArticleCreate from "./screens/ArticleCreate";
import ArticleDetails from "./screens/ArticleDetails";

import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import FaceIcon from "@mui/icons-material/Face";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import { BottomNavigation, BottomNavigationAction, Box, Snackbar } from "@mui/material";
import { useEffect, useState } from "react";
import useAuthStore from "./store/useAuthStore";
import LoginScreen from "./screens/(auth)/Login";
import useToast from "./hooks/useToast";

function App() {
  const navigate = useNavigate();
  const [value, setValue] = useState(0);
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)();
  const token = useAuthStore((state) => state.token);
  const loggedUser = useAuthStore(state => state.loggedUser);

  const loginToast = useToast();

  useEffect(() => {
    if (isAuthenticated) {
      console.log("Navigating to home.");
      navigate("./items");
      loginToast.show();
      return;
    }
    console.log("Not logged in. Navigating to login...");
    navigate("./login");
  }, [token]);

  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          {!isAuthenticated && (
            <>
              <Route path="/login" Component={LoginScreen} />
            </>
          )}
          {isAuthenticated && (
            <>
              <Route path="/items" Component={ItemsScreen} />
              <Route path="/shop" Component={ShopScreen} />
              <Route path="/profile" Component={ProfileScreen} />
              <Route path="/articleCreate" Component={ArticleCreate} />
              <Route path="/articleDetails/:id" Component={ArticleDetails} />
            </>
          )}
        </Routes>
      </div>
      {isAuthenticated && (
        <Box className="bottom-navigation-mobile">
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
            <BottomNavigationAction
              label="Artikli"
              icon={<BakeryDiningIcon />}
            />
            <BottomNavigationAction label="Ceh" icon={<ShoppingCartIcon />} />
            <BottomNavigationAction label="Profil" icon={<FaceIcon />} />
          </BottomNavigation>
        </Box>
      )}
      <Snackbar
        open={loginToast.isOpen}
        autoHideDuration={2000}
        onClose={loginToast.hide}
        message={`Živjo ${loggedUser} 🍌`}
        anchorOrigin={{vertical: 'bottom', horizontal: 'right'}}
      />
    </div>
  );
}

export default App;
