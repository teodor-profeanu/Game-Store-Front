import React from 'react'
import { ThemeProvider } from '@mui/material/styles';
import * as utils from './Utils';
import './Store.css';

export default function FrontPage() {

    const { clickLogin } = utils.useLogin();
    const { clickRegister } = utils.useRegister();
    const { clickHome } = utils.useHome();
    const { clickStore } = utils.useStore();

  return (
    <div>
      <ThemeProvider theme={utils.theme}>
      <div>
        <div className="ribbon-button-container">
          <button className="logo" onClick={clickHome}/>
          <button className="ribbon-button" onClick={clickStore}>Store</button>
          <button className="ribbon-button" onClick={clickLogin}>Profile</button>
        </div>
        <div className="rectangle1"></div>
        <div className='big-title'>
          Welcome to Scheme
          <button className='login-button2' onClick={clickLogin}>Sign in</button>
          <button className='login-button2' onClick={clickRegister}>Register</button>
        </div>
        
      </div>
      </ThemeProvider>
    </div>
  )
}
