import { Route, Routes } from "react-router-dom";
import NavBar from "./components/NavBar";
import './css/App.css';
import Favorites from "./pages/Favorites.jsx";
import Home from "./pages/Home.jsx";

function App() {

  return (
    <div>
      <NavBar />
      <main className="main-content">
      <Routes>
        <Route path="/" element={<Home />}/>
        <Route path="/favorites" element={<Favorites/>}/>
      </Routes>
      </main>
    </div>
  )
}


export default App
