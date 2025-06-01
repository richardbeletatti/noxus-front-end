import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './pages/login/Login';
import AdminPage from './pages/admin/Admin';
import UserKanbanPage from './pages/userKanbanPage/UserKanbanPage';
import Unauthorized from './pages/unauthorized/Unauthorized';
import PrivateRoute from './components/PrivateRoute';
import UserList from './pages/admin/userList/UserList';
import UserPanel from './pages/admin/userPanel/UserPanel';
import CreateAccount from './pages/admin/createAccount/CreateAccount';

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
          path="/admin/create-account" 
          element={
            <PrivateRoute roleRequired="admin">
              <CreateAccount />
            </PrivateRoute>
          } 
        />

        <Route 
          path="/dashboard" 
          element={
            <PrivateRoute roleRequired="user">
              <UserKanbanPage />
            </PrivateRoute>
          } 
        />
        <Route path="/unauthorized" element={<Unauthorized />} />
      </Routes>
 
    </BrowserRouter>
  );
}

export default App;
