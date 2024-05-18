import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";

function Auth({ user }) {

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));

    // Очищаем ошибку при изменении значения поля
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formData.username.length < 3) {
      newErrors.username = "Логин пользователя должно содержать не менее 3 символов";
    }

    if (formData.password.length < 2) {
      newErrors.password = "Пароль должен содержать не менее 3 символов";
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  // Функция для отправки запроса авторизации
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    // отправка запроса авторизации на сервер
    try {
      const response = await fetch('http://localhost:8082/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Cookie': 'PHPSESSID=t9k86qubdkgbbd3ur891gijtp1; JSESSIONID=AC1820E214E4DF3DBAEEA03508207355',
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      // Обработка ответа сервера
      if (response.ok) {
        // Успешная авторизация
        console.log('Успешная авторизация', data);
      } else {
        // Ошибка авторизации
        setErrors({ global: data.message });
      }
    } catch (error) {
      console.error('Ошибка авторизации:', error);
    }
  };


  // Стили MUI компонентов
  const useStyles = makeStyles({
    "@media (max-width: 600px)": {
      form: {
        width: "100%",
        height: "30%"
      },
      input: {
        width: "100%", 
      },
      button: {
        width: "100%",
      },
    },
    "@media (min-width: 601px)": {
      form: {
        width: "100%", 
      },
    },
    button: {
      background: 'rgb(200, 200, 200)',
      border: 0,
      width: "90%",
      borderRadius: 3,
      boxShadow: 'rgb(160, 160, 160)',
      height: 48,
      padding: '0 30px',
      color: "black",
    },
    label: {
      fontSize: "24px",
      fontWeight: "bold",
      marginBottom: "10px",
      textAlign: "center",
      color: "rgb(70, 70, 70)",
    },
    input: {
      width: "90%",
      border: 0,
      color: "black",
      outline: "none",
      height: "80px",
    },
    form:{
      width: "30%",
      border: 1,
      borderRadius: 10,
      background: "rgba(230, 230, 230)",
      boxShadow: '0 3px 5px 2px rgba(0, 0, 0, 0.1)',
      padding: '20px',
      marginTop: "30px",
      margin: 'auto',
      color: "black",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "center",
    },
  });

  const classes = useStyles();

  return (
    <form className={classes.form} onSubmit={handleSubmit}>
      <div className={classes.label}>Авторизация</div>

      {errors.global && <div style={{ color: "red" }}>{errors.global}</div>}
      {Object.keys(formData).map((key) => (
        errors[key] && key !== 'global' && <div key={key} style={{ color: "red" }}>{errors[key]}</div>
      ))}

      <TextField className={classes.input} variant="standard" label="Логин" name="username" value={formData.username} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Пароль" name="password" type="password" value={formData.password} onChange={handleChange}/>

      <Button type="submit"  className={classes.button} >Вход</Button>
    </form>
  );
}

export default Auth;