import { AppBar, Toolbar, Typography } from '@mui/material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ boxShadow: 'none', borderBottom: '1px solid #b9b9b9' }}>
      <Toolbar sx={{ backgroundColor: '#ffffff', color: '#000000' }}>
        <Typography variant="h5" sx={{margin:'0 auto', fontWeight:'bold'}}>Dashboard</Typography>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
