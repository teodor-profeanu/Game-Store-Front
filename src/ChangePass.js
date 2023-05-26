import React from 'react'
import './Store.css';
import './Login.css';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { Link } from 'react-router-dom';
import * as utils from './Utils';


export default function ChangePass() {

  const { clickLogin } = utils.useLogin();
  const { clickHome } = utils.useHome();
  const { clickStore } = utils.useStore();

  return (
    <ThemeProvider theme={utils.theme}>
    <div className='diff-back'>
      <div className="ribbon-button-container">
        <button className="logo" onClick={clickHome}/>
        <button className="ribbon-button" onClick={clickStore}>Store</button>
        <button className="ribbon-button">Library</button>
        <button className="ribbon-button" onClick={clickLogin}>Profile</button>
      </div>
      <div className="rectangle1"></div>
      <div className="login-rect">
        <div>
            CURRENT PASSWORD
        </div>
        <div>
        <input type='password' className='text-field'></input>
        </div>
        <div>
            NEW PASSWORD
        </div>
        <div>
            <input type='password' className='text-field'></input>
        </div>
        <div>
            <button className='login-button'>Change password</button>
        </div>
      </div>
    </div>
    </ThemeProvider>
  )
}
