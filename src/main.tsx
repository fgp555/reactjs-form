import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import HomePage from "./app/home/HomePage";
import { BrowserRouter, Route, Routes } from "react-router";
import Navbar from "./components/_layouts/Navbar/Navbar";
import LoginPage from "./app/login/LoginPage";
import RegisterPage from "./app/login/Register";
import RegisterFormik from "./app/login/RegisterFormik";
import TutorialPage from "./pages/TutorialPage";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <BrowserRouter>
      <Navbar />
      <main>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LoginPage />} />
          <Route path="/register" element={<RegisterPage />} />
          <Route path="/register-formik" element={<RegisterFormik />} />
          <Route path="/Tutorial" element={<TutorialPage />} />
        </Routes>
      </main>
    </BrowserRouter>
  </StrictMode>
);

document.body.setAttribute("data-theme", "dark");
