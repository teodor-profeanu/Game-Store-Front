import React, {useState, useRef} from 'react'
import './Store.css';
import './Login.css';
import {ThemeProvider } from '@mui/material/styles';
import * as utils from './Utils';


export default function ChangePass() {

  const [errMess, setErrMess] = useState('');

  const oldRef = useRef("old");
  const newRef = useRef("new");

  const { clickLogin } = utils.useLogin();
  const { clickHome } = utils.useHome();
  const { clickStore } = utils.useStore();

  const handleChange = () =>{
    const oldPass = oldRef.current.value;
    const newPass = newRef.current.value;

    fetch(`${utils.changeURL}?id=${utils.loggedUser.id}&oldPassword=${oldPass}&newPassword=${newPass}`, {
      method: 'PUT',
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
    <div className='diff-back'>
      <div className="ribbon-button-container">
        <button className="logo" onClick={clickHome}/>
        <button className="ribbon-button" onClick={clickStore}>Store</button>
        <button className="ribbon-button" onClick={clickLogin}>Profile</button>
      </div>
      <div className="rectangle1"></div>
      <div className="login-rect">
        <div>
            CURRENT PASSWORD
        </div>
        <div>
        <input type='password' className='text-field' ref={oldRef}></input>
        </div>
        <div>
            NEW PASSWORD
        </div>
        <div>
            <input type='password' className='text-field' ref={newRef}></input>
        </div>
        <div>
            <button className='login-button' onClick={handleChange}>Change password</button>
        </div>
        <div style={{color:"red", fontWeight:"400"}}>{errMess}</div>
      </div>
    </div>
    </ThemeProvider>
  )
}
