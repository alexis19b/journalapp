import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from '../../hooks/useForm';
import validator from 'validator';
import { useDispatch, useSelector } from 'react-redux';
import { removeError, setError } from '../../actions/ui';
import { starRegisterWithEmailPassName } from '../../actions/auth';

export const RegisterScreen = () => {

    const dispatch = useDispatch();
//hook de redux que permite capturar el error que sale cuando no se realiza de manera correcta el registro de usuario
    const {msgError} = useSelector(state => state.ui);
   

    const [formValues, handleInputChange] = useForm({
        name: 'Carlos',
        email: 'nando@gmail.com',
        password: '123456',
        password2: '123456'
    });

    const { name, email, password, password2 } = formValues;

        const handleRegister = (e) => {
            e.preventDefault();
            if( isFormValid() ) {
                dispatch( starRegisterWithEmailPassName(email, password, name) );
            }
        }
    const isFormValid = () => {
        if(name.trim().length === 0) {
            dispatch( setError('Name is required'))
            return false;

        } else if(!validator.isEmail(email)) {
            dispatch( setError('Email is not valid'))
            return false;

        } else if (password !== password2 || password.length <5){
            dispatch( setError('la contraseña debe tener al menos 6 caracteres') )
            return false;
        }
        
        dispatch( removeError() );
        return true;
    }


    return (
        <>
            <h3 className="auth__title mb-5">Register</h3>
            <form 
                onSubmit ={handleRegister}
                className="animate__animated animate__fadeIn animate__faster"
            >

                  {   // condicion para mostrar si hay error momento de registrarse  
                        msgError &&
                        (
                            <div className="auth__alert-error">
                            {msgError}
                            </div>
                        )
                  }

            <input
                    type="text"
                    placeholder="Name"
                    name="name"
                    className="auth__input"
                    autoComplete="off"
                    value = { name }
                    onChange= {handleInputChange}
                    
                />
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value={email}
                    onChange= {handleInputChange}
                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value={password}
                    onChange= {handleInputChange}
                />
                    <input
                    type="password"
                    placeholder="Confirm Password"
                    name="password2"
                    className="auth__input"
                    value={password2}
                    onChange= {handleInputChange}
                />


                <button
                    type="submit"
                    className="btn btn-primary btn-block mb-5"
                    
                    
                >
                    Registrar
                </button>
                <Link 
                    className="link"
                    to="/auth/login"
                >
                    Ya estas Registrado?
                </Link>               
            </form>

        </>
    )
}
