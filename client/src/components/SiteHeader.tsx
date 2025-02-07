import { Link } from "react-router-dom"; 

function SiteHeader() {
    return (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
          <Link to="/">Home</Link> | 
          <Link to="/recipes">Recipes</Link> | 
          </nav>
        </>
      )
}
export default SiteHeader