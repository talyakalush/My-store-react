import { ThemeProvider, createTheme } from "@mui/material/styles";
import tmc from "twin-moon-color";
import FooterComponent from "./footer/FooterComponent";
import HeaderComponent from "./header/HeaderComponent";
import MainComponent from "./main/MainComponent";
import CssBaseline from "@mui/material/CssBaseline";
import { useState } from "react";
import style from "../style/style.css";

const LayoutComponent = ({ children }) => {
  const [isDarkTheme, setDarkTheme] = useState(false);

  const themes = tmc({
    "text.headerColor": "!gray",
    "text.headerActive": "*white",
    favActive: "*#FB0000",
    primary: "*eee6dd",
  });

  const darkMode = createTheme(themes.dark);
  const lightMode = createTheme(themes.light);

  const handleThemeChange = (checked) => {
    setDarkTheme(checked);
  };

  return (
    <div style={{ backgroundColor: isDarkTheme ? "#121212" : "#b26c78" }}>
      <ThemeProvider theme={isDarkTheme ? darkMode : lightMode}>
        <CssBaseline />
        <HeaderComponent
          isDarkTheme={isDarkTheme}
          onThemeChange={handleThemeChange}
        />
        <MainComponent>{children}</MainComponent>
        <FooterComponent />
      </ThemeProvider>
    </div>
  );
};
export default LayoutComponent;
