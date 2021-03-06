import React from 'react';
import './Home.css';

//Importa os componentes do Bootstrap
import { Container, Row, Col } from 'react-bootstrap';

//Importa os componentes
import BusLineArriveController from '../../Components/BusLineArrive/BusLineArriveController';
import BusPositionController from '../../Components/BusPosition/BusPositionController';
import Header from '../../Components/Header/Header';
import Menu from '../../Components/Menu/Menu';
import Footer from '../../Components/Footer/Footer';

function HomeView(props ) {
    return (
        <Container fluid={true}>
            <Row>
                <Header />
            </Row>
            <Row>
                <Col>
                    <Menu />
                </Col>
            </Row>
            <Row>
                <Col lg="4" xl="4" md="12" sm="12" xs="12">
                    <BusLineArriveController />
                </Col>
                <Col lg="8" xl="8" md="12" sm="12" xs="12">
                    <BusPositionController />
                </Col>
            </Row>
            <Row >
                <Footer />
            </Row>
        </Container>      
    );
}

export default HomeView;