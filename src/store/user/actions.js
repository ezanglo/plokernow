import { firestoreAction } from 'vuexfire'
import * as userService from '../../services/user.service.js'
import { store } from '../index.js'

export const getCurrentUser = firestoreAction(({ bindFirestoreRef }, id) => {
    return bindFirestoreRef('currentUser', userService.getUser(id))
})