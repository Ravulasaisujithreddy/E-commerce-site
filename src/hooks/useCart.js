import { useEffect, useState } from "react";

function useCart() {
  const [cart, setCart] = useState(() => {
    try {
      const savedCart = localStorage.getItem("cart");
      const parsedCart = savedCart ? JSON.parse(savedCart) : [];
      // Ensure each item has a quantity of at least 1
      return parsedCart.map((item) => ({
        ...item,
        quantity: item.quantity || 1,
      }));
    } catch (error) {
      console.error("Failed to parse cart from localStorage:", error);
      return [];
    }
  });

  useEffect(() => {
    try {
      localStorage.setItem("cart", JSON.stringify(cart));
    } catch (error) {
      console.error("Failed to save cart to localStorage:", error);
    }
  }, [cart]);
  function updateCart(product) {
    console.log(product);
    const item = {
      image: product.image,
      title: product.title,
      price: product.price,
      quantity: 1,
    };
    setCart((prevCart) => {
      const existingItemIndex = prevCart.findIndex(
        (oneItem) => oneItem.title === item.title
      );
      if (existingItemIndex !== -1) {
        // Item found, increase quantity by 1
        const updatedCart = [...prevCart];
        updatedCart[existingItemIndex].quantity += 1;
        return updatedCart;
      } else {
        // Item not found, add new item to cart
        return [...prevCart, item];
      }
    });
  }
  const handleIncrease = (index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      newCart[index].quantity += 1;
      return newCart;
    });
  };

  const handleDecrease = (index) => {
    setCart((prevCart) => {
      const newCart = [...prevCart];
      if (newCart[index].quantity > 1) {
        newCart[index].quantity -= 1;
      }
      return newCart;
    });
  };

  const handleDelete = (index) => {
    setCart((prevCart) => prevCart.filter((_, i) => i !== index));
  };
  return { cart, updateCart, handleIncrease, handleDecrease, handleDelete };
}

export default useCart;
