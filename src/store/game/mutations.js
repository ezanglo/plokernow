export const setCurrentGame = (state, currentGame) => {
    state.currentGame = currentGame
}

export const addPlayerToCurrentGame = (state, player) => {
    state.currentGame.players.push([player])
}
