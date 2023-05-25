import React, {useState} from 'react';
import Games from './Games';
import './FrontPage.css';
import { IconButton } from '@mui/material'
import SearchIcon from '@mui/icons-material/Search';
import NorthEastIcon from '@mui/icons-material/NorthEast';
import SouthEastIcon from '@mui/icons-material/SouthEast';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';

export default function FrontPage() {
  const navigate = useNavigate();
  const clickLogin = () => {navigate("/login")};
  const clickHome = () => {navigate("/")};

  const [games, setGames] = useState([{
    id: 1,
    name: "Valorant",
    developerId: 1,
    releaseDate: "2023-05-23",
    priceEuro:155.99,
    sales: 0,
    iconURL: 'https://play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP',
    description: "joc stas",
    nrOfReviews: 0,
    rating: 0.0,
    discountPercent: 20,
    owned: false,
    hoursPlayed: 5.0,
    lastPlayed: "2023-05-23"
},{
  id: 2,
  name: "Minecraft",
  developerId: 1,
  releaseDate: "2023-05-23",
  priceEuro:5,
  sales: 0,
  iconURL: 'https://play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP',
  description: "joc stas",
  nrOfReviews: 0,
  rating: 0.0,
  discountPercent: 0,
  owned: false,
  hoursPlayed: 5.0,
  lastPlayed: "2023-05-23"
},{
  id: 3,
  name: "Valorant",
  developerId: 1,
  releaseDate: "2023-05-23",
  priceEuro:39.99,
  sales: 0,
  iconURL: 'https://play-lh.googleusercontent.com/VSwHQjcAttxsLE47RuS4PqpC4LT7lCoSjE7Hx5AW_yCxtDvcnsHHvm5CTuL5BPN-uRTP',
  description: "joc stas",
  nrOfReviews: 0,
  rating: 0.0,
  discountPercent: 20,
  owned: false,
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

const [lastPressedButton, setLastPressedButton] = useState(1);
const [ascending, setAscending] = useState(true);
const [isChecked, setIsChecked] = useState(false);
const [page, setPage] = useState(1);

const gamesPerPage = 10;
const [start, setStart] = useState(0);
const [end, setEnd] = useState(gamesPerPage);
const [nrOfPages, setNrOfPages] = useState(parseInt(games.length/gamesPerPage) + (games.length%gamesPerPage!==0 ? 1 : 0));
const nextPage = () =>{
  setPage(page+1);
  setStart (start + gamesPerPage);
  setEnd (end + gamesPerPage);
  console.log(page, start, end);
}
const prevPage = () =>{
  setPage(page-1);
  setStart (start - gamesPerPage);
  setEnd (end - gamesPerPage);
  console.log(page, start, end);
}

  return (
    <ThemeProvider theme={theme}>
      <div>
        <div className="ribbon-button-container">
          <button className="logo" onClick={clickHome}/>
          <button className="ribbon-button" onClick={clickHome}>Store</button>
          <button className="ribbon-button">Library</button>
          <button className="ribbon-button" onClick={clickLogin}>Profile</button>
        </div>
        <div className="section-button-container">
          <div className="rectangle3"></div>
          <button className={lastPressedButton===1 ? "section-button-active" : "section-button"} onClick={() => setLastPressedButton(1)}>Featured</button>
          <button className={lastPressedButton===2 ? "section-button-active" : "section-button"} onClick={() => setLastPressedButton(2)}>Trending</button>
          <button className={lastPressedButton===3 ? "section-button-active" : "section-button"} onClick={() => setLastPressedButton(3)}>Top sellers</button>
          <button className={lastPressedButton===4 ? "section-button-active" : "section-button"} onClick={() => setLastPressedButton(4)}>New releases</button>
          <div className="rectangle5"></div>
          <div className="rectangle4"></div>
        </div>
        <div className="rectangle1"></div>
        <div className="rectangle2"></div>
        <div className="search-rect">
          <div className="search-bar-combo">
            <div>
              <input className="search-bar" type = "text" placeholder="search"/>
              <IconButton aria-label="search" color = 'secondary' sx={{ '&:hover': { color: 'white' }}} ><SearchIcon /></IconButton>
            </div>
            <div>
              sort by:
              <select className='dropdown'>
                <option value="nothing">nothing</option>
                <option value="sales">sales</option>
                <option value="rating">rating</option>
                <option value="reviews">reviews</option>
                <option value="date">date</option>
                <option value="price">price</option>
              </select>
              <IconButton color={ascending ? 'primary' : 'secondary'} onClick={()=>setAscending(true)} sx={{ '&:hover': { color: 'white' }}}><NorthEastIcon/></IconButton>
              <IconButton color={!ascending ? 'primary' : 'secondary'} onClick={()=>setAscending(false)} sx={{ '&:hover': { color: 'white' }}}><SouthEastIcon/></IconButton>
            </div>
            <div>
              min price:
              <input className="number-field" type = "text" placeholder="0"/>
            </div>
            <div>
              max price:
              <input className="number-field2" type = "text" placeholder="9999"/>
            </div>
            <div>
              has discount:
              <input className="checkbox" type = "checkbox" onChange={(event) => setIsChecked(event.target.checked)}/>
            </div>
            <div>
              tag:
              <select className='dropdown2'>
                <option value="nothing">nothing</option>
              </select>
            </div>
          </div>
        </div>
        <div className="games-position">
          <Games games = {games.slice(start,end)}/>
          <div className="page-number">
            {
              (page>1) ?
              (<IconButton color='secondary' sx={{ '&:hover': { color: 'white' }}} onClick={prevPage}><NavigateBeforeIcon/></IconButton>) :
              (<div/>)
            }
            {page} / {nrOfPages}
            {
              (page<nrOfPages) ?
              (<IconButton color='secondary' sx={{ '&:hover': { color: 'white' }}} onClick={nextPage}><NavigateNextIcon/></IconButton>) :
              (<div/>)
            }
          </div>
        </div>
      </div>
      </ThemeProvider>
  )
}
