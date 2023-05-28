import React, { useState, useRef, useEffect } from 'react'
import './Store.css';
import './Login.css';
import { ThemeProvider } from '@mui/material/styles';
import * as utils from './Utils';
import { useParams } from 'react-router-dom';
import StarIcon from '@mui/icons-material/Star';
import { IconButton } from '@mui/material'


export default function LeaveReview() {
    const { id } = useParams();

    const { clickGame } = utils.useGame(id);

    const [errMess, setErrMess] = useState('');

    const messageRef = useRef("message");

    const { clickLogin } = utils.useLogin();
    const { clickHome } = utils.useHome();
    const { clickStore } = utils.useStore();

    const [rating, setRating] = useState(0);

    const numbers = Array.from({ length: 10 }, (_, index) => index + 1);

    const handleReview = () => {
        const message = messageRef.current.value;

        fetch(`${utils.addReviewURL}?gameId=${id}&userId=${utils.loggedUser.id}&rating=${rating}&message=${message}`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: ""
        })
            .then(response => response.json())
            .then(res => {
                if (res.status === 200) {
                    clickGame();
                }
                else {
                    setErrMess(res.message)
                }
            }).catch(error => {
                console.log("Error:", error);
            });
    }

    const [mappedItems, setMappedItems] = useState([]);

    useEffect(()=>{

        const mappedItems = numbers.map((number) => {
            return (
                <IconButton color={rating >= number ? 'secondary' : 'white'} key={number} onClick={()=>setRating(number)}><StarIcon /></IconButton>
            );
          });
        setMappedItems(mappedItems);
    }, [rating])

    return (
        <ThemeProvider theme={utils.theme}>
            <div>
                <div className="ribbon-button-container">
                    <button className="logo" onClick={clickHome} />
                    <button className="ribbon-button" onClick={clickStore}>Store</button>
                    <button className="ribbon-button" onClick={clickLogin}>Profile</button>
                </div>
                <div className="rectangle1"></div>
                <div className="register-rect">
                    <div>
                        RATING
                    </div>
                    <div style={{display:"inline"}}>
                        {mappedItems}
                    </div>
                    <div>
                        DESCRIPTION
                    </div>
                    <div>
                        <textarea className='text-field-large' ref={messageRef}></textarea>
                    </div>
                    <div>
                        <button className='login-button' onClick={handleReview}>Leave review</button>
                    </div>
                    <div style={{ color: "red", fontWeight: "400" }}>{errMess}</div>
                </div>
            </div>
        </ThemeProvider>
    )
}
