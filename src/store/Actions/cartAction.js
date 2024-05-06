import { ADD_TO_CART, REMOVE_FROM_CART, RESET_CART, SAVE_CART } from "./types";

function addToCart(item) {
  const uniqueId = item.id + "-" + Date.now();

  return {
    type: ADD_TO_CART,
    payload: { ...item, uniqueId, quantity: 3 },
  };
}

function removeFromCart(itemId) {
  return {
    type: REMOVE_FROM_CART,
    payload: itemId,
  };
}

function resetCart() {
  return {
    type: RESET_CART,
  };
}

function setInitialCart(cart) {
  return {
    type: SAVE_CART,
    payload: cart,
  };
}

export { addToCart, removeFromCart, resetCart, setInitialCart };
