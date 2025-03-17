import { Routes, Route } from "react-router";

/// * pages
import Movies from "../pages/movies/Movies";
import AboutUs from "../pages/about-us/AboutUs";

/// * components
import NavBar from "@/layout/nav-bar/NavBar";

const Router = () => {
  return (
    <div className="">
      <NavBar />
      
      <Routes>
        <Route path="/">
          <Route path="movies" element={<Movies />} />
          <Route path="about-us" element={<AboutUs />} />
        </Route>
      </Routes>
      <div className="h-16 bg-amber-900"></div>
    </div>
  );
};

export default Router;
