import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";

function AppRoutes() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
  );
}

export default AppRoutes;
