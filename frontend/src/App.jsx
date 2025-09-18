import "bootstrap/dist/css/bootstrap.min.css";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {

  return (
    <main className="main-content">
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />}/>

        {/* Private route */}
        <Route path="/" element={
          <ProtectedRoute>
            <Home />
          </ProtectedRoute>
        }
        />
      </Routes>
    </main>
  )
}


export default App
