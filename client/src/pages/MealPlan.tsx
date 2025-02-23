import React from 'react';
import { useState, useEffect, useMemo } from 'react';
import axios from "axios";
import DropDown from "../components/DropDown.tsx"
import TextInput from '../components/TextInput.tsx';


function MealPlan() {

    interface RecipeDetails {
        name: string;
        serves: number;
        ingredients: [string, number][];
      }
    
      const [recipes, setRecipes] = useState<RecipeDetails[]>([]);
      const recipeOptions = recipes.map(recipe => recipe.name);
      
    
      const fetchRecipes = () => {
        axios
          .get("http://127.0.0.1:5000/recipes")
          .then((response) => {
            console.log(response);
            setRecipes(response.data);
          })
          .catch((error) => {
            console.error("Error fetching recipes:", error);
          });
      }
    
      useEffect(() => {
        fetchRecipes();
      }, []);

      interface GroceryList {
        [ingredient: string]: number;
      }

      type Day = "Monday" | "Tuesday" | "Wednesday" | "Thursday" | "Friday" | "Saturday" | "Sunday";
      type Meals = Record<Day, string[]>; 
      type MealPlan = {
        Breakfast: Meals;
        Lunch: Meals;
        Dinner: Meals;
      };
      const [mealPlan, setMealPlan] = useState<MealPlan>({
        Breakfast: {
          Monday: [""], Tuesday: [""], Wednesday: [""], Thursday: [""], Friday: [""], Saturday: [""], Sunday: [""]
        },
        Lunch: {
          Monday: [""], Tuesday: [""], Wednesday: [""], Thursday: [""], Friday: [""], Saturday: [""], Sunday: [""]
        },
        Dinner: {
          Monday: [""], Tuesday: [""], Wednesday: [""], Thursday: [""], Friday: [""], Saturday: [""], Sunday: [""]
        }
      });
      


      const [groceryList, setGroceryList] = useState<GroceryList[]>([]);

      const buildGroceryList = () => {
        const dataToSend = {
            mealPlan: mealPlan,  
            recipes: recipes     
        };
        axios
          .post("http://127.0.0.1:5000/grocerylist", dataToSend)
          .then((response) => {
            console.log(response);
            setGroceryList(response.data);
            console.log(groceryList)
          })
          .catch((error) => {
            console.error("Error building grocery list:", error);
          });
      }

    const pastelColors: string[] = [
        "lightgray", "lavender", "lightblue", "skyblue", "beige", "peachpuff", "lightpink", 
        "lavenderblush", "palegreen", "lightgreen", "lightcyan", "mistyrose", "lightyellow"
      ];
    const colorDefault = pastelColors[2]
      
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const DaysOfWeek: Day[] = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];
    const numPeopleOptions = ["1","2","3","4","5","6"]
    const numPeopleDefaultOption = "1"

    const [selectedNumPeopleOption, setSelectedNumPeopleOption] = useState<string>(numPeopleDefaultOption); 
    const [people, setPeople] = useState<string[]>(Array(parseInt(numPeopleDefaultOption)).fill(""));
    const peopleExtra = useMemo(() => people.slice(1), [people]);
    const [cook, setCook] = useState<string>(people[0] || "");
    const [tableColors, setTableColors] = useState<string[]>(Array(parseInt(numPeopleDefaultOption)).fill(colorDefault)); 

    const handleOptionSelect = (option: string) => {
        setSelectedNumPeopleOption(option); 
        let updatedTableColors = [...tableColors];
        for (var i=tableColors.length; i < Number(option); i++) {
            updatedTableColors[i] = colorDefault;
        }
        console.log(updatedTableColors);
        updatedTableColors = updatedTableColors.slice(0, Number(option));
        console.log(updatedTableColors);
        setTableColors(updatedTableColors);  
        
        // update people 
        let updatedPeople = [...people];
        updatedPeople = updatedPeople.slice(0,Number(option));
        for (var i=people.length; i < Number(option); i++) {
            updatedPeople.push('')
        }
        setPeople(updatedPeople);
        console.log(people)
    };

    const handleColorSelect = (index: number, newValue: string) => {
        const updatedTableColors = [...tableColors];
        updatedTableColors[index] = newValue;
        setTableColors(updatedTableColors);  
    };

    const handlePersonChange = (index: number, newValue: string) => {
        const updatedPeople = [...people];
        updatedPeople[index] = newValue;
        setPeople(updatedPeople);
    };


    const initializeDayArrays = (len: number) => {
        const updatedMealPlan = {...mealPlan}
        for (const [meal, days] of Object.entries(updatedMealPlan)) {
            const typedMeal = meal as "Breakfast" | "Lunch" | "Dinner";
            for (const [day, _] of Object.entries(days)) {
              const typedDay = day as Day;
              updatedMealPlan[typedMeal][typedDay] = new Array(len).fill("")
            }
          }
    }

    //need to add is cook param to avoid adding 1 to personidx for cook (actual 0)
    const handleRecipeSelect = (mealIdx: number, dayIdx: number, personIdx: number, isCook: boolean, newValue: string) => {
        const updatedMealPlan = {...mealPlan}
        const mealType = meals[mealIdx] as keyof MealPlan; 
        const day: Day = DaysOfWeek[dayIdx] as Day
        const adjustedPersonIdx = isCook? personIdx : personIdx + 1
        updatedMealPlan[mealType][day][adjustedPersonIdx] = newValue;
        setMealPlan(updatedMealPlan);
        console.log(mealPlan);
        buildGroceryList();
        
    };

    return (
        <>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {people.map((person, personIndex) => (
                <React.Fragment key={personIndex}>
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill={tableColors[personIndex]} className="bi bi-circle-fill" viewBox="0 0 16 16">
                        <circle cx="8" cy="8" r="8"/>
                    </svg>
                    <p key={`${personIndex}`} style={{ marginTop: "16px"}}>
                            {person}
                    </p>
                </React.Fragment>
        ))}
        </div>
        <table>
            <thead>
                <tr>
                    <th></th>
                    {daysOfWeek.map((day, index) => (
                        <th key={index}>{day}</th>
                    ))}
                </tr>
            </thead>
            <tbody>
                {meals.map((meal, mealIndex) => (
                    <React.Fragment key={mealIndex}>
                        <tr>
                            <th rowSpan={parseInt(selectedNumPeopleOption)}>{meal}</th>
                            {daysOfWeek.map((_, dayIndex) => (
                                <td 
                                    key={`${mealIndex}-${dayIndex}`} 
                                    className="personCellTop"
                                    style={{backgroundColor: tableColors[0]}}>
                                        <DropDown 
                                        label="" 
                                        type={"light"}
                                        options={recipeOptions} 
                                        defaultOption='' 
                                        onOptionSelect={(newValue) => handleRecipeSelect(mealIndex, dayIndex, 0, true, newValue)}
                                    ></DropDown>
                                </td>
                            ))}
                        </tr>
                        {peopleExtra.map((_, personIndex) => (
                            <tr key={`${mealIndex}-${personIndex}`}>
                                 {daysOfWeek.map((_, dayIndex) => (
                                <td 
                                    key={`${mealIndex + 1}-${personIndex}-${dayIndex}`} 
                                    className={personIndex === peopleExtra.length-1 ? "personCellBottom":"personCellMiddle"} 
                                    style={{backgroundColor: tableColors[personIndex+1]}}>
                                        <DropDown 
                                        label="" 
                                        type={"light"}
                                        options={recipeOptions} 
                                        defaultOption=''
                                        onOptionSelect={(newValue) => handleRecipeSelect(mealIndex, dayIndex, personIndex, false, newValue)}
                                    ></DropDown>
                                    </td>
                            ))}
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>

        <DropDown 
            label="Number of People" 
            options={numPeopleOptions} 
            defaultOption={numPeopleDefaultOption} 
            onOptionSelect={handleOptionSelect}
        ></DropDown>
        {Array.from({ length: parseInt(selectedNumPeopleOption) }, (_, index) => (
            <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <React.Fragment key={index}>
                    <TextInput 
                        key={index} 
                        label={`Person ${index + 1} Name:`} 
                        value={people[index] || ""}
                        onChange={(newValue) => handlePersonChange(index, newValue)}
                    />
                    <DropDown 
                    label=""
                    options={pastelColors} 
                    defaultOption={colorDefault} 
                    onOptionSelect={(newValue) => handleColorSelect(index, newValue)}></DropDown>
                </React.Fragment>
                </div>
        ))}
        <div className="p-4 max-w-md mx-auto">
        <h2 className="text-xl font-semibold mb-4">Grocery List</h2>
        <ul>
            {Object.entries(groceryList).map(([ingredient, quantity]) => (
            <li key={ingredient} className="flex justify-between border-b py-2">
                {Number(quantity) > 0 ? (
                    <React.Fragment key={ingredient}>
                        <span className="font-medium">{ingredient}: </span>
                        <span>{String(quantity)}</span>
                    </React.Fragment>
                ) : (
                    <span className="font-medium">{ingredient} </span>
                )}
            </li>
            ))}
        </ul>
        </div>
            
        </>
    );
}
  export default MealPlan;