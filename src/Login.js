import React from 'react'
import './FrontPage.css';
import './Login.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';


export default function Login() {
    const navigate = useNavigate();
    const clickLogin = () => {navigate("/login")};
    const clickHome = () => {navigate("/")};
    const theme = createTheme({
        palette: {
          primary: {
            main: '#ffffff',
          },
          secondary: {
            main: '#3994bc',
          },
        },
      });

  return (
    <ThemeProvider theme={theme}>
    <div className='diff-back'>
      <div className="ribbon-button-container">
        <button className="logo" onClick={clickHome}/>
        <button className="ribbon-button" onClick={clickHome}>Store</button>
        <button className="ribbon-button">Library</button>
        <button className="ribbon-button" onClick={clickLogin}>Profile</button>
      </div>
      <div className="rectangle1"></div>
      <div className="login-rect">
        <div>
            SIGN IN WITH EMAIL OR USERNAME
        </div>
        <div>
            <input type='text' className='text-field'></input>
        </div>
        <div>
            PASSWORD
        </div>
        <div>
            <input type='password' className='text-field'></input>
        </div>
        <Link to="/register" className='for-link'>Don't have an account? Create one now!</Link>
        <div>
            <button className='login-button'>Sign in</button>
        </div>
      </div>
    </div>
    </ThemeProvider>
  )
}
