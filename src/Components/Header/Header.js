/**
 * Controller do componente Header
 */
import React from 'react';

//Importa o CSS
import './Header.css';

//Importa os Componentes do BootStrap 
import { Container, Row, Col } from 'react-bootstrap';
//Importa os Componentes do FontAwesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faBus } from '@fortawesome/free-solid-svg-icons'
//Importa a imagem que colocamos na pasta Assets que fica dentro da pasta src 
import busImage from '../../Assets/busImage.jpg';

//importa a função useSelector do React Redux
import { useSelector } from 'react-redux';

const Header = () => {

    //Busca o nome do usuário no módulo auth
    const userName = useSelector((state) => state.auth.userName);

    let welcome = ''
    if(userName !== ''){
        welcome = "Bem Vindo, " + userName;
    }
    return (
        <Container fluid={true} className="ContainerHeader">
            <Row>
                <Col className="TopHeader">
                    <FontAwesomeIcon icon={faBus} /> Ônibus SP
                </Col>
                <Col className="TopHeaderRight">
                    {welcome}
                </Col>                
            </Row>
            <Row>
                <Col className="TopImg">
                    <img src={busImage} width="100%" height="auto" />
                </Col>
            </Row>
        </Container>            
    )
}
export default Header;