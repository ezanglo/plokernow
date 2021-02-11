import * as gameService from '../../services/game.service.js'
import { store } from '../index.js'

export const createNewGame = async function (context, payload) {
  const isAuthenticated = store.state.auth.isAuthenticated
  if (!isAuthenticated) {
    await store.dispatch('auth/loginAnonymously')
    await createNewGame(context, payload)
  }
  const game = await gameService.insertGame(payload);
  await addCurrentUserToGame(context, game.id)
  return game.id
}

export const addCurrentUserToGame = async function (context, gameId) {
  const isAuthenticated = store.state.auth.isAuthenticated
  if(!isAuthenticated){
    await store.dispatch('auth/loginAnonymously')
  }
  await gameService.insertGamePlayer(gameId, {
    userId: store.state.auth.uid
  })
}

export const getGameDetails = async function(context, gameId) {
  const isAuthenticated = store.state.auth.isAuthenticated
  if (!isAuthenticated) {
    await store.dispatch('auth/loginAnonymously')
    await getGameDetails(context, gameId)
  }
  const game = await gameService.getGame(gameId).get()
  let gameDetails = game.data()
  await addCurrentUserToGame(context, gameId)
  const players = await gameService.getGamePlayers(gameId)
  await gameService.addGameListener(gameId, function(players){
    context.commit('updateCurrentGamePlayers', {id: gameId, players: players});
  });
  return {...gameDetails, id: gameId, players: players}
}
