import { firestoreAction } from 'vuexfire'

export const loginAnonymously = () => {
    const $fb = this.$fb
    const fbAuthResponse = $fb.auth().signInAnonymously()
    const id = fbAuthResponse.user.uid
    $fb.getCollection('users').set({ id })
}