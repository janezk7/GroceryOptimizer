import React, { CSSProperties } from "react";
import logo from "./logo.svg";
import "./App.css";
import {
  BrowserRouter,
  Link,
  Route,
  Router,
  Routes,
  useLocation,
} from "react-router-dom";

function HomeScreen() {
  return (
    <header className="App-header">
      <img src={logo} className="App-logo" alt="logo" />
      <p>
        Edit <code>src/App.tsx</code> and save to reload.
      </p>
      <a
        className="App-link"
        href="https://reactjs.org"
        target="_blank"
        rel="noopener noreferrer"
      >
        Learn React
      </a>
    </header>
  );
}

function ShopScreen() {
  return <div style={screenStyle}>Shop Screen</div>;
}

function ProfileScreen() {
  return <div style={screenStyle}>Profile Screen</div>;
}

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

const screenStyle: CSSProperties = {
  backgroundColor: "cyan",
};

export default App;
