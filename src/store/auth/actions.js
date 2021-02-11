import firebaseService from '../../services/firebase'

export const loginAnonymously = async () => {
  const fbAuthResponse = await firebaseService.auth().signInAnonymously()
  const id = fbAuthResponse.user.uid
  firebaseService.getDocument('users', id).set({id})
}
