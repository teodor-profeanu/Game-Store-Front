import { React, useState, useEffect } from 'react'
import "./GameSection.css"
import "./Store.css"
import { IconButton } from '@mui/material'
import NavigateNextIcon from '@mui/icons-material/NavigateNext';
import NavigateBeforeIcon from '@mui/icons-material/NavigateBefore';
import Review from './Review';
import * as utils from './Utils';

export default function GameSection({ game }) {

  const { clickReview } = utils.useReview(game.id);

  const [page, setPage] = useState(1)

  const [img, setImg] = useState(game.images.length > 0 ? game.images[0].imageURL : "")

  const [nrOfPages, setNrOfPages] = useState(1 > game.images.length ? 1 : game.images.length);
  const nextPage = () => {
    setImg(game.images[page].imageURL);
    setPage(page + 1);
  }
  const prevPage = () => {
    setImg(game.images[page - 2].imageURL);
    setPage(page - 1);
  }

  const [reviews, setReviews] = useState([]);

  const reviewsPerPage = 5;

  const [start, setStart] = useState(0);

  const [end, setEnd] = useState(reviewsPerPage);

  const [reviewPageNr, setReviewPageNr] = useState(Math.ceil(reviews.length / reviewsPerPage));

  const [reviewPage, setReviewPage] = useState(1);

  const nextReview = () => {
    setReviewPage(reviewPage + 1);
    setStart(start + reviewsPerPage);
    setEnd(end + reviewsPerPage);
  }
  const prevReview = () => {
    setReviewPage(reviewPage - 1);
    setStart(start - reviewsPerPage);
    setEnd(end - reviewsPerPage);
  }

  useEffect(()=>{
    fetch(`${utils.getReviewsURL}?gameId=${game.id}&userId=${utils.loggedUser.id}`)
    .then(response => response.json())
    .then(res => {
      if (res.status === 200) {
        setReviews(res.object);
        setReviewPageNr(Math.ceil(reviews.length / reviewsPerPage));
      }
    }).catch(error => {
      console.log("Error:", error);
    });
  }, [game])

  return (
    <div className='whole'>
      <img className="section-image" style={{ backgroundImage: `url(${game.iconURL})` }} />
      {game.id !== 12345678 ?
        <div>
          <div className='section-title'>{game.name}</div>
          <div style={{ position: "absolute", top: "260px", marginLeft: "50px" }}>
            <div style={{ marginBottom: "20px" }}>
              <button className='buy-button'>{game.owned === true ? "Play game" : "Buy now!"}</button>
            </div>
            <div>
              <img className="section-imgs" style={{ backgroundImage: `url(${img})` }} />
              {nrOfPages === 0 ? <div /> :
                <div className="section-page">
                  {
                    (page > 1) ?
                      (<IconButton color='secondary' sx={{ '&:hover': { color: 'white' } }} onClick={prevPage}><NavigateBeforeIcon /></IconButton>) :
                      (<div />)
                  }
                  {page} / {nrOfPages}
                  {
                    (page < nrOfPages) ?
                      (<IconButton color='secondary' sx={{ '&:hover': { color: 'white' } }} onClick={nextPage}><NavigateNextIcon /></IconButton>) :
                      (<div />)
                  }
                </div>}
            </div>
            <div style={{ color: "gray", lineHeight: 1.5, fontSize: "15px", position: "relative", left: "500px", top: "-430px" }}>
              <div>RATING: <div style={{ color: "#06beff", display: "inline", marginLeft: "61px" }}>{game.rating + " ★"}</div></div>
              <div>REVIEWS: <div style={{ color: "#06beff", display: "inline", marginLeft: "48px" }}>{game.nrOfReviews}</div></div>
              <div>RELEASE DATE: <div style={{ color: "#06beff", display: "inline", marginLeft: "5px" }}>{" " + (new Date(game.releaseDate)).toLocaleString("en-UK", { day: "numeric", month: "short", year: "numeric" })}</div></div>
              <div style={{ color: "white", lineHeight: 1.5, marginTop: "10px", width: "250px" }}>
                {game.description}
                <div style={{ color: "gray" }}>Tags:{" " + game.tags.map(item => item.name).join(", ")}</div>
              </div>
            </div>
            <div style={{ position: "absolute", top: "560px", fontSize: "25px" }}>Reviews</div>
            <div className='review-block'>
              {reviews.slice(start, end).map(review => {
                return <Review key={review.id} review={review} />
              })}
              {reviewPageNr === 0 ? <div /> :
                <div className="section-page">
                  {
                    (reviewPage > 1) ?
                      (<IconButton color='secondary' sx={{ '&:hover': { color: 'white' } }} onClick={prevReview}><NavigateBeforeIcon /></IconButton>) :
                      (<div />)
                  }
                  {reviewPage} / {reviewPageNr}
                  {
                    (reviewPage < reviewPageNr) ?
                      (<IconButton color='secondary' sx={{ '&:hover': { color: 'white' } }} onClick={nextReview}><NavigateNextIcon /></IconButton>) :
                      (<div />)
                  }
                </div>}
            </div>
          </div>
          <div className='rectangle7' />
          {game.owned === false ?
            <div className='section-price'>{game.discountPercent === 0 ?
              game.priceEuro :
              (<div style={{ display: "inline" }}>
                <div style={{ display: "inline", textDecoration: "line-through" }}>{game.priceEuro}</div>
                <div style={{ display: "inline" }}>{" " + (game.priceEuro * (100.0 - game.discountPercent) / 100.0).toFixed(2)}
                </div>
              </div>)}€
            </div> :
            <div className='hrs-and-last'>
              {game.hoursPlayed + " "}hrs onr record
              <div style={{ display: "inline", marginLeft: "150px" }}>{game.lastPlayed == 0 || game.lastPlayed == null || game.lastPlayed == "" ? "Never played" : "Last played on " + (new Date(game.lastPlayed)).toLocaleString("en-UK", { day: "numeric", month: "short" })}</div>
              {reviews.length==0 || reviews.length>0 && reviews[0].userId!==utils.loggedUser.id && game.owned ?
                  <button className='leave-review' onClick={clickReview}>Leave a review</button> : <div/>
              }
              
            </div>}
        </div> : <div />
      }
    </div>
  )
}
