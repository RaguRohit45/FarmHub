import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Home from "./Home";
import About from "./About";
import Contact from "./Contact";
import Login from "./Login";
import UserLogin from "./UserLogin";
import FarmerLogin from "./FarmerLogin";
import UserSignup from "./UserSignup";
import FarmerSignup from "./FarmerSignup";
import FarmerUploads from "./FarmerUploads";
import AllVideos from "./AllVideos";
import Ask from "./Ask";
import Privacy from "./Privacy";
import Terms from "./Terms";
import AskFarmer from "./AskFarmer";

const RequireAuth = ({ children }) => {
  const token = localStorage.getItem("token");
  if (!token) {
    return <Navigate to="/login" replace state={{ msg: "Login required to access this page" }} />;
  }
  return children;
};

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/login" element={<Login />} />
        <Route path="/login/user" element={<UserLogin />} />
        <Route path="/login/farmer" element={<FarmerLogin />} />
        <Route path="/signup/user" element={<UserSignup />} />
        <Route path="/signup/farmer" element={<FarmerSignup />} />
        <Route path="/farmerupload" element={<FarmerUploads />} />
        <Route path="/ask" element={<RequireAuth><Ask /></RequireAuth>} />
        <Route path="/learn" element={<RequireAuth><AllVideos /></RequireAuth>} />
        <Route path="/privacy" element={<Privacy />} />
        <Route path="/terms" element={<Terms />} />
        <Route path="/askfarmer" element={<RequireAuth><AskFarmer /></RequireAuth>} />
      </Routes>
    </Router>
  );
}

export default App;
