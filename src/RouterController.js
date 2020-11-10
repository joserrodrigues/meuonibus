import React from "react";

//Importa os componentes do react-router
import { Route, Switch } from "react-router-dom";

//Importa o HomeController
import HomeController from './Pages/Home/HomeController';

//Importa o SearchBusline
import SearchBuslineController from './Pages/SearchBusline/SearchBuslineController';

//Importa o LoginController
import LoginController from './Pages/Login/LoginController';

//importa a função useSelector do React Redux
import { useSelector } from 'react-redux';

//Cria função principal Router Controller
export default function RouterController() {

    //Busca o nome do usuário no módulo auth
    const userGoogleID = useSelector((state) => state.auth.userGoogleID);    
    console.log("userGoogleID = " + userGoogleID);
    console.log( userGoogleID);
    if (userGoogleID !== null && userGoogleID !== ""){
        return (
            <Switch>
                { /* Controladores das Rotas, com o caminho da Rota e qual função/objeto está relacionado */}
                <Route path="/search" > <SearchBuslineController /></Route>
                <Route path="/"><HomeController /></Route>
            </Switch>
        );
    } else {
        return (
            <Switch>
                { /* Controladores das Rotas, com o caminho da Rota e qual função/objeto está relacionado */}
                <Route path="/"><LoginController /></Route>
            </Switch>
        );
    }
    
}