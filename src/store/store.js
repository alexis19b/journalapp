import { createStore,combineReducers, applyMiddleware, compose } from 'redux';
import { authReducer } from '../components/reducers/authReducer';
import thunk from 'redux-thunk';
import { uiReducer } from '../components/reducers/uiReducer';
import { notesReducer } from '../components/notes/notesReducer';


const composeEnhancers = (typeof window !== 'undefined' && window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__) || compose;


//Me permite enviar varios reducer
const reducers = combineReducers({
    auth: authReducer,
    ui: uiReducer,
    notes: notesReducer
})

export const store = createStore(
    reducers,
    //configuracion para hacer peticiones asincronas
    composeEnhancers(
        applyMiddleware( thunk )
    )
    
 );