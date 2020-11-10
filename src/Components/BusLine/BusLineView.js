/**
 * View do componente BusLine
 */
import React from 'react';
//Importa os componentes do Bootstrap
import { Container, Row, Col, Button, Spinner } from 'react-bootstrap';

//Importa o componente BusLineViewItem
import BusLineViewItem from '../BusLineViewItem/BusLineViewItem'

//Importa o CSS
import './BusLine.css'

const BusLineView = (props) => {
    let errorMessage = null;
    let connectingMessage = null;
    let busLinesItem = [];

    //Verifica se está conectando
    if (props.isConnectingSearchBusLines) {
        connectingMessage =
            <div className="MessageError">
                <Spinner animation="border" variant="danger" />
            </div>
    }
    //Exibe mensagem se houve uma conexão com erro
    else if (props.searchBusLinesWithSuccess === 2){
        errorMessage =
            <div className="MessageError">
                Houve um erro ao buscar a informação. Tente novamente mais tarde!
        </div>
    //Exibe mensagem não tem nenhuma linha encontrado
    } else if (props.busLines.length === 0) {
        errorMessage =
            <div className="MessageError">
                Nenhuma linha encontrada.
        </div>        
    } else {
        //Montando a informação da linha
        props.busLines.forEach(busLine => {

            //Colocando um componente para cada busLine. O props key no Row é super importante. 
            //            É necessário uma informação único com componente que se repete               
            busLinesItem.push(              
                <Row key={busLine.cl}>
                    <Col>
                        <BusLineViewItem busLine={busLine} 
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
            <Row>
                <Col className="TitleSearchLines">
                    Buscar Linhas
                </Col>
            </Row>
            <Row>
                <Col>
                    <input className="TextSearch" type="text" onChange={props.onTextChange}/>
                </Col>
                <Col>
                    <Button variant="outline-secondary" onClick={props.findBusLines}>Buscar</Button>
                </Col>
            </Row>
            <Row>
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
export default BusLineView;