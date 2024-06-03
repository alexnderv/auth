import React, { useState, useEffect } from 'react';
import User from './User';
import axios from 'axios';

function Users() {
  const [formData, setFormData] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(true);

  
  useEffect(() => {
    setLoading(true);
    axios.get("http://localhost:8082/users", {
      withCredentials: true
    })
    .then(response => {
      console.log(response.data);
      setFormData(response.data.content); // Обновите formData данными с сервера
      setLoading(false);
    })
    .catch(error => {
      console.error('Ошибка при получении данных пользователей:', error);
      setLoading(false);
    });
  }, []); // Пустой массив зависимостей, чтобы запрос выполнялся один раз

  if (loading) {
    return <div>Loading...</div>;
  }

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div>
      <input className='search-container'
        type="text"
        placeholder="Поиск по фамилии или имени"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {formData.length > 0 ? (
        formData.map((user) => (
          <User key={user.id} userData={user} />
        ))
      ) : (
        <div style={{ textAlign: 'center' }}>
          <h3>Пользователей нет</h3>
        </div>
      )}
    </div>
  );
}

export default Users;