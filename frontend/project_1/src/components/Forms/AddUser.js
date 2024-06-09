import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { connect } from 'react-redux';
import { useNavigate  } from "react-router";
import { IconButton } from "@mui/material";
import { VisibilityOff, Visibility } from "@material-ui/icons";
import axios from 'axios';
import { useDispatch } from 'react-redux';

function AddUser({ user }) {
  const navigate = useNavigate();
  const [formDataAddUser, setFormDataAddUser] = useState({
    username: "",
    email:"",
    password:"",
    rate: 0,
    photo: "",
    age: 1,
    job: "",
    bio: "",
    country: "",
    city: "",
    quote: "",
    phoneNumber: "",
    firstName: "",
    lastName:""
  });

  useEffect(() => {
    if (user) {
      setFormDataAddUser({ ...user });
    }
  }, [user]);

  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormDataAddUser((prevData) => ({
      ...prevData,
      [name]: value,
      email: name === 'username' ? value : prevData.email, // обновите email при изменении username
    }));
  
    // Очищаем ошибку при изменении значения поля
    setErrors((prevErrors) => ({
      ...prevErrors,
      [name]: "",
    }));
  };

  const validateForm = () => {
    const newErrors = {};

    if (formDataAddUser.age < 0 ) {
      newErrors.age = "Возраст должен быть больше нуля";
    }  
    
    const maxCharLimit = 100; 
    let isAnyFieldEmpty = false; 

    Object.keys(formDataAddUser).forEach((key) => {
      const value = formDataAddUser[key].toString().trim();
      if (value.length > maxCharLimit) {
        newErrors[key] = `Превышен лимит символов (${maxCharLimit})`;
      } else if (value.length === 0){
        isAnyFieldEmpty = true; 
      }
    });

    if (isAnyFieldEmpty) {
      newErrors['global'] = 'Заполните все поля';
    }

    setErrors(newErrors);

    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validateForm()) {
      const userAdd = { ...formDataAddUser };
      const config = {
        withCredentials: true,
        headers: {
          'Content-Type': 'application/json',
        }
      };
      if (user && user.id) {
        userAdd.id = user.id;
        axios.put(`http://localhost:8082/users/${user.id}`, userAdd, config)
        .then(response => {
          console.log(response);
          setFormDataAddUser(response.data); // Обновляем данные пользователя
          alert("Пользователь успешно обновлен!");
        })
        .catch(error => {
          console.error('Ошибка при редактировании пользователя:', error);
          alert('Ошибка при редактировании пользователя!');
        });
      } else {
        axios.post('http://localhost:8082/users/register', userAdd, config)
        .then(response => {
            setFormDataAddUser({
                username: "",
                email:"",
                firstName: "",
                lastName:"",
                phoneNumber: "",
                password:"",
                rate: 0,
                photo: "",
                age: 1,
                job: "",
                bio: "",
                country: "",
                city: "",
                quote: "",
            });
            navigate('/users');
        })
        .catch(error => console.error('Ошибка при добавлении пользователя:', error));
      }
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
    <form onSubmit={handleSubmit} className={classes.form}>
      <div className={classes.label}>{user ? 'Редактирование пользователя' : 'Добавление пользователя' }</div>

      {errors.global && <div style={{ color: "red" }}>{errors.global}</div>}
      {Object.keys(formDataAddUser).map((key) => (
        errors[key] && key !== 'global' && <div key={key} style={{ color: "red" }}>{errors[key]}</div>
      ))}
      <TextField className={classes.input} variant="standard" label="Имя" name="firstName" value={formDataAddUser.firstName} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Фамилия" name="lastName" value={formDataAddUser.lastName} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Логин" name="username" value={formDataAddUser.username} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Почта" name="email" value={formDataAddUser.email} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Пароль" name="password" value={formDataAddUser.password} onChange={handleChange}  type="password"/>
      <TextField className={classes.input} variant="standard" label="Номер телефона" name="phoneNumber" value={formDataAddUser.phoneNumber} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Ставка" name="rate" value={formDataAddUser.rate} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Возраст" name="age" value={formDataAddUser.age} onChange={handleChange} />
      <TextField className={classes.input} variant="standard" label="Должность" name="job" value={formDataAddUser.job} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="БИО" name="bio" value={formDataAddUser.bio} onChange={handleChange} />
      <TextField className={classes.input} variant="standard" label="Страна" name="country" value={formDataAddUser.country} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Город" name="city" value={formDataAddUser.city} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Цитата" name="quote" value={formDataAddUser.quote} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="URL фотографии" name="photo" value={formDataAddUser.photo} onChange={handleChange} />
      <Button type="submit"  className={classes.button} onClick={handleSubmit}>{user ? 'Редактировать' : 'Добавить'}</Button>
    </form>
  );
}

export default AddUser;