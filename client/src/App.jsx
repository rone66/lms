import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/commons/Navbar";
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import OpenRoute from "./components/core/auth/OpenRoute";
import ForgotPassword from "./pages/ForgotPassword";
import Error from "./pages/Error";
import UpdatePassword from "./pages/UpdatePassword";
import VerifyEmail from "./pages/VerifyEmail";
import About from "./pages/About";
import Contact from "./pages/Contact";
import MyProfile from "./components/core/dashboard/MyProfile";
import PrivateRoute from "./components/core/auth/PrivateRoute";
import Dashboard from "./pages/Dashboard";
import Settings from "./components/core/dashboard/Settings/index";
import EnrolledCourses from "./components/core/dashboard/EnrolledCourses";



function App() {
  return (
  <div className="w-screen min-h-screen flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />

      <Route
          path="signup"
          element={
            <OpenRoute>
              <Signup />
            </OpenRoute>
          }
        />
    <Route
          path="login"
          element={
            <OpenRoute>
              <Login />
            </OpenRoute>
          }
        />

    <Route
          path="forgot-password"
          element={
            <OpenRoute>
              <ForgotPassword/>
            </OpenRoute>
          }
        />
    <Route
          path="update-password/:id"
          element={
            <OpenRoute>
              <UpdatePassword/>
            </OpenRoute>
          }
        />
    <Route
          path="verify-email"
          element={
            <OpenRoute>
              <VerifyEmail/>
            </OpenRoute>
          }
        />
    <Route
          path="about"
          element={
            <OpenRoute>
              <About/>
            </OpenRoute>
          }
        />

    <Route
          path="contact"
          element={
            <OpenRoute>
              <Contact/>
            </OpenRoute>
          }
        />
    
    <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
    >
    <Route path="dashboard/my-profile" element={<MyProfile/>}/>


    <Route path="dashboard/settings" element={<Settings/>}/>

    <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>

    </Route>

    


    <Route
          path="*"
          element={
            <OpenRoute>
              <Error/>
            </OpenRoute>
          }
        />

    </Routes>

  </div>
  );
}

export default App;
