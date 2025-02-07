function SiteHeader() {
    return (
        <>
          <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="collapse navbar-collapse" id="navbarNavDropdown">
                <ul className="navbar-nav">
                <li className="nav-item active">
                    <a className="nav-link" href="#">Home</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">My Meal Plans</a>
                </li>
                <li className="nav-item">
                    <a className="nav-link" href="#">My Recipes</a>
                </li>
                </ul>
            </div>
          </nav>
        </>
      )
}
export default SiteHeader