import { firestoreAction } from 'vuexfire'
import firebaseService from '../../services/firebase'

export const loginAnonymously = async () => {
    const fbAuthResponse = await firebaseService.auth().signInAnonymously()
    console.log(fbAuthResponse);
    const id = fbAuthResponse.user.uid
    $fb.getCollection('users').set({ id })
}