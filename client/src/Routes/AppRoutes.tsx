import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Recipes from "../pages/Recipes";
import MealPlan from "../pages/MealPlan";
import '../styles/App.css'

function AppRoutes() {
  return (
    
      <Routes>
        <Route path="/" element={<MealPlan />} />
        <Route path="/recipes" element={<Recipes />} />
      </Routes>
  );
}

export default AppRoutes;
