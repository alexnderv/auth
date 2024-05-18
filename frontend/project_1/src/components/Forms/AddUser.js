import React, { useState, useEffect } from "react";
import Button from "@mui/material/Button";
import { makeStyles } from "@mui/styles";
import TextField from "@mui/material/TextField";
import { connect } from 'react-redux';
import { useNavigate  } from "react-router";
import { IconButton } from "@mui/material";
import { addUser, editUser } from "../Redux/actions";
import { VisibilityOff, Visibility } from "@material-ui/icons";

function AddUser({ user, onAdd, onEdit }) {
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setFormData({ ...user });
    }
  }, [user]);

  const [formData, setFormData] = useState({
    username: "",
    password:"",
    role: "",
    rate: 0,
    photo: "",
    age: 1,
    job: "",
    bio: "",
    country: "",
    city: "",
    quote: "",
  });

  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);

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

    if (formData.age < 0 ) {
      newErrors.age = "Возраст должен быть больше нуля";
    }  
    
    const maxCharLimit = 100; 
    let isAnyFieldEmpty = false; 

    Object.keys(formData).forEach((key) => {
      const value = formData[key].toString().trim();
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
      const userAdd = { ...formData };
      if (user && user.id) {
        userAdd.id = user.id;
        onEdit(userAdd);
      } else {
        onAdd(userAdd);
      }
      setFormData({
        username: "",
        firstname: "",
        lastname:"",
        phoneNumbers: "",
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
      navigate("/users");
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
      {Object.keys(formData).map((key) => (
        errors[key] && key !== 'global' && <div key={key} style={{ color: "red" }}>{errors[key]}</div>
      ))}
      <TextField className={classes.input} variant="standard" label="Имя" name="firstname" value={formData.firstname} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Фамилия" name="lastname" value={formData.lastname} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Логин" name="username" value={formData.username} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Пароль" name="password" value={formData.password} onChange={handleChange}  type="password"/>
      <TextField className={classes.input} variant="standard" label="Роль" name="role" value={formData.role} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Ставка" name="rate" value={formData.rate} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Возраст" name="age" value={formData.age} onChange={handleChange} />
      <TextField className={classes.input} variant="standard" label="Должность" name="job" value={formData.job} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="БИО" name="bio" value={formData.bio} onChange={handleChange} />
      <TextField className={classes.input} variant="standard" label="Страна" name="country" value={formData.country} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Город" name="city" value={formData.city} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="Цитата" name="quote" value={formData.quote} onChange={handleChange}/>
      <TextField className={classes.input} variant="standard" label="URL фотографии" name="photo" value={formData.photo} onChange={handleChange} />
      <Button type="submit"  className={classes.button}>{user ? 'Редактировать' : 'Добавить'}</Button>
    </form>
  );
}

// Функция для связи компонента с Redux store
const mapDispatchToProps = (dispatch) => ({
  onAdd: (user) => dispatch(addUser(user)), // используем исправленную функцию addUser
  onEdit: (user) => dispatch(editUser(user)),
});

export default connect(null, mapDispatchToProps)(AddUser);