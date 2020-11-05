import React from 'react';
import './Home.css';

//Importa os componentes do Bootstrap
import { Container, Row, Col } from 'react-bootstrap';

//Importa os componentes
import BusLineController from '../../Components/BusLine/BusLineController';
import BusStopsController from '../../Components/BusStops/BusStopsController';
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
                <Col lg="6" xl="6" md="12" sm="12" xs="12">
                    <BusLineController />
                </Col>
                <Col lg="6" xl="6" md="12" sm="12" xs="12">
                    <BusStopsController />
                </Col>
            </Row>
            <Row >
                <Footer />
            </Row>
        </Container>      
    );
}

export default HomeView;