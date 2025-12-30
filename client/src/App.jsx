import { BrowserRouter, Routes, Route } from "react-router";
import Login from "./pages/Login.jsx";
import Registration from "./pages/Registration.jsx";
import Home from "./pages/Home.jsx";
import Layout from "./components/layout/index.jsx";
function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Registration />} />
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
export default App;
