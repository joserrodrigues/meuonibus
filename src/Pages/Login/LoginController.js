/**
 * Controller da page Login
 */
import React from 'react';

//Importa a LoginView
import LoginView from './LoginView'

//Importa as actions
import {
    getUserInfo,
} from '../../store/modules/auth/actions';

//importa a função useDispatch do React Redux
import { useDispatch } from 'react-redux';

const LoginController = (props) => {
    console.log(props);

    //Inicia o dispatch
    const dispatch = useDispatch();

    //Resposta do Google login
    const responseGoogle = (response) => {
        if ('error' in response){
            console.log("Error in Login ");
            console.log(response);
        } else {
            dispatch(getUserInfo(response));
        }        
    }

    return (
        <LoginView
            responseGoogle={responseGoogle} 
        />
    )
}

export default LoginController;
