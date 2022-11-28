import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';

export const firebaseConfig = {
    apiKey: 'AIzaSyATBlQ5dQJmtOtSI5_jB11zOJLdZzZd2d4',
    authDomain: 'chat-app-authen.firebaseapp.com',
    projectId: 'chat-app-authen',
    storageBucket: 'chat-app-authen.appspot.com',
    messagingSenderId: '956414253014',
    appId: '1:956414253014:web:67f39f3601c277d91a3677',
};

if (!firebase.apps.length) {
    firebase.initializeApp(firebaseConfig);
} else {
    firebase.app();
}
