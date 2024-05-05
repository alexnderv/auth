import * as React from 'react';
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
import { useState } from 'react';
import AccountCircle from '@mui/icons-material/AccountCircle';

function Header() {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [activePath, setActivePath] = useState("/");

  const [auth, setAuth] = React.useState(true);
  const [anchorEl, setAnchorEl] = React.useState(null);
  
  const handleMenu = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };


  // Обработчик изменения активного пути
  const handlePathChange = (path) => {
    setActivePath(path);
  };

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
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
                <Button component={Link} to="/users" color="inherit" textAlign="center"
                disabled={activePath === "/users"}
                onClick={() => handlePathChange("/users")}>
                  Персонал
                </Button>
                <Button component={Link} to="/add" color="inherit" textAlign="center" disabled={activePath === "/add"} onClick={() => handlePathChange("/add")}>
                  Добавление персонала
                </Button>
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
          </Box>
          {auth && (
            <div>
              <IconButton
                size="large"
                aria-label="account of current user"
                aria-controls="menu-appbar"
                aria-haspopup="true"
                onClick={handleMenu}
                color="inherit"
              >
                <AccountCircle />
              </IconButton>
              <Menu
                id="menu-appbar"
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
                <MenuItem component={Link} to="/entrAdmin" color="inherit" disabled={activePath === "/entrAdmin"} onClick={() => {handlePathChange("/entrAdmin"); handleClose()}}>Вход как администратор</MenuItem>
                <MenuItem component={Link} to="/entrUser" color="inherit" disabled={activePath === "/entrUser"} onClick={() => {handlePathChange("/entrUser"); handleClose()}}>Вход как сотрудник</MenuItem>
              </Menu>
            </div>
          )}
        </Toolbar>
      </Container>
    </AppBar>
    
  );
}

export default Header;