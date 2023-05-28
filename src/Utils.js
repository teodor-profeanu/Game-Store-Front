import { useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';

export const loginURL = "http://localhost:8080/user/login"
export const getUserURL = "http://localhost:8080/user"
export const registerURL = "http://localhost:8080/user/register"
export const editURL = "http://localhost:8080/user/edit"
export const changeURL = "http://localhost:8080/user/change-password"
export const getGameURL = "http://localhost:8080/game"
export const getReviewsURL = "http://localhost:8080/reviews"
export const deleteReviewURL = "http://localhost:8080/review/delete"
export const addReviewURL = "http://localhost:8080/review/add"

export const theme = createTheme({
    palette: {
      primary: {
        main: '#ffffff',
      },
      secondary: {
        main: '#3994bc',
      },
    },
  });

export const useLogin = () => {
    const navigate = useNavigate();
    if(loggedUser.id === 0){
        const clickLogin = () => {
            navigate('/login');
            };
        return {
        clickLogin
        };
    }
    else{
        const clickLogin = () => {
            navigate("/user/" + loggedUser.id);
            };
        return {
        clickLogin
        };
    }
  };

  export const useUser = () => {
    const navigate = useNavigate();
    const clickUser = () => {
      if(loggedUser.id!==0)
        navigate('/user/'+loggedUser.id);
    };
    return {
      clickUser
    };
  };

  export const useHome = () => {
    const navigate = useNavigate();
    const clickHome = () => {
      navigate('/');
    };
    return {
        clickHome
    };
  };

  export const useStore = () => {
    const navigate = useNavigate();
    const clickStore = () => {
      navigate('/store');
    };
    return {
        clickStore
    };
  };

  export const useEdit = () => {
    const navigate = useNavigate();
    const clickEdit = () => {
      navigate('/edit');
    };
    return {
        clickEdit
    };
  };

  export const useChange = () => {
    const navigate = useNavigate();
    const clickChange = () => {
      navigate('/change-password');
    };
    return {
        clickChange
    };
  };

  export const useGame = (id) => {
    const navigate = useNavigate();
    const clickGame = () => {
      navigate('/game/'+id);
    };
    return {
      clickGame
    };
  };

  export const useReview = (id) => {
    const navigate = useNavigate();
    const clickReview = () => {
      navigate('/review/'+id);
    };
    return {
      clickReview
    };
  };

  export let loggedUser = localStorage.getItem("user") == null || localStorage.getItem("user") == "" ? { 
    id: 0,
    username: "",
    email: "",
    password: "",
    permissionId: 3,
    dateJoined: "",
    nickname: null,
    iconURL: null,
    bio: "",
    games: []
} : JSON.parse(localStorage.getItem("user"));

export const setLoggedUser = (user) =>{
  loggedUser = user;
}