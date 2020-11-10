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

//Importa as actions
import {
    changeUserInfo,
} from '../../store/modules/auth/actions';

//importa a função useDispatch e useSelector do React Redux
import { useDispatch, useSelector } from 'react-redux';

const BusStopViewItem = (props) => {

    //Ao clicar no Icone altera a informação do favorito
    async function updateMyBusStop(busStop) {
        console.log(busStop);
        //Chama a saga para alterar a informação do favorito
        dispatch(changeUserInfo(userBusLine, busStop))
    }

    //Inicia o dispatch
    const dispatch = useDispatch();

    //Busca a informação da coordenada do usuário
    const userCoordinate = useSelector((state) => state.busInfo.userCoordinate);

    //Busca as variaveis do Reducer
    const userBusLine = useSelector((state) => state.auth.userBusLine);
    const userBusStop = useSelector((state) => state.auth.userBusStop);    

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

    //Verifica se a linha é favorita e coloca a class BusLineFavoriteSelect
    let classIcon = "BusStopFavorite";
    console.log(props.busLine);
    if (userBusStop !== null && props.busStop.cp === userBusStop.cp) {
        classIcon = "BusStopFavorite BusStopFavoriteSelect";
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
                <Col className={classIcon}>
                    <FontAwesomeIcon icon={faHeart} onClick={() => updateMyBusStop(props.busStop)} />
                </Col>
                <Col className="BusStopDistance" >
                    {distance} metros
                </Col>
            </Row>

        </div>
    )
}
export default BusStopViewItem;