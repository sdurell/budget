import { MantineProvider } from '@mantine/core';
import '@mantine/core/styles.css';
import { Route, Routes, useLocation } from "react-router-dom";
import MyNavbar from "./components/MyNavbar";
import ProtectedRoute from "./components/ProtectedRoute";
import Home from "./pages/Home";
import Login from "./pages/Login";

function App() {
  const location = useLocation();
  // Define routes where Navbar should be hidden
  const hideNavbarRoutes = ["/login"];
  const shouldShowNavbar = !hideNavbarRoutes.includes(location.pathname);

  return (
    <MantineProvider>
      {shouldShowNavbar && <MyNavbar />}
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
    </MantineProvider>
  )
}


export default App
