import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import CardComponent from "../components/CardComponent";
import Grid from "@mui/material/Grid";
import { useSelector } from "react-redux";
import { Typography } from "@mui/material";
const AboutCard = ({ category }) => {
  const [dataFromServer, setDataFromServer] = useState([]);
  let { id } = useParams();
  const cart = useSelector((state) => state.cart.cart);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    axios
      .get(
        `https://pixabay.com/api/?key=25540812-faf2b76d586c1787d2dd02736&q=${category}&id=${id}`
      )
      .then(({ data }) => {
        if (data.hits && data.hits.length > 0) {
          const updatedItems = data.hits.map((item) => {
            const totalInCart = cart.reduce((acc, cart) => {
              return cart.id === item.id ? acc + cart.quantity : acc;
            }, 0);
            return {
              ...item,
              quantity: Math.max(0, 3 - totalInCart),

              price: item.tags.length * 2,
            };
          });
          setDataFromServer(updatedItems);
        }
      })
      .catch((err) => {
        console.error("Error fetching data:", err);
      });
  }, [id, category, cart]);

  useEffect(() => {
    fetchData();
  }, [cart]);

  const fetchData = async () => {
    setLoading(true);
    try {
      const response = await axios.get(
        `http://localhost:3000/api/products/${id}`
      );
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

  const handleAboutCard = (id) => {};

  return (
    <div>
      {" "}
      <Typography variant="h2" className="h1">
        About Product
      </Typography>
      <Grid
        container
        spacing={2}
        sx={{
          display: "flex",
          justifyContent: "space-around",
          alignItems: "center",
          marginBottom: "15px",
        }}
      >
        {dataFromServer.map((item, index) => (
          <Grid
            item
            lg={3}
            md={4}
            xs={6}
            sm={6}
            sx={{ margin: "10px", justifyContent: "center" }}
            key={"carsCard" + index}
          >
            <CardComponent
              id={item.id}
              title={item.tags}
              img={item.webformatURL}
              price={item.price}
              likes={`likes = ${item.likes / 2}`}
              views={`views = ${item.views}`}
              downloads={`downloads = ${item.downloads}`}
              collections={`collections = ${item.collections}`}
              onCard={handleAboutCard}
              quantity={item.quantity}
              item={item}
              dataFromServer={dataFromServer}
            />
          </Grid>
        ))}
      </Grid>
    </div>
  );
};
export default AboutCard;
