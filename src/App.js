import { BrowserRouter as Router, useNavigate } from "react-router-dom";
import AllRoutes from "./AllRoutes";
import "./App.css";
import Navbar from "./components/Navbar";
import { useNavigation } from "./context/NavContext";

function App() {
  const { isNavOpen } = useNavigation();
  return (
    <Router>
      <div className="flex flex-col">
        <Navbar />
        <AllRoutes className={`${isNavOpen && "hidden"}`} />
      </div>
    </Router>
  );
}

export default App;
