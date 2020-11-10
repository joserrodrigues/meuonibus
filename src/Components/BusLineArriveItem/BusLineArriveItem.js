/**
 * View do componente BusLineArriveItem
 */
import React from 'react';
//Importa os componentes do Bootstrap
import { Row, Col } from 'react-bootstrap';

//Importa o CSS
import './BusLineArriveItem.css'

const BusLineArriveItem = (props) => {

    //Verifica a direção da linha para montar o nome correto
    let laneName = props.busLine.lt0;
    if (props.busLine.sl === 1) {
        laneName = props.busLine.lt1;
    }
    //Monta o View
    return (
        <div>
            <Row>
                <Col className="TextBuslineArriveItem">
                    {props.busLine.c} - {laneName}
                </Col>
            </Row>
            <Row>
                <Col className="BusLineFavorite BusLineFavoriteSelect">
                    <span className="ArriveText">Chegada: </span>
                    <span className="ArriveTime">{props.busLine.vs[0].t}</span>
                </Col>
            </Row>

        </div>
    )
}
export default BusLineArriveItem;