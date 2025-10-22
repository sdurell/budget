import { useEffect } from "react";
import { Alert } from "react-bootstrap";
import { Route, Routes } from "react-router-dom";
import MySpinner from "./components/MySpinner";
import NetworkErr from "./components/NetworkErr";
import PrivatePage from "./components/PrivatePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import { UserProvider } from './contexts/UserContext';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Statements from "./pages/Statements";
import api from "./services/api";

export default function App() {
  const { 
    initializing, 
    initNetworkErr, 
    midSessionNetworkErr, 
    setMidSessionNetworkErr 
    } = useAuth();

  // handles global liveness check
  useEffect(() => {
    // liveness check for initial network err is handled differently in components/NetworkErr
    if (initNetworkErr) return;

    const interval = setInterval(async () => {
      try {
        await api.get("/auth/liveness");
        setMidSessionNetworkErr(false)
      } catch {
        setMidSessionNetworkErr(true)
      }
    }, 2 * 60 * 1000);

    return () => clearInterval(interval);
  }, [initNetworkErr, setMidSessionNetworkErr]);

  if (initializing) return (
      <MySpinner/>
    );

  if (initNetworkErr) return (
      <NetworkErr/>
    );

  return (
    <>
      { midSessionNetworkErr && (
        <Alert variant="danger" dismissible={false} className="text-center">
          Lost connection to backend. Retrying...
        </Alert>
      )}
      <Routes>
        {/* Public route */}
        <Route path="/login" element={<Login />}/>

        {/* Private routes */}
        <Route element={
          <ProtectedRoute>
            <UserProvider>
              <PrivatePage/>
            </UserProvider>
          </ProtectedRoute>
        }>
          <Route path="/" element={<Home/>}/>
          <Route path="/statements" element={<Statements/>}/>
        </Route>
      </Routes>
    </>
  )
}