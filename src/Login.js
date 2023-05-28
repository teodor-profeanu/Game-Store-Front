import React, { useRef, useState } from 'react'
import './Store.css';
import './Login.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import * as utils from './Utils';


export default function Login() {

  const usernameRef = useRef("username");
  const passwordRef = useRef("password");


  const { clickLogin } = utils.useLogin();
  const { clickHome } = utils.useHome();
  const { clickStore } = utils.useStore();
  const { clickUser } = utils.useUser();

  const [errMess, setErrMess] = useState('');

  const handleLogin = ()=>{
    const username = usernameRef.current.value;
    const password = passwordRef.current.value;
    fetch(`${utils.loginURL}?usernameEmail=${username}&password=${password}`)
    .then(response => response.json())
    .then(user => {
      if(user.status!==200){
        setErrMess(user.message);
      }
      else{
        utils.setLoggedUser(user.object);
        clickUser(user.object.id);
        localStorage.setItem("user", JSON.stringify(user.object));
      }
  });
  }

  return (
    <ThemeProvider theme={utils.theme}>
    <div className='diff-back'>
      <div className="ribbon-button-container">
        <button className="logo" onClick={clickHome}/>
        <button className="ribbon-button" onClick={clickStore}>Store</button>
        <button className="ribbon-button" onClick={clickLogin}>Profile</button>
      </div>
      <div className="rectangle1"></div>
      <div className="login-rect">
        <div>
            SIGN IN WITH EMAIL OR USERNAME
        </div>
        <div>
            <input type='text' className='text-field' ref={usernameRef}></input>
        </div>
        <div>
            PASSWORD
        </div>
        <div>
            <input type='password' className='text-field' ref={passwordRef}></input>
        </div>
        <Link to="/register" className='for-link'>Don't have an account? Create one now!</Link>
        <div>
            <button className='login-button' onClick={handleLogin}>Sign in</button>
        </div>
        <div style={{color:"red", fontWeight:"400"}}>{errMess}</div>
      </div>
    </div>
    </ThemeProvider>
  )
}
