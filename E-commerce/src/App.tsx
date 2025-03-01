// import Dashboard from "./Components/Dashboard";
import EcommerceLogin from "./Components/Login";
import Navbar from "./Components/Navbar";
import OtpTest from "./Components/OtpTest";
import EcommerceSignUp from "./Components/Signup";
import ProtectedRoute from "./Components/ProtectedRoute";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import InterestsPage from "./Components/Dashboard";

const App = () => {
  return (
    <Router>
      <div className="overflow-hidden font-poppins">
        <Navbar />
        <Routes>
          <Route path="/" element={<EcommerceSignUp />} />
          <Route path="/signup" element={<EcommerceSignUp />} />
          <Route path="/otp-verification" element={<OtpTest />} />
          <Route path="/login" element={<EcommerceLogin />} />
          <Route
            path="/dashboard"
            element={<ProtectedRoute element={<InterestsPage/>} />}
          />
        </Routes>
      </div>
    </Router>
  );
};

export default App;
