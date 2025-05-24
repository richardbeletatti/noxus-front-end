import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import AdminPage from './pages/admin/Admin';
import Dashboard from './pages/dashboard/Dashboard';
import Unauthorized from './pages/unauthorized/Unauthorized';
import PrivateRoute from './components/PrivateRoute';
import UserList from './pages/admin/userList/UserList';
import UserPanel from './pages/admin/userPanel/UserPanel';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/" element={<Login />} />
        <Route 
          path="/admin" 
          element={
            <PrivateRoute roleRequired="admin">
              <AdminPage />
            </PrivateRoute>
          } 
        />
        <Route 
        path="/admin/users" 
        element={
          <PrivateRoute roleRequired="admin">
            <UserList />
          </PrivateRoute>
        } 
      />
      <Route 
          path="/admin/users/:userId" 
          element={
            <PrivateRoute roleRequired="admin">
              <UserPanel />
            </PrivateRoute>
          } 
        />
        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute roleRequired="user">
              <Dashboard />
            </PrivateRoute>
          } 
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
 
    </BrowserRouter>
  );
}

export default App;
