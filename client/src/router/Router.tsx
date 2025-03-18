import { Routes, Route } from "react-router";

/// * pages
import Movies from "../pages/movies/Movies";

/// * components
import NavBar from "@/layout/nav-bar/NavBar";
import Footer from "@/layout/footer/Footer";
import History from "@/pages/history/History";

const Router = () => {
  return (
    <div className="h-full">
      <NavBar />

      <Routes>
        <Route path="/">
          <Route path="movies" element={<Movies />} />
          <Route path="rent-history" element={<History />} />
        </Route>
      </Routes>
      <Footer />
    </div>
  );
};

export default Router;
