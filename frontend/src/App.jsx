import { Spinner } from "react-bootstrap";
import { Route, Routes, useLocation } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import { TransactionProvider } from './contexts/TransactionContext';
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const location = useLocation();
  const { initializing, token } = useAuth();
  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ["/login"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname) && !initializing && token; // added token to avoid showing when switch from home -> login (route isnt /login yet)

  if (initializing) {
    return (
      <div className="d-flex justify-content-center align-items-center vh-100">
        <Spinner animation="border" variant="info" style={{width:"3rem", height:"3rem", "--bs-spinner-border-width": "0.5rem"}}/>
      </div>
    );
  }

  return (
    <div>
      {shouldShowNavbar && <MyNavbar />}
      <main className="main-content">
        <Routes>
          {/* Public route */}
          <Route path="/login" element={<Login />}/>

          {/* Private route */}
          <Route path="/" element={
            <ProtectedRoute>
              <TransactionProvider>
                <Home />
              </TransactionProvider>
            </ProtectedRoute>
          }
          />
        </Routes>
      </main>
    </div>
  )
}


export default App
