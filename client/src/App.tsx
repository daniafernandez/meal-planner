import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./routes/AppRoutes.tsx";
import SiteHeader from "./components/SiteHeader.tsx"

function App() {
  return (
    <> 
    <Router> 
      <SiteHeader />
      <AppRoutes />
    </Router>
      
    </>
    
  );
}

export default App
