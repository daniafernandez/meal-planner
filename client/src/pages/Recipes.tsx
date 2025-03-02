import { useState } from "react";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
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

  const initialRecipeDraft: Recipe = {
    name: "",
    serves: 1,
    ingredients: [{
      name: "",
      units: "unit",
      quantity: 0
    }]
  };

  const [recipeDraft, setRecipeDraft] = useState<Recipe>(initialRecipeDraft);

  const notifySuccess = (message: String) => toast.success(message, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: true,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: false,
      progress: undefined,
      theme: "colored",
  });

  const notifyError = (message: String) => toast.error(message, {
    position: "top-right",
    autoClose: 5000,
    hideProgressBar: true,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: false,
    progress: undefined,
    theme: "colored",
});

  const addRecipe = () => {
    axios
        .post("http://127.0.0.1:5000/addRecipe", recipeDraft)
        .then((response) => {
          console.log(response);
          notifySuccess(response.data.message);
          setRecipeDraft(initialRecipeDraft);

        })
        .catch((error) => {
          notifyError("Error saving recipe: " + error.response.data.message);
        });
        
  }

    return (
      <>
      <div className='tableRound' style={{display: "flex", flexDirection: "column", gap: "10px"}}>
        <h2 style={{color: 'white'}}>Edit Recipe Draft</h2>
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
        <div className="recipeEditorContainer">
          <div className="editorHeading">
            <h6>Ingredient</h6>
            <h6>Quantity</h6>
            <h6>Units</h6>
            <h6></h6>
          </div>
          <div className="ingredientInputList">
            {recipeDraft.ingredients.map((ingredient, index) => (
              <div key={index} className="ingredientInput">
                <div>
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
                </div>
                <div style={{display:"flex", flexDirection:'row'}}>
                  <p style={{marginRight: '10px', width: '30px'}}>{ingredient.quantity}</p>
                  <button
                      onClick={() => {
                        const newQuantity = Number(ingredient.quantity) + 0.25
                        setRecipeDraft((prev) => ({
                          ...prev,
                          ingredients: prev.ingredients.map((ing, i) =>
                            i === index ? { ...ing, quantity: newQuantity } : ing
                          )
                        }))
                      }} 
                      disabled={ingredient.quantity > 100? true : undefined}      
                      className='btn btn-secondary'
                  >
                      +
                  </button>
                  <button
                      onClick={() => {
                        const newQuantity = Number(ingredient.quantity) - 0.25
                        setRecipeDraft((prev) => ({
                          ...prev,
                          ingredients: prev.ingredients.map((ing, i) =>
                            i === index ? { ...ing, quantity: newQuantity } : ing
                          )
                        }))
                      }}      
                      disabled={ingredient.quantity < 0.25? true : undefined}   
                      className='btn btn-secondary'
                  >
                      -
                  </button>
                </div>
                <div>
                  <DropDown
                    options={["unit", "bag", "pack", "box", "jar", "can", "bottle", "carton", "tub", "pouch"]} 
                    defaultOption={"unit"} 
                    onOptionSelect={(newValue) => setRecipeDraft((prev) => ({ ...prev, units: newValue}))} 
                  />
                </div>
                <div>
                  <button
                      onClick={() => {
                        setRecipeDraft((prev) => ({
                          ...prev,
                          ingredients: prev.ingredients.filter((_, i) => i !== index) 
                        }));
                      }}       
                      className='btn btn-danger'
                  >
                      Delete
                  </button>
                </div>
                <div>

                </div>
            </div>
            ))}
          </div>
          <div style={{marginTop: '10px', display: 'grid', gridTemplateColumns: "47% 52%"}}>
            <button
                  onClick={() => {
                    setRecipeDraft((prev) => ({
                      ...prev,
                      ingredients: [
                        ...prev.ingredients,
                        {name: "", units: "unit", quantity: 0}
                      ]
                    }))
                      
                  }}
                  className='btn btn-secondary'
              >
                  +
            </button>
            <span></span>
          </div>
          <div style={{marginTop: '10px', display: 'grid', gridTemplateColumns: "47% 52%"}}>
            <button
                  onClick={() => {addRecipe()}}
                  className='btn btn-primary'
              >
                  Save Recipe
            </button>
          </div>
        </div>
      </div>
      <ToastContainer />
      </>
    )
  }
  
  export default Recipes;
  