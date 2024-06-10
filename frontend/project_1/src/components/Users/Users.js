import React, { useState, useEffect } from "react";
import { IoCloseCircleSharp, IoHammerSharp } from "react-icons/io5";
import { useNavigate } from "react-router";
import { createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import axios from "axios";
import Table from "@mui/material/Table";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";

const theme = createTheme();

function Users(onDelete ) {
  const navigate = useNavigate();
  const [usersData, setUsersData] = useState([]);
  const [timeLogData, setTimeLogData] = useState(null);
const [timeLogDataAdd, setTimeLogDataAdd] = useState(null);
const [salaryData, setSalaryData] = useState(null);
  const matchesDesktop = useMediaQuery(theme.breakpoints.down("md"));
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [errors, setErrors] = useState({});

  const handleEditClick = (id) => {
      navigate("/edit", { state: { userId: id, isAdmin: true } });    
  };

const fetchTimelogs = () => {
axios
    .get("http://localhost:8082/time-logs/all", { withCredentials: true })
    .then(response => {
        console.log(response);
        const totalTimeCountHours = response.data.content.reduce((acc, item) => acc + item.timeCountHours, 0); // Считаем сумму отработанных часов
        setTimeLogData(totalTimeCountHours);
        console.log(totalTimeCountHours)
    })
    .catch(error => console.error('Ошибка при получении данных отработанных часов:', error));
}

useEffect(() => {
fetchTimelogs();
}, []);


const handleDeleteClick = (id) => {
  axios
    .delete(`http://localhost:8082/users/${id}`, {
      withCredentials: true,
    })
    .then((response) => {
      console.log(response);
      setUsersData(usersData.filter((user) => user.id !== id));
      alert('Успешное удаление пользователя!');
    })
    .catch((error) => console.error('Ошибка при удалении пользователя:', error));
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

  const useStyles = makeStyles({
    button: {
      background: 'rgb(200, 200, 200)',
      border: 0,
      width: "90%",
      borderRadius: 3,
      boxShadow: 'rgb(160, 160, 160)',
      height: 48,
      color: "black",
    },
    textField: {
        width: "90%",
    }
  });

  const classes = useStyles();

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
                {
                  user
                      ? ( // Check if formData is not null
                          <React.Fragment>
                            <h3>{user.firstName} {user.lastName}, {user.age} лет</h3>
                            <p style={{color: "grey", marginBottom: "20px"}}>{user.job}</p>
                            <p><b><i>Почта:</i></b> {user.email}</p>
                            <p><b><i>Телефон:</i></b> {user.phoneNumber}</p>
                            <p><b><i>Ставка:</i></b> {user.rate}</p>
                            <p><b><i>БИО:</i></b> {user.bio}</p>
                            <p style={{marginTop: "5px"}}><i><b>Цитата:</b></i> {user.quote}</p>
                            <p style={{marginTop: "20px"}}><i>{user.country}, {user.city}</i></p>
                            <div className="user-actions">
                            <IoHammerSharp onClick={() => handleEditClick(user.id)} className="edit-icon" />
                            <IoCloseCircleSharp onClick={() => handleDeleteClick(user.id)} className="delete-icon" />                          </div>
                          </React.Fragment>
                      )
                      : (<p>Loading...</p>)
                }
              </div>

            </div>
      <div className="user-container-salary">
              <table className="user-salary-table">
                  <tbody>
                  <tr>
                    <td className="user-salary-table-td" style={{align:"left"}}><p><b><i>Общее количество отработанных часов: </i>
                    </b> {user.timeCountHours}</p></td>
                  </tr>
                  <tr>
                  <td className="user-salary-table-td" style={{width: '55%'}}>
                                  <React.Fragment>
                                      <p><b><i>Заработанная плата: </i></b> {user.salary}</p>
                                  </React.Fragment>
                      </td>
                  </tr>
                  </tbody>
              </table>
          </div>
          </div>
      ))}
    </Grid>
  );
}

export default Users;