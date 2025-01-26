import { useEffect, useState } from "react";
import SiteHeader from "./components/SiteHeader.tsx"
import axios from "axios";
import './App.css'

function App() {
  interface RecipeDetails {
    name: string;
    serves: number;
    ingredients: [string, number][];
  }

  const [recipes, setRecipes] = useState<RecipeDetails[]>([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/recipes")
      .then((response) => {
        console.log(response);
        setRecipes(response.data);
      })
      .catch((error) => {
        console.error("Error fetching recipes:", error);
      });
  }, []);


  return (
    <>
      <SiteHeader />
      <h1>My Recipes</h1>
      <div>
        {recipes.map((recipe, index) => (
          <div key={index} style={{ marginBottom: "20px" }}>
            <h2>{recipe.name}</h2>
            <p><strong>Serves:</strong> {recipe.serves}</p>
            <h3>Ingredients:</h3>
            <ul>
              {recipe.ingredients.map(([ingredient, quantity], i) => (
                <li key={i}>
                  {ingredient}: {quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </>
  )
}

export default App
