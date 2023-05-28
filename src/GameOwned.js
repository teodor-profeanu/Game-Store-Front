import React, {useState} from 'react'
import './Game.css';
import * as utils from './Utils';

export default function GameOwned({game}) {

  const { clickGame } = utils.useGame(game.id);

  return (
    <div className = "game" onClick={clickGame}>
      <img className="image" style={{ backgroundImage: `url(${game.iconURL})`}} />
      <div className="title">
        {game.name}
      </div>
      <div className='user-info'>
        <div>
          {game.hoursPlayed} hrs on record
        </div>
        <div>
          {game.lastPlayed == 0 || game.lastPlayed == null || game.lastPlayed == "" ? "Never played" : "Last played on " + (new Date(game.lastPlayed)).toLocaleString("en-UK", { day: "numeric", month: "short" })}
          
        </div>
      </div>
    </div>
  )
}
