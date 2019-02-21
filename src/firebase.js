import firebase from 'firebase'
const config = {
    apiKey: "AIzaSyDjgN3SuyXTf3oFoQvE_w_Vk_mtWNANO2A",
    authDomain: "react-forum-2c148.firebaseapp.com",
    databaseURL: "https://react-forum-2c148.firebaseio.com",
    projectId: "react-forum-2c148",
    storageBucket: "react-forum-2c148.appspot.com",
    messagingSenderId: "479695595962"
};
firebase.initializeApp(config);
export default firebase;

export const provider = new firebase.auth.GoogleAuthProvider();
export const auth = firebase.auth();