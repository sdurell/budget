import { Route, Routes, useLocation } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import MySpinner from "./components/MySpinner";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import { UserProvider } from './contexts/UserContext';
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
      <MySpinner/>
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
              <UserProvider>
                <Home />
              </UserProvider>
            </ProtectedRoute>
          }
          />
        </Routes>
      </main>
    </div>
  )
}


export default App
