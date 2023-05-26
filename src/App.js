import Store from './Store'
import Login from './Login'
import Register from './Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './FrontPage';
import ProfilePage from './ProfilePage';
import Edit from './Edit';
import ChangePass from './ChangePass';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id" element={<ProfilePage />} />
        <Route path="/edit" element={<Edit />} />
        <Route path="/change-password" element={<ChangePass />} />
      </Routes>
    </Router>
  );
}

export default App;
