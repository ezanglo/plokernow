import {currentGame} from "src/store/game/getters";

export const setCurrentGame = (state, currentGame) => {
    state.currentGame = currentGame
}

export const addPlayerToCurrentGame = (state, player) => {
    state.currentGame.players.push([player])
}

export const updateCurrentGamePlayers = (state, payload) => {
  if(payload.id === state.currentGame.id){
    state.currentGame = {
      ...state.currentGame,
      players: payload.players
    }
  }
}
