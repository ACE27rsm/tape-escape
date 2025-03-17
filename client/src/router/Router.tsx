import { Routes, Route } from "react-router";

/// * pages
import Movies from "../pages/movies/Movies";
import AboutUs from "../pages/about-us/AboutUs";

/// * components
import NavBar from "@/layout/nav-bar/NavBar";
import Footer from "@/layout/footer/Footer";

const Router = () => {
  return (
    <div className="h-full">
      <NavBar />

      <Routes>
        <Route path="/">
          <Route path="movies" element={<Movies />} />
          <Route path="about-us" element={<AboutUs />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default Router;
