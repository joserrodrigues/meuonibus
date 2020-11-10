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

//Importa as actions
import {
    changeUserInfo,
} from '../../store/modules/auth/actions';

//importa a função useDispatch e useSelector do React Redux
import { useDispatch, useSelector } from 'react-redux';


const BusLineViewItem = (props) => {

    //Ao clicar no Icone altera a informação do favorito
    async function updateMyBusLine(busLine) {
        console.log(busLine);
        //Chama a saga para alterar a informação do favorito
        dispatch(changeUserInfo(busLine, userBusStop))
    }

    //Inicia o dispatch
    const dispatch = useDispatch();

    //Busca as variaveis do Reducer
    const userBusLine = useSelector((state) => state.auth.userBusLine);
    const userBusStop = useSelector((state) => state.auth.userBusStop);    

    //Verifica a direção da linha para montar o nome correto
    let laneName = props.busLine.tp + " - " +  props.busLine.ts;
    if (props.busLine.sl === 1){
        laneName = props.busLine.ts + " - " + props.busLine.tp;
    }

    //Verifica se a linha é favorita e coloca a class BusLineFavoriteSelect
    let classIcon = "BusLineFavorite";
    console.log(props.busLine);
    if (userBusLine !== null && props.busLine.cl === userBusLine.cl){
        classIcon = "BusLineFavorite BusLineFavoriteSelect";
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
                <Col className={classIcon}>
                    <FontAwesomeIcon icon={faHeart} onClick={() => updateMyBusLine(props.busLine)} />
                </Col>
                <Col className="BusLineButtonChoose" onClick={() => props.chooseBusLine(props.busLine)}>
                    Ver Paradas
                </Col>
            </Row>

        </div>
    )
}
export default BusLineViewItem;