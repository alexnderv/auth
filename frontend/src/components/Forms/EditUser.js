import React, { useState } from "react";
import AddUser from "./AddUser";
import { connect } from "react-redux";
import { editUser } from "../Redux/actions";
import { useLocation  } from "react-router";

function EditUser({ onEdit, users }) {
  
  const { state } = useLocation();

  const userId = state.userId;
  const user = users?.find(user => user.id === userId);

  const [editedUser, setEditedUser] = useState({ ...user });

  const handleSaveEdit = () => {
    onEdit(editedUser);
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

const mapStateToProps = (state) => ({
  users: state.users,
});

const mapDispatchToProps = (dispatch) => ({
  onEdit: (user) => dispatch(editUser(user)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EditUser);