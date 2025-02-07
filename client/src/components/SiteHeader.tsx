import { Link } from "react-router-dom"; 

function SiteHeader() {
    return (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/">Home</Link> | 
          <Link to="/recipes">Recipes</Link> | 
          <Link to="/mealplan">Meal Plan</Link> | 
          </nav>
        </>
      )
}
export default SiteHeader