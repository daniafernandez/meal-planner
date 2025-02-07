import React from 'react';
import { useState } from 'react';
import DropDown from "../components/DropDown.tsx"
import TextInput from '../components/TextInput.tsx';


function MealPlan() {
    
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];
    const chef = 'Little Bear'
    const peoplex = ['Austin', 'Dania', 'Moose']
    const numPeopleOptions = ["1","2","3","4","5","6"]
    const numPeopleDefaultOption = "2"

    const [selectedOption, setSelectedOption] = useState<string>(numPeopleDefaultOption); 
    const [peopleFinal, setPeopleFinal] = useState<string[]>([]); 

    const handleOptionSelect = (option: string) => {
        setSelectedOption(option);  
    };

    const applyNames = () => {
        setPeopleFinal(peoplex);  
    };

    return (
        <>
        <p>{selectedOption}</p>
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
                            <th rowSpan={parseInt(selectedOption)}>{meal}</th>
                            {daysOfWeek.map((_, dayIndex) => (
                                <td key={`${mealIndex}-${dayIndex}`} className="personCellTop">{chef}</td>
                            ))}
                        </tr>
                        {peopleFinal.map((person, personIndex) => (
                            <tr key={`${mealIndex}-${personIndex}`}>
                                 {daysOfWeek.map((_, dayIndex) => (
                                <td key={`${mealIndex + 1}-${personIndex}-${dayIndex}`} className={personIndex === peopleFinal.length-1 ? "personCellBottom":"personCellMiddle"}>{person}</td>
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
        <TextInput 
            key={index} 
            label={`Person ${index + 1} Name:`} 
            onInput={applyNames}
        />
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