/**
 * View do componente BusLine
 */
import React from 'react';
//Importa os componentes do Bootstrap
import { Row, Col } from 'react-bootstrap';

//Importa o CSS
import './BusLineViewItem.css'

//Importa os Componentes do FontAwesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const BusLineViewItem = (props) => {

    //Verifica a direção da linha para montar o nome correto
    let laneName = props.busLine.tp + " - " +  props.busLine.ts;
    if (props.busLine.sl === 1){
        laneName = props.busLine.ts + " - " + props.busLine.tp;
    }
    //Monta o View
    return (
        <div>
            <Row>
                <Col className="TitleBuslineItem">
                    Linha: {props.busLine.lt}
                </Col>
            </Row>
            <Row>
                <Col className="TextBuslineItem">
                    {laneName}
                </Col>
            </Row>
            <Row>
                <Col className="BusLineFavorite BusLineFavoriteSelect">
                    <FontAwesomeIcon icon={faHeart} />
                </Col>
                <Col className="BusLineButtonChoose" onClick={() => props.chooseBusLine(props.busLine)}>
                    Ver Paradas
                </Col>
            </Row>

        </div>
    )
}
export default BusLineViewItem;