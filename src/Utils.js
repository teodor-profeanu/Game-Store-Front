import { useNavigate } from 'react-router-dom';
import { createTheme } from '@mui/material/styles';

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

  export let loggedUser = {
    id: 1,
    username: "user",
    email: "to@gmail.com",
    password: "qwertyui",
    permissionId: 3,
    dateJoined: "2023-05-23",
    nickname: null,
    iconURL: null,
    bio: "",
    games: [
        {
            id: 1,
            name: "Valorant",
            developerId: 2,
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
        }
    ]
};