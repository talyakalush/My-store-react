import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage/HomePage";
import ROUTES from "./ROUTES";
import NotFoundPage from "../pages/404Page";
import AboutUsPage from "./../pages/AboutUsPage";
import CardComponent from "../components/CardComponent";
import HeaderComponent from "../layout/header/HeaderComponent";
import MySHOPPING from "../pages/MyShoping";
import AboutCard from "../pages/AboutCard";
import ToPay from "../pages/ToPay";
const Router = () => {
  return (
    <Routes>
      <Route path={ROUTES.HOME} element={<HomePage />} />
      <Route path={ROUTES.MYSHOPPING} element={<MySHOPPING />} />
      <Route path={ROUTES.ABOUT} element={<AboutUsPage />} />
      <Route path={ROUTES.CARDCOMPOMEMT} element={<CardComponent />} />
      <Route path={ROUTES.HEADERCONPONENT} element={<HeaderComponent />} />
      <Route path={ROUTES.TOPAY} element={<ToPay />} />
      <Route path={`${ROUTES.CARDCOMPONENT}/:id`} element={<CardComponent />} />
      <Route path={`${ROUTES.ABOUTCARD}/:id`} element={<AboutCard />} />
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};
export default Router;
