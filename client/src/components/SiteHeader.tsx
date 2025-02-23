import { Link } from "react-router-dom"; 
import "../styles/Navbar.css"

function SiteHeader() {
    return (
        <>
          <nav className="navbar">
            <div className="navbar-brand">
                <h2 className="title">Household Meal Planner</h2>
            </div>
            <div className="navbar-links">
                <Link to="/mealplan" className="nav-link">Meal Plan</Link> 
            </div>
          </nav>
        </>
      )
}
export default SiteHeader