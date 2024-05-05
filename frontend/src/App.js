import React, {useState} from "react"
import Header from "./components/Header"
import Users from "./components/Users/Users"
import AddUser from "./components/Forms/AddUser"
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Mbicycle from "./components/Mbicycle"
import store from "./components/Redux/store";
import { Provider } from "react-redux";
import EditUser from "./components/Forms/EditUser";
import JavaPage from "./components/Cards/JavaPage"
import NETPage from "./components/Cards/NETPage";
import FlutterPage from "./components/Cards/FlutterPage";
import ProjectsPage from "./components/Cards/ProjectsPage";
import JavaUsers from "./components/Users/JavaUsers";
import NETUsers from "./components/Users/NETUsers";
import FlutterUsers from "./components/Users/FlutterUsers";
import EntrUser from "./components/Forms/EntrUser";
import EntrAdmin from "./components/Forms/EntrAdmin";
import UserAccaunt from "./components/Accaunts/UserAccaunt";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <div>
          <Header />
          <Routes>
            {/* Главная страница */}
            <Route path="/" element={<Mbicycle />} />

            {/* Страница добавления пользователя */}
            <Route path="/add" element={
                <aside>
                  <AddUser />
                </aside>
              }
            />

            <Route path="/userAccaunt" element={
                <aside>
                  <UserAccaunt />
                </aside>
              }
            />

            <Route path="/entrUser" element={
                <aside>
                  <EntrUser />
                </aside>
              }
            />

            <Route path="/entrAdmin" element={
                <aside>
                  <EntrAdmin />
                </aside>
              }
            />

             {/* Маршрут для отображения формы редактирования */}
             <Route path="/edit" element={
                <main>
                  <EditUser />
                </main>
              }
            />

            {/* Страница персонала */}
            <Route path="/users" element={
                <main>
                  <Users />
                </main>
              }
            />

            {/* Страницы для карточек */}
            <Route path="/java-development" element={ <JavaPage /> } />

            <Route path="/net-development" element={ <NETPage /> } />

            <Route path="/flutter-development" element={ <FlutterPage /> } />

            <Route path="/projects" element={ <ProjectsPage /> } />

            {/* Страницы для персонала */}
            
            <Route path="/java-users" element={ <JavaUsers /> } />

            <Route path="/net-users" element={ <NETUsers /> } />

            <Route path="/flutter-users" element={ <FlutterUsers /> } />

          </Routes>
        </div>
      </BrowserRouter>
    </Provider>
  );
}

export default App;