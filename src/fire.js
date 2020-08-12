
import VueFire from 'vuefire'
import Vue from 'vue'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/storage'

Vue.use(VueFire)

// Initialize Firebase
const config = {
  // ...
}

firebase.initializeApp(config)

// Configure firestore
const firestore = firebase.firestore()
firestore.settings({
  // Activte reading timestamps as 'Timestamp' objects instead of 'Date'
  // use timestamp.toDate() to convert to Date() object.
  // e.g. snapshot.get('created_at').toDate()
  timestampsInSnapshots: true
})

export default firestore
