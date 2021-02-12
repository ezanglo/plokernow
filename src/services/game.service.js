import * as db from './firebase/db.js'

const collectionName = 'games'

export const getGame = (id) => {
    return db.getDocument(collectionName, id);
}

export const insertGame = function(data) {
  return db.addDocument(collectionName, data)
}

export const addGamePlayersListener = function(gameId, callback)
{
  db.firestore().collection('games/' + gameId + '/players')
    .onSnapshot((querySnapshot) => {
      var players = [];
      querySnapshot.forEach((doc) => {
        players.push(doc.data());
      });

      if (callback) {
        callback(players)
      }
    })
}

export const addGameListener = function(gameId, callback)
{
  db.getDocument(collectionName, gameId)
    .onSnapshot((doc) => {
      callback(doc.data())
    });
}

export const resetGame = (gameId) => {
  updateGame({
    id: gameId,
    showVotes: false
  })

  db.updateCollection('games/' + gameId + '/players', {
    playerVote: ''
  })
}

export const updateGame = (data) => {
    return db.updateDocument(collectionName, data)
}

export const deleteGame = (id) => {
    return db.deleteDocument(collectionName, id)
}

export const getGamePlayers = (gameId) => {
    return db.getCollection({
        collectionName: 'games/' + gameId + '/players'
    });
}

export const getGamePlayer = (gameId, id) => {
    return db.getDocument('games/' + gameId + '/players', id);
}

export const insertGamePlayer = function(gameId, data) {
  return getGamePlayer(gameId, data.userId).set(data)
}

export const updateGamePlayer = (gameId, data) => {
    return db.updateDocument('games/' + gameId + '/players', data)
}

export const deleteGamePlayers = (gameId, id) => {
    return db.deleteDocument('games/' + gameId + '/players', id)
}
