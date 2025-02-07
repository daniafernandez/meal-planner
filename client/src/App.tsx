import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.tsx";
import SiteHeader from "./components/SiteHeader.tsx"


function App() {
  return (
    <> 
    
      <Router> 
          <SiteHeader />
          <main className="main-content">
            <AppRoutes />
          </main>
      </Router>
    
    </>
    
  );
}

export default App
