import { AppBar, Toolbar, Typography, Avatar, Menu, MenuItem, IconButton, Box } from '@mui/material';
import React, { useState } from 'react';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { useNavigate } from 'react-router-dom';

const Header = () => {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);
  const navigate = useNavigate();

  // Get username from localStorage or use a default
  const username = localStorage.getItem('username') || 'admin';

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    localStorage.removeItem('isAuthenticated');
    localStorage.removeItem('token');
    localStorage.removeItem('username');
    handleClose();
    navigate('/login');
  };

  return (
    <AppBar position="static" sx={{ boxShadow: 'none', borderBottom: '1px solid #b9b9b9' }}>
      <Toolbar sx={{ backgroundColor: '#ffffff', color: '#000000', justifyContent: 'space-between' }}>
        <Typography variant="h5" sx={{ fontWeight: 'bold' }}>Dashboard</Typography>
        <Box>
          <Typography variant="body1" component="span" sx={{ mr: 2 }}>
            {username}
          </Typography>
          <IconButton onClick={handleMenu} size="large" sx={{ ml: 2 }}>
            <Avatar>
              <AccountCircleIcon sx={{ fontSize: 40 }} />
            </Avatar>
          </IconButton>
          <Menu
            anchorEl={anchorEl}
            open={open}
            onClose={handleClose}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
          >
            <MenuItem onClick={handleLogout}>Logout</MenuItem>
          </Menu>
        </Box>
      </Toolbar>
    </AppBar>
  );
};

export default Header;