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

    const pastelColors: string[] = [
        "lightgray", "lavender", "lightblue", "skyblue", "beige", "peachpuff", "lightpink", 
        "lavenderblush", "palegreen", "lightgreen", "lightcyan", "mistyrose", "lightyellow"
      ];
    const colorDefault = pastelColors[2]
      
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];
    const numPeopleOptions = ["1","2","3","4","5","6"]
    const numPeopleDefaultOption = "1"

    const [selectedOption, setSelectedOption] = useState<string>(numPeopleDefaultOption); 
    const [peopleRows, setPeopleRows] = useState<string>('1'); 
    const [people, setPeople] = useState<string[]>(Array(parseInt(numPeopleDefaultOption)).fill(""));
    const [peopleTotal, setPeopleTotal] = useState<string[]>([]); 
    const peopleExtra = useMemo(() => people.slice(1), [peopleTotal]);
    const [cook, setCook] = useState<string>(people[0] || "");
    const [tableColors, setTableColors] = useState<string[]>(Array(parseInt(numPeopleDefaultOption)).fill(colorDefault)); 

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);  
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

    const applyNames = () => {
        setPeopleTotal(people);  
        setCook(people[0] || "");
        setPeopleRows(selectedOption)
        //setTableColors(Array(parseInt(selectedOption)).fill(colorDefault));
    };

    return (
        <>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        {peopleTotal.map((person, personIndex) => (
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
                            <th rowSpan={parseInt(peopleRows)}>{meal}</th>
                            {daysOfWeek.map((_, dayIndex) => (
                                <td 
                                    key={`${mealIndex}-${dayIndex}`} 
                                    className="personCellTop"
                                    style={{backgroundColor: tableColors[0]}}>
                                        <DropDown 
                                        label="" 
                                        options={recipeOptions} 
                                        defaultOption={recipeOptions[0]} 
                                        onOptionSelect={handleOptionSelect}
                                    ></DropDown>
                                </td>
                            ))}
                        </tr>
                        {peopleExtra.map((person, personIndex) => (
                            <tr key={`${mealIndex}-${personIndex}`}>
                                 {daysOfWeek.map((_, dayIndex) => (
                                <td 
                                    key={`${mealIndex + 1}-${personIndex}-${dayIndex}`} 
                                    className={personIndex === peopleExtra.length-1 ? "personCellBottom":"personCellMiddle"} 
                                    style={{backgroundColor: tableColors[personIndex+1]}}>
                                        <DropDown 
                                        label="" 
                                        options={recipeOptions} 
                                        defaultOption={recipeOptions[0]} 
                                        onOptionSelect={handleOptionSelect}
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
        {Array.from({ length: parseInt(selectedOption) }, (_, index) => (
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
                    <p style={{color: tableColors[index]}}>color</p>
                </React.Fragment>
                </div>
        ))}
        <button
            type="button"
            className={"btn btn-primary"}
            onClick={applyNames}
            >
            Apply Names
            </button>
        </>
    );
}
  export default MealPlan;