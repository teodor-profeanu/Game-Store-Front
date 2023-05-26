import React from 'react'
import './Store.css';
import './Login.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import * as utils from './Utils';


export default function Edit() {

  const { clickLogin } = utils.useLogin();
  const { clickHome } = utils.useHome();
  const { clickStore } = utils.useStore();

  return (
    <ThemeProvider theme={utils.theme}>
    <div>
      <div className="ribbon-button-container">
        <button className="logo" onClick={clickHome}/>
        <button className="ribbon-button" onClick={clickStore}>Store</button>
        <button className="ribbon-button">Library</button>
        <button className="ribbon-button" onClick={clickLogin}>Profile</button>
      </div>
      <div className="rectangle1"></div>
      <div className="register-rect">
        <div>
            NICKNAME
        </div>
        <div>
            <input type='text' className='text-field'></input>
        </div>
        <div>
            PROFILE PICTURE LINK
        </div>
        <div>
            <input type='text' className='text-field'></input>
        </div>
        <div>
            DESCRIPTION
        </div>
        <div>
            <textarea className='text-field-large'></textarea>
        </div>
        <div>
            <button className='login-button'>Confirm edit</button>
        </div>
      </div>
    </div>
    </ThemeProvider>
  )
}
