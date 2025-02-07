import { Link } from "react-router-dom"; 
import "../styles/Navbar.css"

function SiteHeader() {
    return (
        <>
          <nav className="navbar">
            <div className="navbar-brand">
                <Link to="/">Meal Planner</Link>
            </div>
            <div className="navbar-links">
                <Link to="/" className="nav-link">Home </Link> 
                <Link to="/recipes" className="nav-link">Recipes</Link> 
                <Link to="/mealplan" className="nav-link">Meal Plan</Link> 
            </div>
          </nav>
        </>
      )
}
export default SiteHeader