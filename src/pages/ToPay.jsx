import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select, { SelectChangeEvent } from "@mui/material/Select";
import { useState } from "react";

const ToPay = () => {
  const [shippingMethod, setShippingMethod] = useState("");
  const handleToPayFinish = () => {
    alert("Payment has been sent");
  };
  const handleChange = (event) => {
    setShippingMethod(event.target.value);
  };

  return (
    <div>
      <Typography variant="h2" className="h1">
        To Pay
      </Typography>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          p: 2,
        }}
      >
        <TextField
          id="outlined-basic"
          label=" Do You have a coupon code?"
          variant="outlined"
        />
        <FormControl sx={{ m: 3, minWidth: 220 }}>
          <InputLabel id="demo-simple-select-label">
            Select a shipping method
          </InputLabel>
          <Select
            labelId="demo-simple-select-label"
            id="demo-simple-select"
            value={shippingMethod}
            onChange={handleChange}
            label="Select a shipping method"
          >
            <MenuItem value="doorDelivery">Delivery to your door</MenuItem>
            <MenuItem value="storeCollection">
              Self collection from stores
            </MenuItem>
          </Select>
        </FormControl>

        <br />
        <br />
        <p>Fill in the payment details:</p>
        <TextField id="standard-basic" label="Card Number" variant="standard" />
        <br />
        <br />
        <TextField id="standard-basic" label="cvc" variant="standard" />
        <br />
        <br />
        <TextField id="standard-basic" label="ID" variant="standard" />
        <br />
        <br />
        <Button
          sx={{ margin: 2 }}
          variant="contained"
          onClick={handleToPayFinish}
        >
          send
        </Button>
      </Box>
    </div>
  );
};
export default ToPay;
