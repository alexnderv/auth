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

function User({ userData, onDelete }) {
  const navigate = useNavigate();
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const matchesMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState(null); // Set initial state to null

  useEffect(() => {
    // Запрос данных пользователя с сервера
    axios
        .get(
            "http://localhost:8082/users",
            {
                withCredentials: true
            })
        .then(response => {
          console.log(response);
          setFormData(response.data);
        })
        .catch(error => console.error('Ошибка при получении данных пользователя:', error));


        axios
        .get(
            "http://localhost:8082/time-logs/all",
            {
                withCredentials: true
            })
        .then(response => {
          console.log(response);
          setFormData(response.data);
        })
        .catch(error => console.error('Ошибка при получении данных отработанных часов:', error));
        
        axios
        .post(
            "http://localhost:8082/time-logs",
            {
                withCredentials: true
            })
        .then(response => {
          console.log(response);
          setFormData(response.data);
        })
        .catch(error => console.error('Ошибка при добавлении данных отработанных часов:', error));
  }, []);

  const handleEditClick = () => {
    if (formData && formData.id) {
      navigate("/edit", { state: { userId: formData.id } });
    }
  };

  const [errors, setErrors] = useState({});

  const handleSubmit = () => {
    // Проверяем, что введено значение отработанных часов
    if (formData && formData.timeCountHours) {
      axios.post("http://localhost:8082/time-logs", formData, {
        withCredentials: true
      })
      .then(response => {
        console.log(response);
        setFormData(response.data.content);
        // Устанавливаем состояние успешности операции в true
        setSubmitSuccess(true);
      })
      .catch(error => {
        console.error('Ошибка при добавлении данных отработанных часов:', error);
        setSubmitSuccess(false);
      });
    }
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
                  <IoCloseCircleSharp onClick={() => onDelete(formData.id)} className="delete-icon" />
              </div>
            </div>
          </div>
          <div className="user-container-salary">
          {formData ? (
            <React.Fragment>
             <p><b><i>Отработанные часы:</i></b> {formData.timeCountHours}</p> 
             <form onSubmit={handleSubmit}>
      <TextField variant="standard" label="Отработанные часы" name="timeCountHours" value={formData.timeCountHours} onChange={handleChange}/>
      <Button onSubmit={handleSubmit} type="submit">Добавить</Button>
    </form>

              {submitSuccess ? <p>Данные успешно добавлены</p> : <p>Данные не добавлены</p>}
          
            </React.Fragment>
            ) : (
              <p>Loading...</p> // Display a loading message while formData is being fetched
            )}
          </div>
      </div>
    </Grid>
    
);}

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(deleteUser(id)),
});

export default connect(null, mapDispatchToProps)(User);