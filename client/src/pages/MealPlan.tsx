import React from 'react';
import { useState, useMemo } from 'react';
import DropDown from "../components/DropDown.tsx"
import TextInput from '../components/TextInput.tsx';


function MealPlan() {

    const pastelColors: string[] = [
        "lightgray", "lavender", "lightblue", "skyblue", "beige", "peachpuff", "lightpink", 
        "lavenderblush", "palegreen", "lightgreen", "lightcyan", "mistyrose", "lightyellow"
      ];
    const [color, setColor] = useState<string>();
    const colorDefault = "lavender"
    
      
      
    
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
    const [tableColors, setTableColors] = useState<string[]>(Array(parseInt(numPeopleDefaultOption)).fill({colorDefault})); 

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
    };

    return (
        <>
        <p style={{ color: color }}>hello</p>
        <DropDown 
            label="Person's Table Color" 
            options={pastelColors} 
            defaultOption={pastelColors[1]} 
            onOptionSelect={handleColorSelect}></DropDown>
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
                                        {cook}
                                    </td>
                            ))}
                        </tr>
                        {peopleExtra.map((person, personIndex) => (
                            <tr key={`${mealIndex}-${personIndex}`}>
                                 {daysOfWeek.map((_, dayIndex) => (
                                <td 
                                    key={`${mealIndex + 1}-${personIndex}-${dayIndex}`} 
                                    className={personIndex === peopleExtra.length-1 ? "personCellBottom":"personCellMiddle"} 
                                    style={{backgroundColor: tableColors[personIndex+1]}}>{person}</td>
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
            <React.Fragment key={index}>
                <TextInput 
                    key={index} 
                    label={`Person ${index + 1} Name:`} 
                    value={people[index] || ""}
                    onChange={(newValue) => handlePersonChange(index, newValue)}
                />
                <DropDown 
                label="Table Cell Color"
                options={pastelColors} 
                defaultOption={pastelColors[1]} 
                onOptionSelect={(newValue) => handleColorSelect(index, newValue)}></DropDown>
                <p style={{color: tableColors[index]}}>color</p>
            </React.Fragment>
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