import React from 'react';
import './App.css';
import { Box } from '@mui/material';

import SideMenu from './layout/SideMenu';
import Header from './layout/Header';
import { Routes, Route } from 'react-router-dom';
import ComplaintDetails from './components/ComplaintDetails';
import ComplaintDetailsEdit from './components/ComplaintDetailsEdit';
import { drawerWidth } from './constants/Layout';

function App() {


  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <SideMenu />
        {/* <Box sx={{ flexGrow: 1 }}>
          <Header />
        </Box> */}
      </Box>
      <Box component="main" sx={{ flexGrow: 1, ml: `${drawerWidth}px` }}>
        <Header />
        <Routes>
          <Route path="/" element={<ComplaintDetails />} />
          <Route path="/complaints" element={<ComplaintDetails />} />
          <Route path="/complaints/edit/:id" element={<ComplaintDetailsEdit />} />
        </Routes>
      </Box>

    </>
  );
}

export default App;


