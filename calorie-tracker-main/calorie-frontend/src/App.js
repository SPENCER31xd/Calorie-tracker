import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./components/layout/Layout";
import LoginLayout from "./components/layout/LoginLayout";
import AdminScreen from "./pages/admin/AdminScreen";
import HomeScreen from "./pages/home/HomeScreen";
import LoginForm from "./pages/login/LoginForm";
import RegisterForm from "./pages/login/RegisterForm";
import ProfileScreen from "./pages/profile/ProfileScreen";
import ProgressScreen from "./pages/progress/ProgressScreen";
import { api } from "./axios.config";
import { useEffect } from "react";

function App() {
  const testApi = async () => {
    await api.get("/hello").then((data) => {
      console.log("HELLO! API_STARTED!");
    })
  }

  useEffect(() => {
    testApi()
  },[]);
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<LoginLayout />}>
          <Route index path="login" element={<LoginForm />} />
          <Route path="register" element={<RegisterForm />} />
        </Route>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomeScreen />} />
          <Route path="progress" element={<ProgressScreen />} />
          <Route path="profile" element={<ProfileScreen />} />
          <Route path="admin" element={<AdminScreen />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
