import React, { useState, useEffect } from "react";
import { IoCloseCircleSharp, IoHammerSharp } from "react-icons/io5";
import { connect } from "react-redux";
import { deleteUser } from "../Redux/actions";
import { useNavigate } from "react-router";
import { createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Table from "@mui/material/Table";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const theme = createTheme();

function Users(onDelete ) {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const matchesDesktop = useMediaQuery(theme.breakpoints.down("md"));

  const handleEditClick = () => {
    if (usersData && usersData.id) {
      navigate("/edit", { state: { userId: usersData.id } });
    }
  };

  useEffect(() => {
    // Запрос данных всех пользователей с сервера
    axios
      .get("http://localhost:8082/users", {
        withCredentials: true
      })
      .then(response => {
        console.log(response);
        setUsersData(response.data.content);
      })
      .catch(error => console.error('Ошибка при получении данных пользователей:', error));
  }, []);

  return (
    <Grid item xs={1} sm={matchesDesktop ? 12 : 12} >
      {usersData.map((user) => (
        <div>
            <div className="user-container">
              <div className="user-image">
              {user && user.photo && (
                <img id="img" src={user.photo} alt={`${user.firstName} ${user.lastName}`} />
              )}
              </div>
              <div className="user-details">
              {user ? ( // Check if formData is not null
                <React.Fragment>
                <h3>{user.firstName} {user.lastName}, {user.age} лет</h3>
                <p style={{color: "grey", marginBottom: "20px" }}>{user.job}</p>
                <p><b><i>Почта:</i></b> {user.email}</p>
                <p><b><i>Телефон:</i></b> {user.phoneNumbers}</p>
                <p><b><i>Ставка:</i></b> {user.rate}</p>
                <p><b><i>БИО:</i></b> {user.bio}</p>
                <p style={{marginTop: "5px" }}><i><b>Цитата:</b></i> {user.quote}</p>
                <p style={{marginTop: "20px" }}><i>{user.country}, {user.city}</i></p>
                </React.Fragment>
              ) : (
                <p>Loading...</p> // Display a loading message while formData is being fetched
              )}
                <div className="user-actions">
                  <IoHammerSharp onClick={handleEditClick} className="edit-icon" />
                    <IoCloseCircleSharp onClick={() => onDelete(user.id)} className="delete-icon" />
                </div>
              </div>
            </div>
        </div>
      ))}
    </Grid>
  );
}

export default Users;