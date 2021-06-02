import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { BrowserRouter as Router, Switch} from 'react-router-dom';
import { firebase } from '../firebase/firebase-config';

import { JournalScreen } from '../components/journal/JournalScreen';
import { AuthRouter } from './AuthRouter';
import { login } from '../actions/auth';
import { PrivateRoute } from './PrivateRoute';
import { PublicRoute } from './PublicRoute';
import { startLoadingNotes } from '../actions/notes';

//Rutas hijas a las  cuales apunta el AppRouter
export const AppRouter = () => {

    const [checking, setCheking] = useState(true);
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const dispatch = useDispatch();
    //Efecto que me permite mantener mi state cuando recargo el navegador
    useEffect(() => {
        //verifica cuando el estado de la autenticacion cambia se dispara
        // si no estoy autenticado regresa un null
        firebase.auth().onAuthStateChanged((user) => {
        // condicion que dice que si estoy autenticado entre al if
            if(user?.uid) {
                dispatch(login(user.uid, user.displayName));
                setIsLoggedIn(true);

                dispatch( startLoadingNotes(user.uid) );

            } else {
                setIsLoggedIn(false);
            }
            setCheking(false);
        });


    }, [ dispatch, setCheking, setIsLoggedIn ])

    if(checking) {
        return (
            <h1>loading...</h1>
        )
    }

    return (
            <Router>
               <div>

                    <Switch>
                    <PublicRoute
                        path="/auth"
                        component={ AuthRouter }
                        isAuthenticated={isLoggedIn}
                    />
                    
                    <PrivateRoute
                        exact
                        isAuthenticated={isLoggedIn}
                        path="/"
                        component= { JournalScreen }
                      
                    />

                    </Switch>
               </div>
            </Router>
        
    )
}
