import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { startGoogleLogin, startLoginEmailPassword } from '../../actions/auth';
import { useForm } from '../../hooks/useForm';

export const LoginScreen = () => {
    //hook que le da acceso al dispatch en cualquier parte de la aplicacion
    const dispatch = useDispatch();

    const {loading} = useSelector(state => state.ui);

    

    const [formValues, handleInputChange] = useForm({
        email: 'nando@gmail.com',
        password: '123456'
    });
    //desestructuro el useForm
    const { email, password } = formValues;

    const handleLogin = (e)=> {
        e.preventDefault();
        dispatch( startLoginEmailPassword(email, password));
    }
    //funcion que al hacer click en el boton ejectua la accion de autenticacion
    const handleGoogleLogin = () => {
        dispatch( startGoogleLogin() );
    }


    return (
        <>
            <h3 className="auth__title mb-5">Login</h3>
            <form 
                onSubmit= {handleLogin}
                className="animate__animated animate__fadeIn animate__faster"
            >
                <input
                    type="text"
                    placeholder="Email"
                    name="email"
                    className="auth__input"
                    autoComplete="off"
                    value= {email}
                    onChange= {handleInputChange}

                />
                <input
                    type="password"
                    placeholder="Password"
                    name="password"
                    className="auth__input"
                    value= {password}
                    onChange= {handleInputChange}

                />

                <button
                    type="submit"
                    className="btn btn-primary btn-block"
                    disabled = {loading}
                    

                    
                >
                    Login
                </button>
                
                <div className="auth__social-networks">
                    <p>Login with Social Networks </p>
                    <div 
                        className="google-btn"
                        onClick= {handleGoogleLogin}
                    >
                        <div className="google-icon-wrapper">
                            <img className="google-icon" src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg" alt="google button" />
                        </div>
                        <p className="btn-text">
                            <b>Ingresar con Google</b>
                        </p>
                    </div>
                </div>
                <Link 
                    className="link"
                    to="/auth/register"
                >
                   Crear una cuenta
                </Link>               
            </form>

        </>
    )
}
