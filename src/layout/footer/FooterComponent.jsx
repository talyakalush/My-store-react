import BottomNavigation from "@mui/material/BottomNavigation";
import Paper from "@mui/material/Paper";
import FooterLinkComponent from "./FooteLinkComponent";
import PriorityHighIcon from "@mui/icons-material/PriorityHigh";
import FavoriteIcon from "@mui/icons-material/Favorite";
import HomeIcon from "@mui/icons-material/Home";
import ROUTES from "../../routes/ROUTES";
import Box from "@mui/material/Box";

const FooterComponent = () => {
  const alwaysLinks = [
    { to: ROUTES.ABOUT, children: <PriorityHighIcon />, label: "About" },
    { to: ROUTES.MYSHOPPING, children: <FavoriteIcon />, label: "My Shopping" },
    { to: ROUTES.HOME, children: <HomeIcon />, label: "Home Page" },
  ];

  return (
    <Box sx={{ height: "100vh" }}>
      <Paper
        elevation={4}
        sx={{
          position: "fixed",
          left: 0,
          right: 0,
          bottom: 0,
          mt: 1,
        }}
      >
        <BottomNavigation showLabels>
          {alwaysLinks.map((myItem, index) => (
            <FooterLinkComponent
              to={myItem.to}
              key={"linksnav" + index}
              label={myItem.label}
            >
              {myItem.children}
            </FooterLinkComponent>
          ))}
        </BottomNavigation>
      </Paper>
    </Box>
  );
};

export default FooterComponent;
