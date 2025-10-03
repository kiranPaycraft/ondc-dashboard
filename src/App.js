import React from 'react';
import { Box } from '@mui/material';
import { Routes, Route, useLocation, Navigate } from 'react-router-dom';
import SideMenu from './layout/SideMenu';
import Header from './layout/Header';
import ComplaintDetails from './components/ComplaintDetails';
import ComplaintDetailsEdit from './components/ComplaintDetailsEdit';
import Login from './components/Login';
import { drawerWidth } from './constants/Layout';

// Example auth check
function useAuth() {
  // could be from context, Redux, localStorage etc.
  const token = localStorage.getItem('token');
  return !!token;
}

// PrivateRoute component
function PrivateRoute({ children }) {
  const auth = useAuth();
  const location = useLocation();

  if (!auth) {
    // redirect to login, but keep where user was going so you can redirect back
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  return <>{children}</>;
}

function App() {
  const location = useLocation();
  const isLogin = location.pathname === "/login";

  const auth = useAuth();

  return (
    <>
      {!isLogin && (
        <Box sx={{ display: 'flex' }}>
          <SideMenu />
        </Box>
      )}
      <Box component="main" sx={{ flexGrow: 1, ml: !isLogin ? `${drawerWidth}px` : 0, }}>
        {!isLogin && <Header />}
        <Routes>
          <Route path="/login" element={<Login />} />

          {/* Protected routes */}
          <Route
            path="/"
            element={
              <PrivateRoute>
                <ComplaintDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/complaints"
            element={
              <PrivateRoute>
                <ComplaintDetails />
              </PrivateRoute>
            }
          />
          <Route
            path="/complaints/edit/:id"
            element={
              <PrivateRoute>
                <ComplaintDetailsEdit />
              </PrivateRoute>
            }
          />

          {/* Optional: catch all unmatched routes */}
          <Route
            path="*"
            element={<Navigate to={auth ? "/" : "/login"} replace />}
          />
        </Routes>
      </Box>
    </>
  );
}

export default App;
