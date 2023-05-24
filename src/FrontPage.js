import React, {useState} from 'react';
import Games from './Games';
import './FrontPage.css';
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import { createTheme, ThemeProvider } from '@mui/material/styles';

export default function FrontPage() {
  const [games, setGames] = useState([{
    id: 1,
    name: "Valorant",
    developerId: 1,
    releaseDate: "2023-05-23",
    priceEuro: 55.0,
    sales: 0,
    iconURL: "",
    description: "joc stas",
    nrOfReviews: 0,
    rating: 0.0,
    discountPercent: 0,
    owned: true,
    hoursPlayed: 5.0,
    lastPlayed: "2023-05-23"
}]);
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
const [lastPressedButton, setLastPressedButton] = useState(null);
const [ascending, setAscending] = useState(true);
const clickAscending = () => {
  setAscending(true);
};
const clickDescending = () => {
  setAscending(false);
};
  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="ribbon-button-container">
          <button className="logo"/>
          <button className="ribbon-button">Store</button>
          <button className="ribbon-button">Library</button>
          <button className="ribbon-button">Profile</button>
        </div>
        <div className="section-button-container">
          <div className="rectangle3"></div>
          <button className={lastPressedButton==1 ? "section-button-active" : "section-button"} onClick={() => setLastPressedButton(1)}>Trending</button>
          <button className={lastPressedButton==2 ? "section-button-active" : "section-button"} onClick={() => setLastPressedButton(2)}>Top sellers</button>
          <button className={lastPressedButton==3 ? "section-button-active" : "section-button"} onClick={() => setLastPressedButton(3)}>New releases</button>
          <div className="rectangle5"></div>
          <div className="rectangle4"></div>
        </div>
        <Games games = {games}/>
        <div className="rectangle1"></div>
        <div className="rectangle2"></div>
        <div className="search-rect">
          <div className="search-bar-combo">
            <input className="search-bar" type = "text" placeholder="search"/>
            <IconButton aria-label="search" color = 'secondary' sx={{ '&:hover': { color: 'white' }}} ><SearchIcon /></IconButton>
            Sort by:
            <select className='dropdown'>
              <option value="nothing">nothing</option>
              <option value="sales">sales</option>
              <option value="rating">rating</option>
              <option value="reviews">reviews</option>
              <option value="date">date</option>
              <option value="price">price</option>
            </select>
            <IconButton color={ascending ? 'primary' : 'secondary'} onClick={clickAscending}><NorthEastIcon/></IconButton>
            <IconButton color={!ascending ? 'primary' : 'secondary'} onClick={clickDescending}><SouthEastIcon/></IconButton>
          </div>
        </div>
      </div>
      </ThemeProvider>
  )
}
