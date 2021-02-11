import { firestoreAction } from 'vuexfire'
import * as gameService from '../../services/game.service.js'
import { store } from '../index.js'

export const createNewGame = async function ({ commit }, payload) {
    const isAuthenticated = store.state.auth.isAuthenticated
    if(!isAuthenticated){
        await store.dispatch('auth/loginAnonymously')
    }
    const game = await gameService.insertGame(payload);
    await gameService.insertGamePlayer(game.id, {
        userId: store.state.auth.uid
    })

    return game.id
}

export const getGameDetails = async function(context, gameId) {
    const game = await gameService.getGame(gameId).get()
    const players = await gameService.getGamePlayers(gameId)
    let gameDetails = game.data()
    return { ...gameDetails, players: players }
}