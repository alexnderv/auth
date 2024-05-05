import React from "react";
import { IoCloseCircleSharp, IoHammerSharp } from "react-icons/io5";
import { connect } from "react-redux";
import { deleteUser } from "../Redux/actions";
import { useNavigate } from "react-router";
import { createTheme } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import Grid from "@mui/material/Grid";

const theme = createTheme();

function User({ user, onDelete }) {
  const navigate = useNavigate();
  const matchesMobile = useMediaQuery(theme.breakpoints.down("xs"));
  const matchesDesktop = useMediaQuery(theme.breakpoints.down("md"));

  const handleEditClick = () => {
    navigate("/edit", { state: { userId: user.id } });
  };

  return (
    <Grid item xs={1} sm={matchesDesktop ? 1 : 4} >
      <div>
          <div className="user-container">
            <div className="user-image">
              <img id="img" src={user.photo} alt={`${user.firstName} ${user.lastName}`} />
            </div>
            <div className="user-details">
              <h3>{user.firstName} {user.lastName}, {user.age} лет</h3>
              <p style={{color: "grey", marginBottom: "20px" }}>{user.job}</p>
              <p><b><i>БИО:</i></b> {user.bio}</p>
              <p style={{marginTop: "5px" }}><i><b>Цитата:</b></i> {user.quote}</p>
              <p style={{marginTop: "20px" }}><i>{user.country}, {user.city}</i></p>

              <div className="user-actions">
                <IoHammerSharp onClick={handleEditClick} className="edit-icon" />
                  <IoCloseCircleSharp onClick={() => onDelete(user.id)} className="delete-icon" />
              </div>
            </div>
          </div>
      </div>
    </Grid>
    
);}

const mapDispatchToProps = (dispatch) => ({
  onDelete: (id) => dispatch(deleteUser(id)),
});

export default connect(null, mapDispatchToProps)(User);