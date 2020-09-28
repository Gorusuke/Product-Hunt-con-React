import app from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage'

import firebaseConfig from './config';

class Firebase{
    
    constructor(){
        if(!app.apps.length){
            app.initializeApp(firebaseConfig);
            // auth = app.auth();
            this.db = app.firestore();
            // this.storage = app.storage();
        }
    }

    // Registra un usuario
    async registrar(nombre, email, password){
        const nuevoUsuario = await app.auth().createUserWithEmailAndPassword(email, password);
        let user = app.auth().currentUser;
        user.updateProfile({
            displayName: nombre
        }).then((result) => {
            console.info(result)
        }).catch((err) => {
            console.info(err)
        });
        // return await nuevoUsuario.user.updateProfile({
        //     displayName : nombre
        // })
    }

    // Inicia Sesion el usuario
    async login(email, password){
        await app.auth().signInWithEmailAndPassword(email, password);
    }

    // Cerrar la sesion
    async cerrarSesion(){
        await app.auth().signOut();
    }

}

const firebase = new Firebase();
export default firebase;