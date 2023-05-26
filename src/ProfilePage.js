import { React, useState } from 'react'
import { ThemeProvider } from '@mui/material/styles';
import * as utils from './Utils';
import { useParams } from 'react-router-dom';
import './Store.css';
import './ProfilePage.css';
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import { IconButton } from '@mui/material'
import Games from './Games'

export default function ProfilePage() {
    const { id } = useParams();

    const [user, setUser] = useState({
        id: 1,
        username: "user",
        email: "to@gmail.com",
        password: "qwertyui",
        permissionId: 3,
        dateJoined: "2023-05-23",
        nickname: "null",
        iconURL: "https://i.ytimg.com/vi/omtG5unQnAU/maxresdefault.jpg",
        bio: "I like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuffI like stuff",
        games: [
            {
                id: 4,
                name: "Valorant",
                developerId: 2,
                releaseDate: "2023-05-23",
                priceEuro: 55.0,
                sales: 0,
                iconURL: "https://meupc.net/wp/wp-content/uploads/2020/05/VALORANT-e%CC%81-o-shooter-da-Riot-Games-71.jpg",
                description: "joc stas",
                nrOfReviews: 0,
                rating: 0.0,
                discountPercent: 0,
                owned: true,
                hoursPlayed: 5.0,
                lastPlayed: "2023-05-23"
            }
        ]
    });

    const { clickLogin } = utils.useLogin();
    const { clickHome } = utils.useHome();
    const { clickStore } = utils.useStore();
    const { clickEdit } = utils.useEdit();
    const { clickChange } = utils.useChange();

    const [page, setPage] = useState(1);

    const gamesPerPage = 7;
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(gamesPerPage);
    const [nrOfPages, setNrOfPages] = useState(parseInt(user.games.length/gamesPerPage) + (user.games.length%gamesPerPage!==0 ? 1 : 0));
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
    <div>
      <ThemeProvider theme={utils.theme}>
        <div>
            <div className="ribbon-button-container">
                <button className="logo" onClick={clickHome}/>
                <button className="ribbon-button" onClick={clickStore}>Store</button>
                <button className="ribbon-button">Library</button>
                <button className="ribbon-button" onClick={clickLogin}>Profile</button>
            </div>
            <div className="rectangle1"></div>
            <div className='user-banner'>
                <img className="user-image" style={{ backgroundImage: `url(${user.iconURL})`}} />
                <div className='user-name'>{user.nickname == null || user.nickname == "" ? user.username : user.nickname}</div>
                <div className='user-bio'>{user.bio}</div>
                <div className='user-owned'>Owned games</div>
            </div>
            <button className='edit-button' onClick={clickEdit}>Edit</button>
            <button className='edit-button' onClick={clickChange} style={{width:"170px"}}>Change password</button>
            <button className='logout-button'>Logout</button>
            <div className="rectangle5"></div>
            <div className="user-games-position">
                <Games games = {user.games.slice(start,end)}/>
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
    </div>
  )
}
