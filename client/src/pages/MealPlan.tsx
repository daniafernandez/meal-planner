import React from 'react';
import DropDown from "../components/DropDown.tsx"


function MealPlan() {
    
    const daysOfWeek = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
    const meals = ['Breakfast', 'Lunch', 'Dinner'];
    const chef = 'Little Bear'
    const people = ['Austin', 'Dania', 'Moose']
    const numPeopleOptions = ["1","2","3","4","5","6"]

    return (
        <>

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
                            <th rowSpan={people.length+1}>{meal}</th>
                            {daysOfWeek.map((_, dayIndex) => (
                                <td key={`${mealIndex}-${dayIndex}`} className="personCellTop">{chef}</td>
                            ))}
                        </tr>
                        {people.map((person, personIndex) => (
                            <tr key={`${mealIndex}-${personIndex}`}>
                                 {daysOfWeek.map((_, dayIndex) => (
                                <td key={`${mealIndex + 1}-${personIndex}-${dayIndex}`} className={personIndex === people.length-1 ? "personCellBottom":"personCellMiddle"}>{person}</td>
                            ))}
                            </tr>
                        ))}
                    </React.Fragment>
                ))}
            </tbody>
        </table>

        <DropDown label="Number of People" options={numPeopleOptions}></DropDown>

        </>
    );
}
  export default MealPlan;