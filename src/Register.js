import React from 'react'
import './FrontPage.css';
import './Login.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate, Link } from 'react-router-dom';


export default function Register() {
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
    <div>
      <div className="ribbon-button-container">
        <button className="logo" onClick={clickHome}/>
        <button className="ribbon-button" onClick={clickHome}>Store</button>
        <button className="ribbon-button">Library</button>
        <button className="ribbon-button" onClick={clickLogin}>Profile</button>
      </div>
      <div className="rectangle1"></div>
      <div className="register-rect">
        <div>
            USERNAME
        </div>
        <div>
            <input type='text' className='text-field'></input>
        </div>
        <div>
            EMAIL
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
        <div>
            REPEAT PASSWORD
        </div>
        <div>
            <input type='password' className='text-field'></input>
        </div>
        <Link to="/login" className='for-link'>Already have an account? Sign in here.</Link>
        <div>
            <button className='login-button'>Create account</button>
        </div>
      </div>
    </div>
    </ThemeProvider>
  )
}
