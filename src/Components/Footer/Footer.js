/**
 * Controller do componente Footer
 */
import React from 'react';

//Importa o CSS
import './Footer.css';

//Importa os Componentes do BootStrap 
import { Container, Row, Col } from 'react-bootstrap';
//Importa os Componentes do FontAwesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const Footer = () => {

    return (
        <Container fluid={true} className="ContainerFooter">
            <Row>
                <Col className="TextFooter">
                    <FontAwesomeIcon icon={faHeart} />&nbsp;&nbsp; @2020 All Rights Reserved
                </Col>
            </Row>
        </Container>
    )
}
export default Footer;