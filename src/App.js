import Store from './Store'
import Login from './Login'
import Register from './Register'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import FrontPage from './FrontPage';
import ProfilePage from './ProfilePage';
import Edit from './Edit';
import ChangePass from './ChangePass';
import GamePage from './GamePage';
import ScrollToTop from './ScrollToTop';
import LeaveReview from './LeaveReview';

function App() {
  return (
    <Router>
      <ScrollToTop/>
      <Routes>
        <Route path="/" element={<FrontPage />} />
        <Route path="/store" element={<Store />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/user/:id" element={<ProfilePage />} />
        <Route path="/edit" element={<Edit/>} />
        <Route path="/change-password" element={<ChangePass />} />
        <Route path="/game/:id" element={<GamePage />} />
        <Route path="/review/:id" element={<LeaveReview />} />
      </Routes>
    </Router>
  );
}

export default App;
