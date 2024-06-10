import React, { useState, useEffect } from "react";
import { IoCloseCircleSharp, IoHammerSharp } from "react-icons/io5";
import { connect } from "react-redux";
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

function UserAccaunt({ userData, onDelete }) {
  const navigate = useNavigate();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down("md"));

const [formData, setFormData] = useState(null);
const [timeLogData, setTimeLogData] = useState(null);
const [timeLogDataAdd, setTimeLogDataAdd] = useState(null);
const [salaryData, setSalaryData] = useState(null);

useEffect(() => {
    fetchMe()
    fetchTimelogs()
    fetchSalary();
}, []);

  const handleEditClick = (id) => {
    if (formData && formData.id) {
        navigate("/edit", { state: { userId: id, isAdmin: false } });
    }
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
      axios.post("http://localhost:8082/time-logs",
          timeLogDataAdd,
          {
              withCredentials: true,
              headers: {
                  'Content-Type': 'application/json',
              }
          })
      .then(response => {
        console.log(response);
        setTimeLogDataAdd(response.data);
        fetchSalary();
        fetchTimelogs()
        // Устанавливаем состояние успешности операции в true
        setSubmitSuccess(true);
      })
      .catch(error => {
        console.error('Ошибка при добавлении данных отработанных часов:', error);
        setSubmitSuccess(false);
      });
  };

  const fetchSalary = () => {
      axios
          .get("http://localhost:8082/statistics/salary", { withCredentials: true })
          .then(response => {
              console.log(response);
              setSalaryData(response.data);
          })
          .catch(error => console.error('Ошибка при получении заработной платы:', error));
  }

  const fetchTimelogs = () => {
    axios
        .get("http://localhost:8082/time-logs/some", { withCredentials: true })
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

  const fetchMe = () => {
      axios
          .get("http://localhost:8082/users/me", { withCredentials: true })
          .then(response => {
              console.log(response);
              setFormData(response.data);
          })
          .catch(error => console.error('Ошибка при получении данных пользователя:', error));
  }

  const handleTimelogChange = (e) => {
      const { name, value } = e.target;
      setTimeLogDataAdd((prevData) => ({
          ...prevData,
          [name]: value,
      }));
      setErrors((prevErrors) => ({
          ...prevErrors,
          [name]: "",
      }));
      // Сбрасываем состояние успешности при изменении данных
      setSubmitSuccess(false);
  }

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
      <div>
          <div className="user-container">
              <div className="user-image">
                  {formData && formData.photo && (
                      <img id="img" src={formData.photo} alt={`${formData.firstName} ${formData.lastName}`}/>
                  )}
              </div>
              <div className="user-details">
                  {
                      formData
                          ? ( // Check if formData is not null
                              <React.Fragment>
                                  <h3>{formData.firstName} {formData.lastName}, {formData.age} лет</h3>
                                  <p style={{color: "grey", marginBottom: "20px"}}>{formData.job}</p>
                                  <p><b><i>Почта:</i></b> {formData.email}</p>
                                  <p><b><i>Телефон:</i></b> {formData.phoneNumber}</p>
                                  <p><b><i>Ставка:</i></b> {formData.rate}</p>
                                  <p><b><i>БИО:</i></b> {formData.bio}</p>
                                  <p style={{marginTop: "5px"}}><i><b>Цитата:</b></i> {formData.quote}</p>
                                  <p style={{marginTop: "20px"}}><i>{formData.country}, {formData.city}</i></p>
                                  <div className="user-actions">
                                    <IoHammerSharp onClick={() => handleEditClick(formData.id)} className="edit-icon" />
                                </div>
                              </React.Fragment>
                          )
                          : ( <p>Loading...</p> )
                  }
            </div>
          </div>

          <div className="user-container-salary">
              <table className="user-salary-table">
                  <tbody>
                  <tr>
        {
          timeLogData && (
              <td className="user-salary-table-td" style={{align:"left"}}><p><b><i>Общее количество отработанных часов: </i></b> {timeLogData}</p></td>
          )
        }
        <td className="user-salary-table-td">
            <React.Fragment>
                  <TextField className={classes.textField}
                          variant="standard"
                          type="number"
                          label="Отработанные часы"
                          name="timeCountHours"
                          onChange={e => handleTimelogChange(e)}
                  />
            </React.Fragment>
            </td>
</tr>
                  <tr>
                  <td className="user-salary-table-td" style={{width: '55%'}}>
                      {
                          salaryData
                              ? (
                                  <React.Fragment>
                                      <p><b><i>Заработанная плата: </i></b> {salaryData.salary}</p>
                                  </React.Fragment>)
                              : (<p>Loading...</p>)
                      }
                      </td>
                      <td className="user-salary-table-td">
                          <React.Fragment>
                              <Button className={classes.button}
                                  type="submit"
                                  onClick={handleSubmit}>
                                  Добавить
                              </Button>
                          </React.Fragment>
                      </td>
                  </tr>
                  </tbody>
              </table>
          </div>
      </div>
    </Grid>
    
);}

export default UserAccaunt;