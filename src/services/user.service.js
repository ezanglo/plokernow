import * as db from './firebase/db.js'

const collectionName = 'users'

export const getUser = (id) => {
    return db.getDocument(collectionName, id);
}