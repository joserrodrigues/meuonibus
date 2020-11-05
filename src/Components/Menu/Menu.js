/**
 * Componente Menu
 */
import React from 'react';
//Importa os Componentes do BootStrap 
import { Container, Row, Col } from 'react-bootstrap';
//Importa o CSS
import './Menu.css';

const Menu = () => {

    return (
        <Container fluid={true} className="MenuDiv">
            <Row>
                <Col>
                    <span className="Menu MenuSelect">
                        Início
                   </span>
                    <span className="Menu">
                        Linhas
                    </span>
                    <span className="Menu">
                        LogOut
                    </span>
                </Col>        
            </Row>

        </Container>
    )
}
export default Menu;