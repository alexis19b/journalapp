import { types } from '../components/types/types';
import { firebase, googleAuthProvider } from '../firebase/firebase-config';
import { FinishLoading, StartLoading } from './ui';
import Swal from 'sweetalert2';
import { noteLogout } from './notes';

//Peticion Asincrona
export const startLoginEmailPassword = (email, password) => {
    return (dispatch) => {

       dispatch( StartLoading());

        firebase.auth().signInWithEmailAndPassword(email, password)
        .then(({user}) =>{

            dispatch(
                login(user.uid, user.displayName)
            )
            dispatch(FinishLoading());
        })
        .catch(e => {
            
            dispatch(FinishLoading());
            //uso la libreria swal para mostar el mensaje de error
            Swal.fire('Error', e.message, 'error');
        });     
    }
}
//accion
// tarea asincrona hay q retornar un callback
export const starRegisterWithEmailPassName= (email, password, name) => {
    return ( dispatch ) => {
        // funcion de firebase
        firebase.auth().createUserWithEmailAndPassword(email, password)
        .then(async({ user }) => {
            //funcion que devuleve una promesa por eso usamos el async await para no anidar otro then
            // con el updateProfile obtenemos el displayname
            await user.updateProfile({displayName: name });

            dispatch(
                login(user.uid, user.displayName)
            )
            
        })
        .catch(e => {
            Swal.fire('Error', e.message, 'error');
        })
    }
}


//peticion asincrona para autenticacion con google
export const startGoogleLogin = () => {
    return (dispatch) => {
        firebase.auth().signInWithPopup( googleAuthProvider )
            .then( ({ user }) => {
                dispatch(
                login(user.uid, user.displayName)
                )
            });
    }
}

//Accion
export const login = (uid, displayName) => {
    return {
        type: types.login,
        payload: {
            uid,
            displayName
        }
    }
}

export const startLogout = () => {
    return async(dispatch) => {
        await firebase.auth().signOut();

        dispatch( logout() );
        dispatch(noteLogout())
    }
}

export const logout = () => ({
    type: types.loggout
})