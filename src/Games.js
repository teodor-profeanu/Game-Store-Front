import React from 'react'
import Game from './Game'
import GameOwned from './GameOwned'
import './Games.css';

export default function Games( { games } ) {
  return (
    games.map(game =>{
        return (game.owned === false ? <Game className = "game" key={game.id} game = {game}/> : <GameOwned className = "game" key={game.id} game = {game}/>)
    })
  )
}
