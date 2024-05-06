import {
  Card,
  CardHeader,
  CardContent,
  Typography,
  CardActionArea,
  CardMedia,
  Divider,
  IconButton,
  Box,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import PropTypes from "prop-types";
import { useDispatch } from "react-redux";
import { addToCart, removeFromCart } from "../store/Actions/cartAction.js";
import { toast } from "react-toastify";
import { useSelector } from "react-redux";

const CardComponent = ({
  title,
  img,
  id,
  onCard,
  likes,
  views,
  downloads,
  collections,
  onPurchase,
  price,
  quantity,
  item,
}) => {
  const dispatch = useDispatch();

  const handleAboutClick = () => {
    onCard(id);
  };
  const cart = useSelector((state) => state.cart.cart);

  const handleAddToCart = (item) => {
    const cartLimit = 3;
    const existingItem = cart.find((cart) => cart.id === item.id);
    if (existingItem && existingItem.quantity >= cartLimit) {
      toast.error("You cannot add more than 3 items of this product.");
    } else {
      dispatch(addToCart(item));
      toast.success("Item added to cart.");
    }
  };

  return (
    <Card
      square
      raised
      sx={{
        borderRadius: "10px",
        backgroundColor: "#f7eadf",
        color: "black",
        textShadow: " 1px 1px 1px white",

        "&:hover": {
          opacity: "0.8",
        },
      }}
    >
      <CardActionArea>
        <CardMedia
          component="img"
          image={img}
          alt="american massle car"
          onClick={handleAboutClick}
          height={200}
        />
      </CardActionArea>
      <CardHeader
        title={title}
        titleTypographyProps={{
          style: {
            fontSize: "16px",
          },
        }}
      ></CardHeader>

      <Divider></Divider>
      <CardContent>
        <Typography variant="body2">Price: {price}$</Typography>
        <Typography variant="body2">
          <br />
          {likes}
          <br />
          {views}
          <br />
          {downloads}
          <br />
          {collections}
          <br />
        </Typography>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}></Box>
        <Box sx={{ display: "flex", justifyContent: "space-between" }}>
          <IconButton onClick={() => handleAddToCart(item)}>
            <FavoriteIcon color="error" />
          </IconButton>

          <Typography>Amount: {quantity} </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

CardComponent.propTypes = {
  title: PropTypes.string.isRequired,
  img: PropTypes.string,
  id: PropTypes.number,
  price: PropTypes.number,
  item: PropTypes.object,
  quantity: PropTypes.number,
  onCard: PropTypes.func,
  likes: PropTypes.string,
  views: PropTypes.string,
  downloads: PropTypes.string,
  collections: PropTypes.string,
  onPurchase: PropTypes.func,
};

CardComponent.defaultProps = {
  title: "Product",
};

export default CardComponent;
