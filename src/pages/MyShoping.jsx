import React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import DeleteIcon from "@mui/icons-material/Delete";
import { addToCart, removeFromCart } from "../store/Actions/cartAction.js";
import CardComponent from "../components/CardComponent";
import Button from "@mui/material/Button";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { toast } from "react-toastify";
import ROUTES from "../routes/ROUTES.js";
import { useNavigate } from "react-router-dom";

const CartPage = () => {
  const cartItems = useSelector((state) => state.cart.cart); // גישה למערך הסל מה-store
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const handleRemoveFromCart = (uniqueId) => {
    dispatch(removeFromCart(uniqueId));
    toast.success("The product has been removed successfully");
  };
  const handleToPay = () => {
    navigate(ROUTES.TOPAY);
  };

  const handleAboutCard = (id) => {
    if (id) {
      navigate(`${ROUTES.ABOUTCARD}/${id}`);
    } else {
    }
  };

  return (
    <div>
      <Typography variant="h2" className="h1">
        My Shopping
      </Typography>
      {cartItems.length > 0 ? (
        <Grid container spacing={2} sx={{ p: 2 }}>
          {cartItems.map((item, index) => {
            return (
              <Grid item lg={4} md={6} xs={12} key={"carsCard" + index}>
                <CardComponent
                  id={item.id}
                  price={item.price}
                  title={item.tags}
                  item={item}
                  img={item.webformatURL}
                  onCard={handleAboutCard}
                  quantity={item.quantity}
                />

                <Button onClick={() => handleRemoveFromCart(item.id)}>
                  <DeleteIcon /> delete
                </Button>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Typography>the shopping cart empty</Typography>
      )}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alightItem: "center",
        }}
      >
        <Button variant="contained" onClick={handleToPay}>
          go to payment
        </Button>
      </div>
    </div>
  );
};

export default CartPage;
