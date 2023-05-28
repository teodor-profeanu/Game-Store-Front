import React, {useState, useRef} from 'react'
import './Store.css';
import './Login.css';
import { ThemeProvider } from '@mui/material/styles';
import * as utils from './Utils';


export default function Edit(user) {

  const [errMess, setErrMess] = useState('');

  const nicknameRef = useRef("nickname");
  const bioRef = useRef("bio");
  const iconRef = useRef("icon");

  const { clickLogin } = utils.useLogin();
  const { clickHome } = utils.useHome();
  const { clickStore } = utils.useStore();

  const handleEdit = () =>{
    const nickname = nicknameRef.current.value;
    const icon = iconRef.current.value;
    const bio = bioRef.current.value;

    fetch(`${utils.editURL}?id=${utils.loggedUser.id}&nickname=${nickname}&bio=${bio}&iconURL=${icon}`, {
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
    <div>
      <div className="ribbon-button-container">
        <button className="logo" onClick={clickHome}/>
        <button className="ribbon-button" onClick={clickStore}>Store</button>
        <button className="ribbon-button" onClick={clickLogin}>Profile</button>
      </div>
      <div className="rectangle1"></div>
      <div className="register-rect">
        <div>
            NICKNAME
        </div>
        <div>
            <input type='text' className='text-field' defaultValue={utils.loggedUser.nickname} ref={nicknameRef}></input>
        </div>
        <div>
            PROFILE PICTURE LINK
        </div>
        <div>
            <input type='text' className='text-field' defaultValue={utils.loggedUser.iconURL} ref={iconRef}></input>
        </div>
        <div>
            DESCRIPTION
        </div>
        <div>
            <textarea className='text-field-large' defaultValue={utils.loggedUser.bio} ref={bioRef}></textarea>
        </div>
        <div>
            <button className='login-button' onClick={handleEdit}>Confirm edit</button>
        </div>
        <div style={{color:"red", fontWeight:"400"}}>{errMess}</div>
      </div>
    </div>
    </ThemeProvider>
  )
}
