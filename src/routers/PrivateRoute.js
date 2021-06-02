import React from 'react';
import PropTypes from 'prop-types';
import { Redirect, Route } from 'react-router';

export const PrivateRoute = ({
    isAuthenticated,
    component: Component,
    ...rest
}) => {

  

    return (
        <Route { ...rest }
            component={ (props) => (
                (isAuthenticated)
                    ? (<Component {...props} />) // condicion que dice que si esta autenticado entre
                    : (<Redirect to="/auth/login" /> ) //sino lo devuelva a la pag del login
        )}
        />
    )
}

PrivateRoute.propTypes = {
    isAuthenticated: PropTypes.bool.isRequired,
    component: PropTypes.func.isRequired
}
