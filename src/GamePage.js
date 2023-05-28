import { React, useState, useEffect  } from 'react'
import { createTheme, ThemeProvider } from '@mui/material/styles';
import * as utils from './Utils';
import { useParams } from 'react-router-dom';
import GameSection from './GameSection';
import "./GamePage.css"

export default function GamePage() {
  const { id } = useParams();

  const { clickLogin } = utils.useLogin();
  const { clickHome } = utils.useHome();
  const { clickStore } = utils.useStore();

  const [game, setGame] = useState({
    id: 12345678,
    name: "",
    developerId: 2,
    releaseDate: "",
    priceEuro: 55.0,
    sales: 0,
    iconURL: "https://miro.medium.com/v2/resize:fit:800/1*hFwwQAW45673VGKrMPE2qQ.png",
    description: "",
    nrOfReviews: 0,
    rating: 0,
    discountPercent: 0,
    owned: false,
    hoursPlayed: 0.0,
    lastPlayed: null,
    tags: [],
    images: []
  });

  useEffect(()=>{
    fetch(`${utils.getGameURL}?id=${id}&userId=${utils.loggedUser.id}`)
    .then(response => response.json())
    .then(res => {
      if (res.status === 200) {
        setGame(res.object);
      }
    }).catch(error => {
      console.log("Error:", error);
    });
}, [id])

  return (
    <div>
      <ThemeProvider theme={utils.theme}>
        <div>
          <div className="ribbon-button-container">
            <button className="logo" onClick={clickHome} />
            <button className="ribbon-button" onClick={clickStore}>Store</button>
            <button className="ribbon-button" onClick={clickLogin}>Profile</button>
          </div>
          <div className="rectangle1"></div>
        </div>
        <div className='rectangle8' />
        <div className='whole-section'>
          <GameSection key={game.id} game={game} />
        </div>
      </ThemeProvider>
    </div>
  )
}
