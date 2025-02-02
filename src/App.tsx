import "./App.css";
import { Route, Routes, useNavigate } from "react-router-dom";
import ItemsScreen from "./screens/(tabs)/ItemsScreen";
import ShopScreen from "./screens/(tabs)/ShopScreen";
import ProfileScreen from "./screens/(tabs)/ProfileScreen";
import ArticleCreate from "./screens/ArticleCreate";
import ArticleDetails from "./screens/ArticleDetails";

import BakeryDiningIcon from "@mui/icons-material/BakeryDining";
import FastfoodIcon from '@mui/icons-material/Fastfood';
import FaceIcon from "@mui/icons-material/Face";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";

import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";
import {
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Snackbar,
} from "@mui/material";
import { useEffect } from "react";
import useAuthStore from "./store/useAuthStore";
import LoginScreen from "./screens/(auth)/Login";
import useToast from "./hooks/useToast";
import useNavigationStore from "./store/useNavigationStore";

function App() {
  const navigate = useNavigate();
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated)();
  const token = useAuthStore((state) => state.token);
  const loggedUser = useAuthStore((state) => state.loggedUser);
  const tabIndex = useNavigationStore((state) => state.tabIndex);
  const setTabIndex = useNavigationStore((state) => state.setTabIndex);

  const loginToast = useToast();

  // Handle location and bottom nav state
  const location = window.location;
  useEffect(() => {
    switch (location.pathname) {
      case "/items":
        setTabIndex(0);
        break;
      case "/shop":
        setTabIndex(1);
        break;
      case "/profile":
        setTabIndex(2);
        break;
    }
  }, [location.pathname]);

  useEffect(() => {
    if (!isAuthenticated) {
      console.log("Not logged in. Navigating to login...");
      navigate("./login");
    }
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
              <Route path="/" Component={ItemsScreen} />{" "}
              {/* TODO: simply redirect to items path */}
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
            value={tabIndex}
            onChange={(ev, newValue) => {
              setTabIndex(newValue);
              console.log(newValue);
              switch (newValue) {
                case 0:
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
              icon={<FastfoodIcon />}
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
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      />
    </div>
  );
}

export default App;
