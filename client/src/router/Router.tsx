import { Routes, Route } from "react-router";


import Home from "../pages/home/Home";
import AboutUs from "../pages/about-us/AboutUs";

const Router = () => {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/about-us" element={<AboutUs />} />
    </Routes>
  );
};

export default Router;
