import { Route, Routes } from "react-router-dom";
import MySpinner from "./components/MySpinner";
import PrivatePage from "./components/PrivatePage";
import ProtectedRoute from "./components/ProtectedRoute";
import { useAuth } from "./contexts/AuthContext";
import { UserProvider } from './contexts/UserContext';
import Home from "./pages/Home";
import Login from "./pages/Login";
import Statements from "./pages/Statements";

function App() {
  const { initializing } = useAuth();

  if (initializing) {
    return (
      <MySpinner/>
    );
  }

  return (
    <>
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


export default App
