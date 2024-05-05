import React, { useState } from 'react';
import User from './User';
import { connect } from 'react-redux';
import { deleteUser, editUser } from '../Redux/actions';

function Users(props) {
  const [searchQuery, setSearchQuery] = useState('');

  const handleSearchChange = (event) => {
    setSearchQuery(event.target.value);
  };

  const filteredUsers = props.users.filter(
    (user) =>
      user.lastName.toLowerCase().includes(searchQuery.toLowerCase()) ||
      user.firstName.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div>
      <input className='search-container'
        type="text"
        placeholder="Поиск по фамилии или имени"
        value={searchQuery}
        onChange={handleSearchChange}
      />
      {filteredUsers.length > 0 ? (
        filteredUsers.map((el) => (
          <div key={el.id}>
            <User onEdit={props.onEdit} onDelete={props.onDelete} user={el} />
          </div>
        ))
      ) : (
        <div className="user" style={{color: "rgb(41, 41, 41)", display: "flex", justifyContent: "center", alignCtems: "center" }}>
          <h3>Пользователей нет</h3>
        </div>
      )}
    </div>
  );
}

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(deleteUser(id)),
  onEdit: (user) => dispatch(editUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(Users);