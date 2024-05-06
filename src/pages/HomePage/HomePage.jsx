import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import CardComponent from "../../components/CardComponent";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import ROUTES from "../../routes/ROUTES";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { useEffect, useState } from "react";
import { Box, Button } from "@mui/material";
import { useSelector } from "react-redux";

const HomePage = () => {
  const [dataFromServer, setDataFromServer] = useState([]);
  const [type, setType] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const cart = useSelector((state) => state.cart.cart);
  const navigate = useNavigate();

  useEffect(() => {
    const query = type ? `&q=${type}` : "";
    axios
      .get(
        `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736${query}`
      )
      .then(({ data }) => {
        const itemsWithQuantity = data.hits.map((item) => {
          const totalInCart = cart.reduce(
            (acc, cart) => (cart.id === item.id ? acc + cart.quantity : acc),
            0
          );
          return {
            ...item,
            quantity: Math.max(0, 3 - totalInCart),
            price: item.tags.length * 2,
          };
        });
        setDataFromServer(itemsWithQuantity);
      })
      .catch((err) => {
        setDataFromServer([]);
      });
  }, [type, cart]);

  useEffect(() => {
    fetchData(currentPage);
  }, [currentPage, type, cart]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/products`, {
        params: {
          page: currentPage,
          category: type,
          parPage: 9,
        },
      });
      const itemsWithQuantity = response.data.hits.map((item) => {
        const totalInCart = cart.reduce(
          (acc, cartItem) =>
            cartItem.id === item.id ? acc + cartItem.quantity : acc,
          0
        );
        return {
          ...item,
          quantity: Math.max(0, 3 - totalInCart),
          price: item.tags.length * 2,
        };
      });
      setDataFromServer(itemsWithQuantity);
    } catch (error) {
      console.error("Error fetching data:", error);
      setDataFromServer([]);
    } finally {
      setLoading(false);
    }
  };
  if (loading) {
    return <Typography>Loading...</Typography>;
  }

  const handleAboutCard = (id) => {
    navigate(`${ROUTES.ABOUTCARD}/${id}`);
  };
  const handleChange = (event) => {
    setType(event.target.value);
    setCurrentPage(1);
  };

  const handleReset = () => {
    setType("");
    setCurrentPage(1);
  };

  const handlePurchase = async (id) => {
    const updatedItems = dataFromServer.map((item) => {
      if (item.id === id && item.quantity > 0) {
        return { ...item, quantity: item.quantity - 1 };
      }
      return item;
    });

    setDataFromServer(updatedItems);

    await fetchData(currentPage);
  };

  const handlePrevious = () => {
    setCurrentPage((prev) => Math.max(prev - 1, 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => prev + 1);
  };

  return (
    <Box>
      <Typography variant="h2" className="h1">
        MY STORE
      </Typography>
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <div className="div" style={{ borderRadius: "20px" }}>
          <h2>The entire store is 20% off</h2>
          <h4>The prices that are written on the product is after discount</h4>
        </div>
      </div>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexDirection: "row",
          padding: "18px",
        }}
      >
        <Button onClick={handlePrevious} disabled={currentPage === 1}>
          Prev
        </Button>
        <div>
          <FormControl sx={{ minWidth: 120 }}>
            <InputLabel id="demo-simple-select-label">Category</InputLabel>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              value={type}
              label="Category"
              onChange={handleChange}
            >
              <MenuItem value={""}>all</MenuItem>
              <MenuItem value={"sport"}>Sport</MenuItem>
              <MenuItem value={"photo"}>Photo</MenuItem>
              <MenuItem value={"Food"}>Food</MenuItem>
              <MenuItem value={"Animals"}>Animals</MenuItem>
              <MenuItem value={"Working"}>Working</MenuItem>
              <MenuItem value={"Home"}>Home</MenuItem>
            </Select>
          </FormControl>
          <Button onClick={handleReset} sx={{ mt: 2 }}>
            Reset Category
          </Button>
        </div>

        <Button onClick={handleNext}>Next</Button>
      </div>

      <Grid container spacing={2} sx={{ mt: 2 }}>
        {dataFromServer.length > 0 ? (
          dataFromServer.map((item, index) => (
            <Grid item lg={4} md={6} xs={12} key={"carsCard" + index}>
              <CardComponent
                id={item.id}
                title={item.tags}
                price={item.price}
                img={item.webformatURL}
                onCard={handleAboutCard}
                onPurchase={() => handlePurchase(item.id)}
                quantity={item.quantity}
                dataFromServer={dataFromServer}
                item={item}
              />
            </Grid>
          ))
        ) : (
          <Typography>No items found</Typography>
        )}
      </Grid>
    </Box>
  );
};

export default HomePage;
