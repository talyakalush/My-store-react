import { Fragment } from "react";
import Typography from "@mui/material/Typography";
import * as React from "react";
import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";

const AboutUsPage = () => {
  return (
    <Fragment>
      <Typography variant="h2" align="center">
        Contact Us
      </Typography>
      <Typography variant="h5" align="center">
        To contact us, please fill in the details and we will get back to you as
        soon as possible
      </Typography>
      <Box
        component="form"
        sx={{
          "& > :not(style)": { m: 1, width: "25ch" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
        }}
        noValidate
        autoComplete="off"
      >
        <TextField id="outlined-basic" label="Name:" variant="outlined" />
        <br />

        <TextField id="outlined-basic" label="Phone:" variant="outlined" />
        <br />

        <TextField id="outlined-basic" label="Email:" variant="outlined" />
        <br />

        <Button variant="contained">send</Button>
      </Box>

      <Typography variant="h5" align="center">
        Delivery Methods
      </Typography>
      <TableContainer
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "row",
        }}
      >
        <Table
          sx={{
            width: "450px",
            border: "1px solid #eee6dd",
          }}
          size="small"
          aria-label="a dense table"
        >
          <TableHead>
            <TableRow>
              <TableCell align="center">Delivery method</TableCell>
              <TableCell align="center">Arrival Time</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell align="center" component="th" scope="row">
                Delivery to your door
              </TableCell>
              <TableCell align="center">up to 5 business days</TableCell>
            </TableRow>
            <TableRow>
              <TableCell align="center" component="th" scope="row">
                Self collection from stores
              </TableCell>
              <TableCell align="center">up to 2 business days</TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </TableContainer>
    </Fragment>
  );
};

export default AboutUsPage;
