import React, { useState, useEffect } from "react";
import AddUser from "./AddUser";
import axios from 'axios';
import { useLocation  } from "react-router";

function EditUser({ users, setUsers }) {

  const user = users?.find(user => user.id === userId);

  const [editedUser, setEditedUser] = useState(null);
  
  const { state } = useLocation();
const { userId, isAdmin } = state;

useEffect(() => {
  // Определите URL для запроса
  const url = isAdmin ? `http://localhost:8082/users/${userId}` : "http://localhost:8082/users/me";

  // Запрос данных пользователя с сервера
  axios
    .get(url, {
      withCredentials: true
    })
    .then(response => {
      console.log(response);
      setEditedUser(response.data);
    })
    .catch(error => console.error('Ошибка при получении данных пользователя:', error));
}, [userId, isAdmin]);

const handleSaveEdit = () => {
  axios.put(`http://localhost:8082/users/${userId}`, editedUser, {
    withCredentials: true
  })
  .then(response => {
    console.log(response);
    alert("Пользователь успешно обновлен!");
    // Обновите состояние здесь, если это необходимо
    const updatedUsers = users.map(user => 
      user.id === editedUser.id ? editedUser : user
    );
    setUsers(updatedUsers);
  })
  .catch(error => {
    console.error('Ошибка при редактировании пользователя:', error);
    alert('Ошибка при редактировании пользователя!');
  });
};

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditedUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }));
  };

  return (
    <AddUser
      user={editedUser}
      onEdit={handleSaveEdit} 
      onInputChange={handleInputChange}
    />
  );
}

export default EditUser;