import { useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router";
import { useDispatch } from "react-redux";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import Home from "./pages/Home.jsx";
import History from "./pages/History.jsx";
import Layout from "./components/layout/index.jsx";
import PrivateRoute from "./components/auth/PrivateRoute.jsx";
import { fetchCurrentUser } from "./store/slices/authSlice";

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    // Try to fetch current user (works when server sets httpOnly cookie)
    dispatch(fetchCurrentUser());
  }, [dispatch]);

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        {/* Home is public: shortener is available to all; history/profile shown after login */}
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route
            path="history"
            element={
              <PrivateRoute>
                <History />
              </PrivateRoute>
            }
          />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
