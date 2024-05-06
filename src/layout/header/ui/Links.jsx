import { Box } from "@mui/material";
import alwaysLinks from "../../myLinks.js";
import NavLinkComponent from "../NavLinkComponent";

const Links = () => {
  return (
    <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
      {alwaysLinks.map((myItem, index) => (
        <NavLinkComponent to={myItem.to} key={"linksnav" + index}>
          {myItem.children}
        </NavLinkComponent>
      ))}
    </Box>
  );
};

export default Links;
