import React, {useRef, useState} from 'react'
import './Store.css';
import './Login.css';
import { ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import * as utils from './Utils';


export default function Register() {
  const usernameRef = useRef("username");
  const emailRef = useRef("email");
  const passwordRef = useRef("password");
  const repeatRef = useRef("repeat");

  const { clickLogin } = utils.useLogin();
  const { clickHome } = utils.useHome();
  const { clickStore } = utils.useStore();

  const [errMess, setErrMess] = useState('');

  const handleRegister = () =>{
    const username = usernameRef.current.value;
    const email = emailRef.current.value;
    const password = passwordRef.current.value;
    const repeat = repeatRef.current.value;

    fetch(`${utils.registerURL}?username=${username}&email=${email}&password=${password}&repeatPassword=${repeat}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: ""})
    .then(response => response.json())
    .then(res => {
      if(res.status === 200){
        clickLogin();
      }
      else{
        setErrMess(res.message)
      }
    }).catch(error=>{
      console.log("Error:", error);
    });
  }

  return (
    <ThemeProvider theme={utils.theme}>
    <div>
      <div className="ribbon-button-container">
        <button className="logo" onClick={clickHome}/>
        <button className="ribbon-button" onClick={clickStore}>Store</button>
        <button className="ribbon-button" onClick={clickLogin}>Profile</button>
      </div>
      <div className="rectangle1"></div>
      <div className="register-rect">
        <div>
            USERNAME
        </div>
        <div>
            <input type='text' className='text-field' ref={usernameRef}></input>
        </div>
        <div>
            EMAIL
        </div>
        <div>
            <input type='text' className='text-field' ref={emailRef}></input>
        </div>
        <div>
            PASSWORD
        </div>
        <div>
            <input type='password' className='text-field' ref={passwordRef}></input>
        </div>
        <div>
            REPEAT PASSWORD
        </div>
        <div>
            <input type='password' className='text-field' ref={repeatRef}></input>
        </div>
        <Link to="/login" className='for-link'>Already have an account? Sign in here.</Link>
        <div>
            <button className='login-button' onClick={handleRegister}>Create account</button>
        </div>
        <div style={{color:"red", fontWeight:"400"}}>{errMess}</div>
      </div>
    </div>
    </ThemeProvider>
  )
}
