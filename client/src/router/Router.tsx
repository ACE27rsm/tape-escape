import { Routes, Route } from "react-router";

import Home from "../pages/home/Home";
import AboutUs from "../pages/about-us/AboutUs";

const Router = () => {
  return (
    <Routes>
      <Route path="/">
        <Route path="movies" element={<Home />} />
        <Route path="about-us" element={<AboutUs />} />
      </Route>
    </Routes>
  );
};

export default Router;
