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
import Cart from "./components/core/dashboard/Cart/index";
import { ACCOUNT_TYPE } from "./utils/constants";
import { useSelector } from "react-redux";
import AddCourse from "./components/core/dashboard/AddCourse/index"
import MyCourses from "./components/core/dashboard/MyCourses";
import EditCourse from "./components/core/dashboard/EditCourse";
import Catalog from "./pages/Catalog";
import CourseDetails from "./pages/CourseDetails";
import ViewCourse from "./pages/ViewCourse";
import VideoDetails from "./components/core/viewCourse/VideoDetails";
import Instructor from "./components/core/dashboard/instructorDashboard/Instructor";


function App() {

  const { user } = useSelector((state) => state.profile)

  return (
  <div className="w-screen min-h-screen flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
      <Route path="/catalog/:catalogName" element={<Catalog/>} />
      <Route path="/courses/:courseId" element={<CourseDetails/>} />
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
          path="/about"
          element={
            <About />
          }
        />

    <Route path="/contact" element={<Contact />} />
    
    <Route
          element={
            <PrivateRoute>
              <Dashboard/>
            </PrivateRoute>
          }
    >
    <Route path="dashboard/my-profile" element={<MyProfile/>}/>


    <Route path="dashboard/settings" element={<Settings/>}/>

    

    {
      user?.accountType === ACCOUNT_TYPE.STUDENT && (
        <>
        <Route path="dashboard/enrolled-courses" element={<EnrolledCourses/>}/>
        <Route path="dashboard/cart" element={<Cart/>}/>
        </>
      )
    }

    {
      user?.accountType === ACCOUNT_TYPE.INSTRUCTOR && (
        <>
        <Route path="dashboard/add-course" element={<AddCourse/>}/>
        <Route path="dashboard/my-courses" element={<MyCourses/>}/>
        <Route path="dashboard/edit-course/:courseId" element={<EditCourse/>}/>
        <Route path="dashboard/instructor" element={<Instructor />} />
        </>
      )
    }

    </Route>

    <Route element={
      <PrivateRoute>
        <ViewCourse/>
      </PrivateRoute>
    }>

    {
      user?.accountType === ACCOUNT_TYPE.STUDENT && (
        <>
        <Route
        path="view-course/:courseId/section/:sectionId/sub-section/:subSectionId"
        element={<VideoDetails/>}
        />
        </>
       
      )
    }

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
