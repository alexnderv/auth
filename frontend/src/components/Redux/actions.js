import { setUsersAction, addUserAction, editUserAction, deleteUserAction } from './reducers';

export const getUsers = () => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:8082/users');
    const data = await response.json();
    dispatch(setUsersAction(data));
  } catch (error) {
    console.error(error);
  }
};

export const addUser = (user) => async (dispatch) => {
  try {
    const response = await fetch('http://localhost:8081/users/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    dispatch(addUserAction(data));
  } catch (error) {
    console.error(error);
  }
};

export const editUser = (user) => async (dispatch) => {
  try {
    const response = await fetch(`http://localhost:8082/users/${user.id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(user),
    });
    const data = await response.json();
    dispatch(editUserAction(data));
  } catch (error) {
    console.error(error);
  }
};

export const deleteUser = (id) => async (dispatch) => {
  try {
    await fetch(`http://localhost:8082/users/${id}`, {
      method: 'DELETE',
    });
    dispatch(deleteUserAction(id));
  } catch (error) {
    console.error(error);
  }
};