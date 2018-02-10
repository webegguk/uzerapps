import firebase from 'firebase'
var config = {
  apiKey: "AIzaSyBbieSc3b1Fv1SPnSLVcNWNb_K7qsGsBQY",
  authDomain: "test-4defa.firebaseapp.com",
  databaseURL: "https://test-4defa.firebaseio.com",
  projectId: "test-4defa",
  storageBucket: "test-4defa.appspot.com",
  messagingSenderId: "766771975203"
};
var fire = firebase.initializeApp(config);
export default fire;