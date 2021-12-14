import { BrowserRouter, Route, Routes } from "react-router-dom";
import HomeView from "./views/HomeView";
import './App.css';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomeView/>}/>
      </Routes>
    </BrowserRouter>
  )
}

export default App;
