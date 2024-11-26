import "./App.css";
import {
  BrowserRouter,
  Link,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";
import HomeScreen from "./screens/HomeScreen";
import ShopScreen from "./screens/ShopScreen";
import ProfileScreen from "./screens/ProfileScreen";

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

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
  const location = useLocation();

  return (
    <div className="app-container">
      <div className="content">
        <Routes>
          <Route path="/home" Component={HomeScreen} />
          <Route path="/shop" Component={ShopScreen} />
          <Route path="/profile" Component={ProfileScreen} />
        </Routes>
      </div>

      <div className="tabs">
        <TabLink to="/home" location={location}>
          <div className="tabIcon">🏠</div>
          <div>Home</div>
        </TabLink>
        <TabLink to="/shop" location={location}>
          <div className="tabIcon">🛒</div>
          <div>Shop</div>
        </TabLink>
        <TabLink to="/profile" location={location}>
          <div className="tabIcon">😄</div>
          <div>Profile</div>
        </TabLink>
      </div>
    </div>
  );
}



export default App;
