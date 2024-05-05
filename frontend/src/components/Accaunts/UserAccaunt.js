import React, { useState, useEffect } from "react";
import { IoCloseCircleSharp, IoHammerSharp } from "react-icons/io5";
import { connect } from "react-redux";
import { deleteUser } from "../Redux/actions";
import { useNavigate } from "react-router";
import { createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";
import axios from "axios";

const theme = createTheme();

function UserAccount({ user, onDelete }) {
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down("md"));
  const [loggedUser, setLoggedUser] = useState(user);
  const [hoursWorked, setHoursWorked] = useState(0);
  const [salary, setSalary] = useState(0);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await axios.get(
          `http://localhost:8080/api/users/${user.id}`
        );
        setLoggedUser(response.data);
      } catch (err) {
        console.log(err.message);
      }
    };

    fetchUser();
  }, []);

  const handleEditClick = () => {
    navigate("/edit", { state: { userId: user.id } });
  };

  const handleHoursChange = (event) => {
    setHoursWorked(event.target.value);
  };

  const handleSalaryChange = (event) => {
    setSalary(event.target.value);
  };

  const handleSave = async () => {
    try {
      const response = await axios.put(
        `http://localhost:8080/api/users/${user.id}`,
        {
          hoursWorked,
          salary,
        }
      );
      setLoggedUser(response.data);
    } catch (err) {
      console.log(err.message);
    }
  };

  return (
    <Grid item xs={1} sm={matchesDesktop ? 1 : 4}>
      <div>
        <div className="user-container">
          <div className="user-image">
            <img id="img" src={loggedUser.photo} alt={`${loggedUser.firstName} ${loggedUser.lastName}`} />
          </div>
          <div className="user-details">
            <h3>
              {loggedUser.firstName} {loggedUser.lastName},{" "}
              {loggedUser.age} лет
            </h3>
            <p style={{ color: "grey", marginBottom: "20px" }}>
              {loggedUser.job}
            </p>
            <p>
              <b>
                <i>БИО:</i>
              </b>{" "}
              {loggedUser.bio}
            </p>
            <p style={{ marginTop: "5px" }}>
              <i>
                <b>Цитата:</b>
              </i>{" "}
              {loggedUser.quote}
            </p>
            <p style={{ marginTop: "20px" }}>
              <i>
                {loggedUser.country}, {loggedUser.city}
              </i>
            </p>

            <div className="user-actions">
              <IoHammerSharp onClick={handleEditClick} className="edit-icon" />
              <IoCloseCircleSharp
                onClick={() => onDelete(user.id)}
                className="delete-icon"
              />
            </div>
          </div>
        </div>

        <div className="account-info">
          <h2>Сведения об аккаунте</h2>

          <label>
            Отработанные часы в месяц:
            <input
              type="number"
              value={hoursWorked}
              onChange={handleHoursChange}
            />
          </label>
          <br />
          <label>
            Заработная плата:
            <input
              type="number"
              value={salary}
              onChange={handleSalaryChange}
            />
          </label>
          <br />
          <button onClick={handleSave}>Сохранить</button>
        </div>
      </div>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(deleteUser(id)),
});

export default connect(null, mapDispatchToProps)(UserAccount);