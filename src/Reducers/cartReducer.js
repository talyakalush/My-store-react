import {
  ADD_TO_CART,
  REMOVE_FROM_CART,
  RESET_CART,
  SAVE_CART,
} from "../store/Actions/types.js";

const initialState = {
  cart: [],
};

function cartReducer(state = initialState, action) {
  switch (action.type) {
    case SAVE_CART:
      return {
        ...state,
        cart: action.payload,
      };
    case ADD_TO_CART:
      const existingItemIndex = state.cart.findIndex(
        (item) => item.id === action.payload.id
      );
      if (existingItemIndex !== -1) {
        const newCart = state.cart.slice();
        if (newCart[existingItemIndex].quantity < 3) {
          newCart[existingItemIndex].quantity += 1;
          return { ...state, cart: newCart };
        }
        return state;
      } else {
        return {
          ...state,
          cart: [...state.cart, { ...action.payload, quantity: 1 }],
        };
      }

    case REMOVE_FROM_CART:
      return {
        ...state,
        cart: state.cart
          .map((item) =>
            item.id === action.payload
              ? { ...item, quantity: item.quantity > 1 ? item.quantity - 1 : 0 }
              : item
          )
          .filter((item) => item.quantity > 0),
      };
    case RESET_CART:
      return { ...state, cart: [] };
    default:
      return state;
  }
}
export default cartReducer;
