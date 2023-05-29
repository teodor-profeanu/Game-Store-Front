import { React, useState, useEffect } from 'react'
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

    let tempUser;

    const gamesPerPage = 7;
    const [start, setStart] = useState(0);
    const [end, setEnd] = useState(gamesPerPage);
    const [nrOfPages, setNrOfPages] = useState(0);

    const [user, setUser] = useState({
            id: 12345678,
            username: "User doesn't exist.",
            email: "",
            password: "",
            permissionId: 3,
            dateJoined: "",
            nickname: null,
            iconURL: "https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_640.png",
            bio: "",
            games: []
    });

    useEffect(()=>{
        fetch(`${utils.getUserURL}?id=${id}`)
        .then(response => response.json())
        .then(res => {
        if(res.status!==200){
            if(id === utils.loggedUser.id)
                localStorage.setItem("user", "");
        }
        else{
            tempUser = res.object;
            setNrOfPages(Math.ceil(tempUser.games.length/gamesPerPage));
            setUser(tempUser);
            if(tempUser.id===utils.loggedUser.id){
                localStorage.setItem("user", JSON.stringify(tempUser));
                utils.setLoggedUser(tempUser);
            }
        }})
        .catch(rejected => {
            console.log(rejected);
        });
    }, [id])
    

    const { clickLogin } = utils.useLogin();
    const { clickHome } = utils.useHome();
    const { clickStore } = utils.useStore();
    const { clickEdit } = utils.useEdit();
    const { clickChange } = utils.useChange();

    const [page, setPage] = useState(1);

    const nextPage = () =>{
        setPage(page+1);
        setStart (start + gamesPerPage);
        setEnd (end + gamesPerPage);
    }
        const prevPage = () =>{
        setPage(page-1);
        setStart (start - gamesPerPage);
        setEnd (end - gamesPerPage);
    }

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
            <div className='user-banner'>
                <img className="user-image" style={{ backgroundImage: `url(${user.iconURL})`}} />
                <div className='user-name'>{user.nickname == null || user.nickname == "" ? user.username : user.nickname}</div>
                <div className='user-bio'>{user.bio}</div>
                <div className='user-owned'>{user.id != 12345678 ? (user.games.length > 0 ? "Owned games" : "No games owned") : ""}</div>
            </div>
            <div>
                {utils.loggedUser.id === user.id ?
                    (<div className='button-group'>
                        <button className='edit-button' onClick={clickEdit}>Edit</button>
                        <button className='edit-button' onClick={clickChange} style={{width:"170px"}}>Change password</button>
                        <button className='logout-button' onClick={()=>{
                            localStorage.setItem("user", "");
                            window.location.reload();
                        }}>Logout</button>
                    </div>) : <div></div>
                }
            </div>
            
            <div className="rectangle5"></div>

            {user.games.length != 0 ? 
            (<div className="user-games-position">
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
            </div>) : <div></div>}
        </div>
      </ThemeProvider>
    </div>
  )
}
