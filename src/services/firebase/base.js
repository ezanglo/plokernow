import firebase from 'firebase/app'
import 'firebase/auth'
import { Loading, QSpinnerGears, QSpinnerRadio } from 'quasar'

export const self = () => {
    return firebase
}

export const auth = () => {
    return firebase.auth()
}

export const fBInit = (config) => {
    return firebase.initializeApp(config)
}

export const handleOnAuthStateChanged = async (store, currentUser) => {
    const initialAuthState = isAuthenticated(store)
    // Save to the store
    store.commit('auth/setAuthState', {
      isAuthenticated: currentUser !== null,
      isReady: true,
      uid: (currentUser ? currentUser.uid : ''),
    })

    if(store.state.auth.isAuthenticated){
        const isOnline = window.navigator.onLine
        Loading.show({
            message: isOnline ? 'Loading...' : 'Looks like you\'ve lost network connectivity. Please connect back to your network to access your data.',
            backgroundColor: isOnline ? 'grey' : 'red-6',
            spinner: isOnline ? QSpinnerGears : QSpinnerRadio,
            customClass: 'loader'
        })

        await store.dispatch('user/getCurrentUser', currentUser.uid)
    }

    Loading.hide()

}

export const isAuthenticated = (store) => {
    return store.state.auth.isAuthenticated
}
