import * as gameService from '../../services/game.service.js'
import { store } from '../index.js'

export const createNewGame = async function (context, payload) {
  const isAuthenticated = store.state.auth.isAuthenticated
  if (!isAuthenticated) {
    await store.dispatch('auth/loginAnonymously')
    await createNewGame(context, payload)
  }
  payload.createdBy = store.state.auth.uid
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
  const players = await gameService.getGamePlayers(gameId)
  const player = players.find(p => p.userId == store.state.auth.uid)
  if(!player){
    await addCurrentUserToGame(context, gameId)
  }
  await gameService.addGamePlayersListener(gameId, function(players){
    context.commit('updateCurrentGamePlayers', {id: gameId, players: players});
  });

  await gameService.addGameListener(gameId, function(game){
    context.commit('updateCurrentGame', game);
  })
  return {...gameDetails, id: gameId, players: players}
}

export const updatePlayerName = async  function(context, payload) {
  await gameService.updateGamePlayer(payload.gameId, {
    id: payload.playerId,
    playerName: payload.playerName
  })
}

export const deleteGamePlayer = async  function(context, payload) {
  await gameService.deleteGamePlayer(payload.gameId, payload.playerId)
}

export const updatePlayerVote = async  function(context, payload) {
  await gameService.updateGamePlayer(payload.gameId, {
    id: payload.playerId,
    playerVote: payload.playerVote
  })
}

export const updateGameVotesVisibility = async  function(context, payload) {
  await gameService.updateGame(payload)
}

export const resetGame = async  function(context, gameId) {
  await gameService.resetGame(gameId)
}
