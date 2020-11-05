/**
 * componente BusStopViewItem
 */
import React from 'react';
//Importa os componentes do Bootstrap
import { Row, Col } from 'react-bootstrap';

//Importa o CSS
import './BusStopViewItem.css'

//Importa os Componentes do FontAwesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

//importa as funções useSelector do React Redux
import {  useSelector } from 'react-redux';

const BusStopViewItem = (props) => {

    //Busca a informação da coordenada do usuário
    const userCoordinate = useSelector((state) => state.busInfo.userCoordinate);


    //Calcula a distancia entre dois pontos
    const calculateDistance = (lat1, lon1, lat2, lon2) => {
        var R = 6371; // km
        var dLat = (lat2 - lat1) * Math.PI / 180;
        var dLon = (lon2 - lon1) * Math.PI / 180;
        var lat1 = (lat1) * Math.PI / 180;
        var lat2 = (lat2) * Math.PI / 180;

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return (d*1000).toFixed(0);
    }    

    //Verifica se temos a posição do usuário
    let distance = 0;
    if (userCoordinate.latitude !== 0 && userCoordinate.longitude !== 0){
        //Calcula a distancia em metros
        distance = calculateDistance(userCoordinate.latitude, userCoordinate.longitude,
            props.busStop.py, props.busStop.px );
    }

    //Monta o View
    return (
        <div>
            <Row>
                <Col className="TitleBusStopItem">
                    {props.busStop.np}
                </Col>
            </Row>
            <Row>
                <Col className="TextBusStopItem">
                    {props.busStop.ed}
                </Col>
            </Row>
            <Row>
                <Col className="BusStopFavorite BusStopFavoriteSelect">
                    <FontAwesomeIcon icon={faHeart} />
                </Col>
                <Col className="BusStopDistance" >
                    {distance} metros
                </Col>
            </Row>

        </div>
    )
}
export default BusStopViewItem;