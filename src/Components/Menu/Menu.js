/**
 * Componente Menu
 */
import React from 'react';
//Importa os Componentes do BootStrap 
import { Container, Row, Col } from 'react-bootstrap';
//Importa o CSS
import './Menu.css';

//Importa as actions
import {
    logOff,
} from '../../store/modules/auth/actions';

//importa a função useDispatch do react-router
import { Link, useLocation } from 'react-router-dom'

//importa a função useDispatch do React Redux
import { useDispatch } from 'react-redux';

//importa a função de logout do react-google-login
import { useGoogleLogout } from 'react-google-login'

const Menu = () => {
    const location = useLocation();
    let classNameHome = "Menu MenuSelect";
    let classNameSearch = "Menu";
    if (location.pathname === "/search"){
        classNameHome = "Menu";
        classNameSearch = "Menu MenuSelect";
    }

    //Retorna se o logout do Google foi realizado com sucesso
    const onLogoutSuccess = () => {
        console.log("logOff");
        dispatch(logOff());
    }

    //Inicializa o Hook de Google Logout
    const { signOut } = useGoogleLogout({
        clientId: process.env.REACT_APP_GOOGLE_OAUTH_KEY,
        onLogoutSuccess: onLogoutSuccess,
    });

    //Inicia o dispatch
    const dispatch = useDispatch();    

    return (
        <Container fluid={true} className="MenuDiv">
            <Row>
                <Col>
                    <Link className={classNameHome} to="/">
                        Início
                   </Link>
                    <Link className={classNameSearch} to="/search">
                        Linhas
                    </Link>
                    {/* Ao clicar, chama o método signOut do Hook useGoogleLogout */}
                    <span className={classNameSearch} onClick={() => signOut()}>Logout</span>
                </Col>        
            </Row>
        </Container>
    )
}
export default Menu;