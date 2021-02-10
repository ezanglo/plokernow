import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

/**
 * Firestore
 * https: //firebase.google.com/docs/reference/js/firebase.firestore.Firestore.html
 *
 * @return {Interface} returns Firestore
 */
export const firestore = () => {
  return firebase.firestore()
}

/**
 * @param  {String} storageLocation - Location on Firebase Storage
 */
export const storageRef = (storageLocation) => {
  return firebase.storage().ref(storageLocation)
}

export const addDocument = (collectionName, data) => {
  return firestore().collection(collectionName).add(data)
}

export const getDocument = (collectionName, id) => {
  return firestore().collection(collectionName).doc(id)
}

export const getCollection = (params) => {
  const collectionName = params.collectionName
  const orderBy = params.orderBy
  const where = params.where
  let collectionRef = firestore().collection(collectionName);
  if(where){
    collectionRef = collectionRef.where(where.field, where.condition, where.value);
  }
  if(orderBy){
    collectionRef = collectionRef.orderBy(orderBy.field, orderBy.direction)
  }
  return collectionRef.get()
    .then(function(collection) {
      return collection.docs.map(doc => {
        return {
          ...doc.data(),
          id: doc.id
        }
      })
    })
}

export const getSubCollection = (doc, subCollectionName) => {
  return doc.ref.collection(subCollectionName).get()
    .then(function(sub_collection){
      return sub_collection.docs.map(doc => {
        return doc.data()
      });
    });
}

export const updateDocument = (collectionName, data) => {
  return getDocument(collectionName, data.id).update(data)
}

export const deleteDocument = (collectionName, id) => {
  return getDocument(collectionName, id).delete()
}

export const clearCollection = (collectionName) => {
  const batch = firestore().batch()
  return firestore().collection(collectionName).get()
  .then(collection => {
    collection.docs.map(doc => {
      batch.delete(doc.ref)
    })
    batch.commit()
  })
}