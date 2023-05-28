import React from 'react'
import { Link } from 'react-router-dom';
import DeleteIcon from '@mui/icons-material/Delete';
import { IconButton } from '@mui/material'
import './Review.css'
import * as utils from './Utils';

export default function Review({ review }) {

  const handleDelete = () =>{
    fetch(`${utils.deleteReviewURL}?id=${review.id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
      },
      body: ""})
    .then(response => response.json())
    .then(res => {
      window.location.reload();
    }).catch(error=>{
      console.log("Error:", error);
    });
  }

  return (
    <div className='review-mess'>
      <div style={{ margin: "15px" }}>
        <Link to={"/user/" + review.userId} style={{ color: "#06beff" }}>{review.user.username}</Link>
        <div style={{ display: "inline", color: "gray", fontWeight: "300", marginLeft: "10px" }}> gave this game</div>
        <div style={{ display: "inline", color: "#06beff", fontWeight: "400" }}>
          {" " + review.rating + " ★"}
          <div style={{display:"inline"}}>
            {review.userId===utils.loggedUser.id ? 
            <IconButton color='secondary' sx={{ '&:hover': { color: 'white' } }} onClick={handleDelete}><DeleteIcon /></IconButton> :
            <div/>}
          </div>
          
        </div>
      </div>
      <div style={{ marginLeft: "15px" }}>{review.message}</div>
    </div>
  )
}
