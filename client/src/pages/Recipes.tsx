import { useState } from "react";
import axios from "axios";
import TextInput from "../components/TextInput";
import DropDown from "../components/DropDown";

function Recipes() {

  interface Ingredient {
    name: string;
    units: string;
    quantity: number;
  }

  interface Recipe {
      name: string;
      serves: number;
      ingredients: Ingredient[];
  }

  const [recipeDraft, setRecipeDraft] = useState<Recipe>({
      name: "",
      serves: 1,
      ingredients: [{
        "name": "tuna",
        "units": "cans",
        "quantity": 2
    },
    {
        "name": "avocado",
        "units": "avocados",
        "quantity": 1
    },],
  })

  const testRecipe: Recipe ={
    "name": "my recipe",
    "serves": 2,
    "ingredients": [
        {
            "name": "tuna",
            "units": "cans",
            "quantity": 2
        },
        {
            "name": "avocado",
            "units": "avocados",
            "quantity": 1
        },
    ]

  }

  const addRecipe = () => {
    axios
        .post("http://127.0.0.1:5000/addRecipe", testRecipe)
        .then((response) => {
          console.log(response);
        })
        .catch((error) => {
          console.error("Error adding recipe:", error);
        });
  }

    return (
      <>
      <div className='tableRound' style={{display: "flex", flexDirection: "column", gap: "10px"}}>
        <TextInput 
          label={"Recipe Name"} 
          value={recipeDraft["name"] || ""}
          onChange={(newValue) => setRecipeDraft((prev) => ({ ...prev, name: newValue }))}
        />
        <DropDown 
            label="Servings:"
            options={[
              "0.5", "1", "1.5", "2", "2.5", "3", "3.5", "4", "4.5", "5",
              "5.5", "6", "6.5", "7", "7.5", "8", "8.5", "9", "9.5", "10"
            ]
            } 
            defaultOption={String(recipeDraft["serves"])} 
            onOptionSelect={(newValue) => setRecipeDraft((prev) => ({ ...prev, serves: Number(newValue)}))} 
        />
        <h5>Ingredients</h5>
        <div className="ingredientInputList">
          {recipeDraft.ingredients.map((ingredient, index) => (
            <div key={index} className="ingredientInput">
              <TextInput 
                key={index}
                value={ingredient.name || ""}
                onChange={(newValue) => 
                  setRecipeDraft((prev) => ({
                    ...prev,
                    ingredients: prev.ingredients.map((ing, i) =>
                      i === index ? { ...ing, name: newValue } : ing
                    )
                  }))
                }
              />
              <button
                  onClick={() => {
                    setRecipeDraft((prev) => ({
                      ...prev,
                      ingredients: prev.ingredients.filter((_, i) => i !== index) // Remove ingredient at index
                    }));
                  }}       
                  className='btn btn-danger'
              >
                  Delete
              </button>
          </div>
          ))}
        </div>
        <button
                onClick={() => {
                  setRecipeDraft((prev) => ({
                    ...prev,
                    ingredients: [
                      ...prev.ingredients,
                      {name: "", units: "", quantity: 0}
                    ]
                  }))
                    
                }}
                className='btn btn-primary'
            >
                +
        </button>
        <button
                onClick={() => {
                    console.log(recipeDraft);
                }}
                className='btn btn-primary'
            >
                Log Ingredients
          </button>
      </div>
      </>
    )
  }
  
  export default Recipes;
  