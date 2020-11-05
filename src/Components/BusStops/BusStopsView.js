/**
 * View do componente BusLine
 */
import React from 'react';
//Importa os componentes do Bootstrap
import { Container, Row, Col, Spinner } from 'react-bootstrap';

//Importa o componente BusStopsViewItem
import BusStopViewItem from '../BusStopViewItem/BusStopViewItem'

//Importa o CSS
import './BusStops.css'

const BusStopsView = (props) => {
    let errorMessage = null;
    let connectingMessage = null;
    let busStopsItem = [];

    //Verifica se está conectando
    if (props.isConnectingGetBusLineStops) {
        connectingMessage =
            <div className="MessageError">
                <Spinner animation="border" variant="danger" />
            </div>
    }
    //Exibe mensagem se houve uma conexão com erro
    else if (props.GetBusLineStopsWithSuccess === 2) {
        errorMessage =
            <div className="MessageError">
                Houve um erro ao buscar a informação. Tente novamente mais tarde!
        </div>
        //Exibe mensagem não tem nenhuma linha encontrado
    } else if (props.busStops.length === 0) {
        errorMessage =
            <div className="MessageError">
                Nenhuma parada encontrada.
        </div>
    } else {
        //Montando a informação da linha
        props.busStops.forEach(busStop => {
            //Colocando um componente para cada busStop. O props Key é super importante. 
            // É necessário uma informação único com componente que se repete 
            busStopsItem.push(
                <Row key={busStop.cp}>
                    <Col>
                        <BusStopViewItem busStop={busStop}/>
                    </Col>

                </Row>
            )
        });
    }

    //Verificando se o usuário clicou em alguma linha para alterar a linha selecionada
    let messageTitle = "Paradas da Linha";
    let busLineInfo = "";
    if (props.busLineChose === null){
        errorMessage = "";
        messageTitle = <span className="MessageNoStopTitle"> Nenhuma parada selecionada</span>;
    } else {
        //Verifica a direção da linha para montar o nome correto
        busLineInfo = props.busLineChose.tp + " - " + props.busLineChose.ts;
        if (props.busLineChose.sl === 1) {
            busLineInfo = props.busLineChose.ts + " - " + props.busLineChose.tp;
        }        
    }

    // Criando o View 
    return (
        <Container fluid={true} className="ContainerBusStop">
            <Row>
                <Col className="TitleBusStopsLines">
                    {messageTitle}
                </Col>
            </Row>
            <Row>
                <Col className="TextBusLine">
                    {busLineInfo}
                </Col>
            </Row>
            <Row>
                <Col>
                    {/* Colocando as informações que consistimos anteriormente */}
                    {connectingMessage}
                    {errorMessage}
                    {busStopsItem}
                </Col>
            </Row>

        </Container>
    )
}
export default BusStopsView;