import { Box, Drawer, List, ListItem, ListItemIcon, Typography } from '@mui/material';
import { Link, useLocation } from 'react-router-dom';
import { drawerWidth } from '../constants/Layout';
import ListAltIcon from '@mui/icons-material/ListAlt';

const SideMenu = () => {
    const location = useLocation();

    const menuItems = [
        { label: 'Complaints', path: '/complaints', icon: <ListAltIcon /> },
    ];

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,
                [`& .MuiDrawer-paper`]: {
                    width: drawerWidth,
                    boxSizing: 'border-box',
                    backgroundColor: '#323239',
                    color: '#ffffff',
                    borderRight: '1px solid #e0e0e0',
                },
            }}
        >
            <Box
                component={'img'}
                sx={styles.appLogo}
                src='/ondc-dashboard/logo.png'
                alt="Logo"
            />

            <List sx={{ px: 1 }}>
                {menuItems.map((item) => {
                    const isActive = location.pathname === '/' || location.pathname.startsWith(item.path);
                    return (
                        <ListItem
                            key={item.path}
                            disablePadding
                            sx={{
                                borderRadius: 1,
                                my: 1,
                                backgroundColor: isActive ? '#444' : 'transparent',
                                '&:hover': {
                                    backgroundColor: '#555',
                                },
                            }}>
                            <ListItemIcon sx={{ color: 'white', minWidth: 36, ml: 2 }}>
                                {item.icon}
                            </ListItemIcon>
                            <Link
                                to={item.path}
                                style={{
                                    textDecoration: 'none',
                                    color: 'inherit',
                                    width: '100%',
                                    display: 'block',
                                    padding: '12px 10px',
                                }}
                            >
                                <Typography
                                    variant="body1"
                                    sx={{
                                        fontWeight: isActive ? 600 : 400,
                                        color: '#fff',
                                        fontSize: '16px',
                                    }}
                                >
                                    {item.label}
                                </Typography>
                            </Link>
                        </ListItem>
                    );
                })}
            </List>
        </Drawer>
    );
};

const styles = {
    appLogo: {
        display: "block",
        borderRadius: 2,
        width: "170px",
        cursor: "pointer",
        mt: 2,
        ml: "auto",
        mr: "auto",
        mb: 2,
    },
};

export default SideMenu;
