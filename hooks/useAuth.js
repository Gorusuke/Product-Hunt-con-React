import React, {useEffect, useState} from 'react';
// import firebase from '../firebase';
import firebase from 'firebase/app'


function useAuth() {
    const [usuarioAuth, setUsuarioAuth] = useState(null);
    useEffect(() => {
        const unsuscribe = firebase.auth().onAuthStateChanged(user => {
            if(user){
                setUsuarioAuth(user);
            } else {
                setUsuarioAuth(null);
            }
        });
        return () => unsuscribe();    
    }, []);
    return usuarioAuth;
}

export default useAuth;