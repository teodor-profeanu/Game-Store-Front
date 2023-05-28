import React from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as utils from './Utils';

export default function FrontPage() {

    const { clickLogin } = utils.useLogin();
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
      </div>
      </ThemeProvider>
    </div>
  )
}
