import React, {useState} from 'react'
import './Game.css';

export default function Game({game}) {
  return (
    <div className = "game">
      <img className="image" style={{ backgroundImage: `url(${game.iconURL})`}} />
      <div className="title">
        {game.name}
      </div>
      <div className="rating">
        Rating:{" "+game.rating.toFixed(2) + " ★"}
      </div>
      <div className='tags'>
        {game.tags.map(item => item.name).join(", ")}
      </div>
      <div>
      {
        (game.discountPercent === 0) ?
        (<div className="price">{game.priceEuro===0 ? "Free" : game.priceEuro + "€"}</div> ) :
        (<div className="price-group">
          <div className="price-old">
            {game.priceEuro}€
          </div> 
          <div className="price-new">
            {(game.priceEuro * (100.0-game.discountPercent)/100.0).toFixed(2)}€
          </div>
        </div> )
      }
      </div>
      <div>
        {
        (game.discountPercent !== 0) ?
        (<div className="discount">
          <div className="discount-text">
            {(-game.discountPercent)+"%"}
          </div>
        </div>) : (<div/>)
        }
      </div>
    </div>
  )
}
