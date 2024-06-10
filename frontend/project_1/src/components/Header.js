import React, { useState, useEffect } from "react";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import AdbIcon from '@mui/icons-material/Adb';
import { Link } from "react-router-dom";
import MenuItem from '@mui/material/MenuItem';
import AccountCircle from '@mui/icons-material/AccountCircle';
import axios from 'axios';
import { makeStyles } from "@mui/styles";

function Header() {
  const useStyles = makeStyles({
    menu: {
      marginLeft: "25%",
    },
  });

  const classes = useStyles();

  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const [role, setRole] = React.useState(null);
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElNav2, setAnchorElNav2] = useState(null);
  const [activePath, setActivePath] = useState("/");

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [anchorEl2, setAnchorEl2] = React.useState(null);

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClose2 = () => {
    setAnchorEl2(null);
  };


  // Обработчик изменения активного пути
  const handlePathChange = (path) => {
    setActivePath(path);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenNavMenu2 = (event) => {
    setAnchorElNav2(event.currentTarget);
  };

  const signOut = () => {
    axios
      .post("http://localhost:8082/logout", {}, { withCredentials: true })
      .then(response => {
        console.log(response);
        setAuth(false); // Устанавливаем auth в false после выхода из системы
      })
      .catch(error => console.error('Ошибка при выходе из системы:', error));
  }

  const fetchMe = () => {
    axios
        .get("http://localhost:8082/users/me", { withCredentials: true })
        .then(response => {
            console.log(response);
            const data = response.data;
            setFormData(data);
        })
        .catch(error => console.error('Ошибка при получении данных пользователя:', error));
}

useEffect(() => {
  fetchMe()
}, []);

  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClick2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };
  

  return (
    <AppBar position="static"
    disableGutters sx={{
      backgroundColor: 'rgb(105, 105, 105)',
      flexDirection: 'row',
    }}>
      <Container maxWidth="xl">
        <Toolbar >
          <AdbIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
          <Typography
            disabled={activePath === "/"} 
            onClick={() => handlePathChange("/")}
            variant="h6"
            noWrap
            component={Link} to="/"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
                "&.Mui-disabled": {
                  color:"#e4e4e4",
                }
            }}
          >
            Mbicycle
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
              sx={{
                display: { xs: 'flex', md: 'none' },
              }}
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              <MenuItem onClick={handleCloseNavMenu} sx={{
                display: "flex",
                flexDirection: "column",
                flexWrap: "wrap",
              }}>
                <Button component={Link} to="/projects" color="inherit"  disabled={activePath === "/projects"} onClick={() => handlePathChange("/projects")}
                 sx={{
                  "&.Mui-disabled": {
                    color:"#e4e4e4",
                  },}}>
                  Проекты
                </Button>
                <Button component={Link} to="/java-development" color="inherit" disabled={activePath === "/java-development"} onClick={() => handlePathChange("/java-development")}
                  sx={{
                    "&.Mui-disabled": {
                      color:"#e4e4e4",
                    },}}>
                  Разработка Java
                </Button>
                <Button component={Link} to="/net-development" color="inherit" disabled={activePath === "/net-development"} onClick={() => handlePathChange("/net-development")}
                  sx={{
                    "&.Mui-disabled": {
                      color:"#e4e4e4",
                    },}}>
                  Разработка .NET
                </Button>
                <Button component={Link} to="/flutter-development" color="inherit" disabled={activePath === "/flutter-development"} onClick={() => handlePathChange("/flutter-development")}
                  sx={{
                    "&.Mui-disabled": {
                      color:"#e4e4e4",
                    },}}>
                  Разработка Flutter
                </Button>
                {auth && formData.authorities && formData.authorities.includes('ROLE_ADMIN') && (
                  <>
                  <Button component={Link} to="/users" color="inherit" disabled={activePath === "/users"} onClick={() => handlePathChange("/users")}
                  sx={{
                    "&.Mui-disabled": {
                      color:"#e4e4e4",
                    },}}>
                  Персонал
                </Button>
                <Button component={Link} to="/add" color="inherit" disabled={activePath === "/add"} onClick={() => handlePathChange("/add")}
                  sx={{
                    "&.Mui-disabled": {
                      color:"#e4e4e4",
                    },}}>
                  Добавление сотрудника
                </Button>
                </>
                )}
              </MenuItem>
            
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography
            variant="h5"
            noWrap
            component="a"
            href="#app-bar-with-responsive-menu"
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            Mbicycle
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
          <Button component={Link} to="/projects" color="inherit"  disabled={activePath === "/projects"} onClick={() => handlePathChange("/users")}
           sx={{
            "&.Mui-disabled": {
              color:"#e4e4e4",
            },}}>
              Проекты
            </Button>
            <div>
              <Button  color="inherit" aria-controls="menu-appbar" aria-haspopup="true" onClick={handleClick2}>
                Разработки 
              </Button>
              <Menu
              className={classes.menu}
                id="menu-appbar"
                anchorEl2={anchorEl2}
                anchorOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorEl2)}
                onClose={handleClose2}
              >
                <MenuItem component={Link} to="/java-development" color="inherit" disabled={activePath === "/java-development"} onClick={() => {handlePathChange("/java-development"); handleClose()}}>Java</MenuItem>
                <MenuItem component={Link} to="/net-development" color="inherit" disabled={activePath === "/net-development"} onClick={() => {handlePathChange("/java-development"); handleClose()}}>.NET</MenuItem>
                <MenuItem component={Link} to="/flutter-development" color="inherit" disabled={activePath === "/flutter-development"} onClick={() => {handlePathChange("/java-development"); handleClose()}}>Flutter</MenuItem>
              </Menu>
            </div>
          {auth && formData.authorities && formData.authorities.includes('ROLE_ADMIN') && (
        <>
          <Button component={Link} to="/users" color="inherit"  disabled={activePath === "/users"} onClick={() => handlePathChange("/users")}
           sx={{
            "&.Mui-disabled": {
              color:"#e4e4e4",
            },}}>
              Персонал
            </Button>
            <Button component={Link} to="/add" color="inherit" disabled={activePath === "/add"} onClick={() => handlePathChange("/add")}
            sx={{
              "&.Mui-disabled": {
                color:"#e4e4e4",
              },}}>
              Добавление персонала
            </Button>
            </>
            )}
          </Box>
            <div>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="simple-menu"
              aria-haspopup="true"
              onClick={handleMenu}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
            <Menu
              id="simple-menu"
              anchorEl={anchorEl}
              anchorOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(anchorEl)}
              onClose={handleClose}
            >
              <MenuItem component={Link} to="/auth" color="inherit" disabled={activePath === "/auth"} onClick={() => {handlePathChange("/auth"); handleClose()}}>Авторизоваться</MenuItem>
              {auth && formData.authorities && (
                <>
                <MenuItem component={Link} to="/userAccaunt" color="inherit" disabled={activePath === "/userAccaunt"} onClick={() => {handlePathChange("/userAccaunt"); handleClose()}}>Личный аккаунт</MenuItem>
                <MenuItem component={Link} to="/" color="inherit" disabled={activePath === "/index"} onClick={() => {signOut(); handlePathChange("/index");}}>Выход</MenuItem>
             </>
               )}
            </Menu>
          </div>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Header;