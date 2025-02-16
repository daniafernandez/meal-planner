import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import MealPlan from "../pages/MealPlan";

function AppRoutes() {
  return (
    
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/recipes" element={<Recipes />} />
        <Route path="/mealplan" element={<MealPlan />} />
      </Routes>
  );
}

export default AppRoutes;
