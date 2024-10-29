import React, { useEffect, useState, createContext, useContext } from "react";
import { Routes, Route, Navigate, useLocation } from "react-router-dom";
import Products from "./components/Products";
import ProductDetails from "./components/ProductDetails";
import Cart from "./components/Cart";
import Checkout from "./components/Checkout";
import Login from "./components/Login"; // Import the Login component

import Navbar from "./components/Navbar";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Favourites from "./components/Favourites";
import { toast } from "react-toastify";
import { AuthContext } from "./Provider/AuthProvider";
import { FilterContext } from "./Provider/FilterProvider";

export const ThemeContext = createContext();

function App() {
  const { isLoggedIn, handleLogin, user } = useContext(AuthContext);

  const { filteredproducts, setfilterType, setSearch, isLoading } =
    useContext(FilterContext);

  const location = useLocation();
  const [liked, setLiked] = useState([]);
  const [favourites, setFav] = useState([]);
  const [theme, setTheme] = useState("light");
  const [displaysidebar, setdispalySidebar] = useState(false);
  const showNavbar = !["/login", "/signup"].includes(location.pathname);

  const handleSidebar = () => {
    console.log(displaysidebar);
    setdispalySidebar((prev) => !prev);
  };
  const handleLike = (index) => {
    setLiked((prevLiked) => {
      const newLiked = [...prevLiked];
      newLiked[index] = !newLiked[index];

      // Update favorites based on the new liked state
      const newFavorites = filteredproducts.filter((_, idx) => newLiked[idx]);
      setFav(newFavorites);
      if (newLiked[index])
        toast.success("Product added to favourites!", {
          autoClose: 1000, // Close after 1 second
        });
      return newLiked;
    });
  };
  const [displaySearch, setDisplaySearch] = useState(() => {
    return location.pathname === "/";
  });
  useEffect(() => {
    console.log("displaying fav");
    console.log(favourites);
  }, [favourites]);

  useEffect(() => {
    console.log(location.pathname);
    setDisplaySearch(() => {
      return location.pathname === "/";
    });
  },[location]);

  return (
    <ThemeContext.Provider value={{ theme, setTheme, setfilterType }}>
      <div
        className={`min-h-screen ${
          theme === "dark" ? "bg-gray-800 text-white" : "bg-gray-100 text-black"
        }`}
      >
        {showNavbar && (
          <Navbar
            user={user}
            onLogin={handleLogin}
            setSearch={setSearch}
            displaySearch={displaySearch}
            handleSidebar={handleSidebar}
          />
        )}
        <Routes>
          <Route
            path="/"
            element={
              isLoggedIn ? (
                <Products
                  products={filteredproducts}
                  isLoading={isLoading}
                  liked={liked}
                  handleLike={handleLike}
                  displaysidebar={displaysidebar}
                />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route path="/login" element={<Login onLogin={handleLogin} />} />
          <Route
            path="/product/:id"
            element={isLoggedIn ? <ProductDetails /> : <Navigate to="/login" />}
          />
          <Route
            path="/cart"
            element={isLoggedIn ? <Cart /> : <Navigate to="/login" />}
          />
          <Route
            path="/checkout"
            element={isLoggedIn ? <Checkout /> : <Navigate to="/login" />}
          />
          <Route
            path="/favourites"
            element={
              isLoggedIn ? (
                <Favourites favourites={favourites} />
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="*"
            element={<Navigate to={isLoggedIn ? "/" : "/login"} />}
          />
        </Routes>
        <ToastContainer />
      </div>
    </ThemeContext.Provider>
  );
}

export default App;
