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
  axios
    .get("http://localhost:8082/users/me", { withCredentials: true })
    .then(response => {
      console.log(response);
      setFormData(response.data);
    })
    .catch(error => console.error('Ошибка при получении данных пользователя:', error));

  axios
    .get("http://localhost:8082/time-logs/some", { withCredentials: true })
    .then(response => {
      console.log(response);
      setTimeLogData(response.data);
    })
    .catch(error => console.error('Ошибка при получении данных отработанных часов:', error));

  axios
    .get("http://localhost:8082/statistics/salary", { withCredentials: true })
    .then(response => {
      console.log(response);
      setSalaryData(response.data);
    })
    .catch(error => console.error('Ошибка при получении заработной платы:', error));
}, []);

  const handleEditClick = () => {
    if (formData && formData.id) {
      navigate("/edit", { state: { userId: formData.id } });
    }
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    console.log(timeLogDataAdd);
    // Проверяем, что введено значение отработанных часов
    console.log("working2");
      axios.post("http://localhost:8082/time-logs", timeLogDataAdd, { 
      withCredentials: true
      })
      .then(response => {
        console.log(response);
        setTimeLogDataAdd(response.data);
        // Устанавливаем состояние успешности операции в true
        setSubmitSuccess(true);
      })
      .catch(error => {
        console.error('Ошибка при добавлении данных отработанных часов:', error);
        setSubmitSuccess(false);
      });
    
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
    // Сбрасываем состояние успешности при изменении данных
    setSubmitSuccess(false);
  };

  return (
    <Grid item xs={1} sm={matchesDesktop ? 12 : 12} >
      <div>
          <div className="user-container">
            <div className="user-image">
            {formData && formData.photo && (
              <img id="img" src={formData.photo} alt={`${formData.firstName} ${formData.lastName}`} />
            )}
            </div>
            <div className="user-details">
            {formData ? ( // Check if formData is not null
              <React.Fragment>
              <h3>{formData.firstName} {formData.lastName}, {formData.age} лет</h3>
              <p style={{color: "grey", marginBottom: "20px" }}>{formData.job}</p>
              <p><b><i>Почта:</i></b> {formData.email}</p>
              <p><b><i>Телефон:</i></b> {formData.phoneNumbers}</p>
              <p><b><i>Ставка:</i></b> {formData.rate}</p>
              <p><b><i>БИО:</i></b> {formData.bio}</p>
              <p style={{marginTop: "5px" }}><i><b>Цитата:</b></i> {formData.quote}</p>
              <p style={{marginTop: "20px" }}><i>{formData.country}, {formData.city}</i></p>
              </React.Fragment>
            ) : (
              <p>Loading...</p> // Display a loading message while formData is being fetched
            )}
              <div className="user-actions">
                <IoHammerSharp onClick={handleEditClick} className="edit-icon" />
              </div>
            </div>
          </div>
          <div className="user-container-salary">
             <table className="user-salary-table">
             {timeLogData ? ( 
              <React.Fragment>
                <td className="user-salary-table-td"><p><b><i>Отработанные часы: </i></b> {timeLogData.timeCountHours}</p></td>
              </React.Fragment>
              ) : (
                <p>Loading...</p> // Display a loading message while formData is being fetched
              )}
                <td className="user-salary-table-td">
                {timeLogDataAdd ? ( 
              <React.Fragment>
                <form onSubmit={handleSubmit}>
                    <TextField variant="standard" label="Отработанные часы" name="timeCountHours" value={timeLogDataAdd.timeCountHours} onChange={handleChange}/>
                </form>
                </React.Fragment>
              ) : (
                <p>Loading...</p> // Display a loading message while formData is being fetched
              )}
                </td>
                {salaryData ? ( 
              <React.Fragment>
                <td className="user-salary-table-td"><p><b><i>Заработанная плата: </i></b> {salaryData.salary}</p></td>
                <td className="user-salary-table-td">
                  <Button onClick={handleSubmit} type="submit">Добавить</Button>
                </td>
              </React.Fragment>
                ) : (
                  <p>Loading...</p> // Display a loading message while formData is being fetched
                )}
            </table>
          </div>
      </div>
    </Grid>
    
);}

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(deleteUser(id)),
});

export default connect(null, mapDispatchToProps)(UserAccaunt);