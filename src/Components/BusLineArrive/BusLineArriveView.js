/**
 * View do componente BusLineArrive
 */
import React from 'react';
//Importa os componentes do Bootstrap
import { Container, Row, Col, Spinner } from 'react-bootstrap';

//Import o Link do react-router
import { Link } from 'react-router-dom';

//Importa o componente BusLineViewItem
import BusLineArriveItem from '../BusLineArriveItem/BusLineArriveItem'

//Importa o CSS
import './BusLineArrive.css'

//Importa os Componentes do FontAwesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const BusLineArriveView = (props) => {
    let errorMessage = null;
    let connectingMessage = null;
    let busLinesItem = [];
    let stopInfo = null;
    let linkInfo = null;

    console.log(props.arriveBusLines);
    //Verifica se está conectando
    if (props.isConnectingGetArriveBusStops) {
        connectingMessage =
            <div className="MessageError">
                <Spinner animation="border" variant="danger" />
            </div>
    }
    //Exibe mensagem se não tiver linha favorita
    else if (props.userBusStop === undefined || props.userBusStop === null || 
        !('cp' in props.userBusStop)) {
        errorMessage = (
            <div className="MessageError">
                <br></br>
                Você ainda não escolheu uma Parada favorita! <br></br>Vá a página <Link to="/search">Search</Link>,
                busque por uma linha, veja as paradas da linha e clique no <FontAwesomeIcon className='LinkChangeBusPosition' icon={faHeart} />

            </div>
        )
    }
    //Exibe mensagem se houve uma conexão com erro
    else if (props.getArriveBusStopsWithSuccess === 2) {
        errorMessage =
            <div className="MessageError">
                Houve um erro ao buscar a informação. Tente novamente mais tarde!
        </div>
        //Exibe mensagem não tem nenhuma linha encontrado
    } else if (props.arriveBusLines.length === 0) {
        errorMessage =
            <div className="MessageError">
                Nenhuma linha relacionada a essa parada.
        </div>
    } else {        
        //Montando a informação da linha
        stopInfo = (
            <Row>
                <Col className="TitleSearchLines">
                    Parada: {props.arriveBusLines.p.np}
                    </Col>
            </Row>
        );
        linkInfo = (
            <Row>
                <Col>
                    {/* Coloca o link para ir a tela de search */}
                    <Link className="LinkChange" to="/search">Trocar</Link>
                </Col>
            </Row>
        );
        props.arriveBusLines.p.l.forEach(busLine => {

            //Colocando um componente para cada busLine. O props key no Row é super importante. 
            //            É necessário uma informação único com componente que se repete               
            busLinesItem.push(
                <Row key={busLine.cl}>
                    <Col>
                        <BusLineArriveItem busLine={busLine}
                            chooseBusLine={props.chooseBusLine}
                        />
                    </Col>

                </Row>
            )
        });
    }
    
    // Criando o View 
    return (
        <Container fluid={true} className="ContainerBusLine ContainerBorder">
            {stopInfo}
            {linkInfo}
            <Row className="BuslineArriveRow">
                <Col>
                    {/* Colocando as informações que consistimos anteriormente */}
                    {connectingMessage}
                    {errorMessage}
                    {busLinesItem}
                </Col>
            </Row>

        </Container>
    )
}
export default BusLineArriveView;