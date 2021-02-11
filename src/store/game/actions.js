import * as gameService from '../../services/game.service.js'
import { store } from '../index.js'

export const createNewGame = async function (context, payload) {
  const isAuthenticated = store.state.auth.isAuthenticated
  if (!isAuthenticated) {
    await store.dispatch('auth/loginAnonymously')
  }
  const game = await gameService.insertGame(payload);
  await addCurrentUserToGame(context, game)
  return game.id
}

export const addCurrentUserToGame = async function ({ commit }, payload) {
  const isAuthenticated = store.state.auth.isAuthenticated
  console.log(store.state.auth);
  if(!isAuthenticated){
    await store.dispatch('auth/loginAnonymously')
  }
  await gameService.insertGamePlayer(payload.id, {
    userId: store.state.auth.uid
  })
}

export const getGameDetails = async function(context, gameId) {
  const game = await gameService.getGame(gameId).get()
  await addCurrentUserToGame(context, game)
  const players = await gameService.getGamePlayers(gameId)
  let gameDetails = game.data()
  return {...gameDetails, players: players}
}
