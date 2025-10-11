import { Loader, MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
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

  return (
    <MantineProvider>
      {shouldShowNavbar && <MyNavbar />}
      <main className="main-content">
        {/* display spinner if initializing */}
        {initializing && 
        <div className="d-flex justify-content-center align-items-center vh-100"><Loader color="blue" size="lg" /></div>}
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
    </MantineProvider>
  )
}


export default App
