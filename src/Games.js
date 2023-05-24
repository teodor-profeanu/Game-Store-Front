import React from 'react'
import Game from './Game'

export default function Games( { games } ) {
  return (
    games.map(game =>{
        return <Game key={game.id} game = {game}/>
    })
  )
}
