/**
 * View da page Login
 */
import React from 'react';
import './Login.css';

//Importa os componentes do Bootstrap
import { Container, Row, Col } from 'react-bootstrap';

//Importa os componentes
import Header from '../../Components/Header/Header';
import Footer from '../../Components/Footer/Footer';

//Importa o componente GoogleLogin
import { GoogleLogin } from 'react-google-login';

function LoginView(props) {

    return (
        <Container fluid={true}>
            <Row>
                <Header />
            </Row>
            <Row>
                <Col className='divLogin' lg="12" xl="12" md="12" sm="12" xs="12">
                    <Row>
                        <Col className='titleLogin' lg="12" xl="12" md="12" sm="12" xs="12">
                            Faça o Login para poder acessar ao sistema
                        </Col>
                    </Row>
                    <Row>
                        <Col className='buttonLogin' lg="12" xl="12" md="12" sm="12" xs="12">
                            <GoogleLogin
                                clientId={process.env.REACT_APP_GOOGLE_OAUTH_KEY}
                                buttonText="Login"
                                onSuccess={props.responseGoogle}
                                onFailure={props.responseGoogle}
                                cookiePolicy={'single_host_origin'}
                                isSignedIn={true}
                            />
                        </Col>
                    </Row>                    

                </Col>
            </Row>
            <Row >
                <Footer />
            </Row>
        </Container>
    );
}

export default LoginView;