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

function UserAccaunt({ userData, onDelete }) {
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down("md"));

  const [formData, setFormData] = useState(null); // Set initial state to null

  useEffect(() => {
    // Запрос данных пользователя с сервера
    const fetchUser = async () => {
      try {
        const cookies = document.cookie.split(';').reduce((cookies, cookie) => {
          const [name, value] = cookie.trim().split('=').map(decodeURIComponent);
          cookies[name] = value;
          return cookies;
        }, {});
        const token = cookies.JSESSIONID;
        console.log(token);
        const response = await axios.get("http://localhost:8082/users/me", {
          headers: {
            Cookie: `JSESSIONID=${token}`,
          },
        });
        setFormData(response.data);
        console.log(response.data)
      } catch (err) {
        console.error('Ошибка при получении данных пользователя:', err);
        console.error(err.message);
      }
    };
    if (document.cookie.includes('JSESSIONID')) {
      fetchUser();
    }
  }, []);

  const handleEditClick = () => {
    if (formData && formData.id) {
      navigate("/edit", { state: { userId: formData.id } });
    }
  };

  return (
    <Grid item xs={1} sm={matchesDesktop ? 1 : 4}>
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
                <h3>
                  {formData.firstName} {formData.lastName}, {formData.age} лет
                </h3>
                <p style={{ color: "grey", marginBottom: "20px" }}>{formData.job}</p>
                <p>
                  <b>
                    <i>БИО:</i>
                  </b>{" "}
                  {formData.bio}
                </p>
                <p style={{ marginTop: "5px" }}>
                  <i>
                    <b>Цитата:</b>
                  </i>{" "}
                  {formData.quote}
                </p>
                <p style={{ marginTop: "20px" }}>
                  <i>{formData.country}, {formData.city}</i>
                </p>
              </React.Fragment>
            ) : (
              <p>Loading...</p> // Display a loading message while formData is being fetched
            )}

            <div className="user-actions">
              <IoHammerSharp onClick={handleEditClick} className="edit-icon" />
              <IoCloseCircleSharp
                onClick={() => onDelete(formData ? formData.id : null)}
                className="delete-icon"
              />
            </div>
          </div>
        </div>
      </div>
    </Grid>
  );
}

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(deleteUser(id)),
});

export default connect(null, mapDispatchToProps)(UserAccaunt);