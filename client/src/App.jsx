import { Route, Routes } from "react-router-dom";
import "./App.css";
import Home from "./pages/Home";
import Navbar from "./components/commons/Navbar";

function App() {
  return (
  <div className="w-screen min-h-screen flex flex-col font-inter">
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>} />
    </Routes>
  </div>
  );
}

export default App;
