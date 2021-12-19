import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import './App.css';
import NavBar from "./components/NavBar"
import SignupView from "./views/SignupView";

function App() {
  return (
    <BrowserRouter>
    <NavBar />
      <Routes>
        <Route path="/" element={<HomeView/>}/>
        <Route path="/singup" element={<SignupView/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
