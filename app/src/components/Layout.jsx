import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "./Layout.css";
import logo from "../assets/react.svg"

const Layout = ({ children }) => {
  const { user, logout, isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="layout">
      <header className="header">
        <div className="container">
          <Link to="/" className="logo">
            <img src={logo} className="logo-image"/>
            <span>ReactiveBlog</span>
          </Link>
          <nav className="nav">
            <Link to="/">Home</Link>
            <Link to="/articles">Articles</Link>
            {isAuthenticated ? (
              <>
                <Link to="/articles/create">Create article</Link>
                <span>Welcome, {user.username}!</span>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login">Sign in</Link>
                <Link to="/register">Sign up</Link>
              </>
            )}
          </nav>
        </div>
      </header>
      <main className="main">
        <div className="container">{children}</div>
      </main>
    </div>
  );
};

export default Layout;
