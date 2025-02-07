function MealPlan() {
    return (
        <>

        <table>
            <thead>
                <tr>
                    <th></th> 
                    <th>Monday</th>
                    <th>Tuesday</th>
                    <th>Wednesday</th>
                    <th>Thursday</th>
                    <th>Friday</th>
                    <th>Saturday</th>
                    <th>Sunday</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                <th rowSpan={2}>Breakfast</th>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                </tr>
                <tr>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                </tr>
                <tr>
                <th rowSpan={2}>Lunch</th>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                </tr>
                <tr>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                </tr>
                <tr>
                <th rowSpan={2}>Dinner</th>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                <td className="personA"></td>
                </tr>
                <tr>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                <td className="personD"></td>
                </tr>
            </tbody>
        </table>


        </>
    );
  }
  
  export default MealPlan;