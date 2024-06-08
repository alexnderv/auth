import React, { useState } from "react";
import Header from "./components/Header";
import Users from "./components/Users/Users";
import AddUser from "./components/Forms/AddUser";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mbicycle from "./components/Mbicycle";
import EditUser from "./components/Forms/EditUser";
import JavaPage from "./components/Cards/JavaPage";
import NETPage from "./components/Cards/NETPage";
import FlutterPage from "./components/Cards/FlutterPage";
import ProjectsPage from "./components/Cards/ProjectsPage";
import Auth from "./components/Forms/Auth";
import Footer from "./components/Footer";
import UserAccaunt from "./components/Accaunts/UserAccaunt";

function App() {
  return (
    <BrowserRouter>
      <div>
        <Header />
        <Routes>
          {/* Главная страница */}
          <Route path="/" element={<Mbicycle />} />

          {/* Страница добавления пользователя */}
          <Route path="/add" element={<AddUser />} />

          <Route path="/userAccaunt" element={<UserAccaunt />} />

          <Route path="/auth" element={<Auth />} />

          {/* Маршрут для отображения формы редактирования */}
          <Route path="/edit" element={<EditUser />} />

          {/* Страница персонала */}
          <Route path="/users" element={<Users />} />

          {/* Страницы для карточек */}
          <Route path="/java-development" element={<JavaPage />} />

          <Route path="/net-development" element={<NETPage />} />

          <Route path="/flutter-development" element={<FlutterPage />} />

          <Route path="/projects" element={<ProjectsPage />} />
        </Routes>
        <Footer />
      </div>
    </BrowserRouter>
  );
}

export default App;