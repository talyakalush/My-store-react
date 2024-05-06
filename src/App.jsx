import LayoutComponent from "./layout/LayoutComponent";
import Router from "./routes/Router";
import { ToastContainer } from "react-toastify";
import React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setInitialCart } from "./store/Actions/cartAction.js";

function App() {
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.cart.cart);

  useEffect(() => {
    if (cart && cart.length > 0) {
      localStorage.setItem("cart", JSON.stringify(cart));
    } else {
    }
  }, [cart]);

  useEffect(() => {
    const savedCart = localStorage.getItem("cart");
    if (savedCart) {
      try {
        const parsedCart = JSON.parse(savedCart);
        dispatch(setInitialCart(parsedCart));
      } catch (error) {
        localStorage.removeItem("cart");
      }
    }
  }, [dispatch]);

  return (
    <div>
      <LayoutComponent>
        <Router />
      </LayoutComponent>
      <ToastContainer />
    </div>
  );
}

export default App;
