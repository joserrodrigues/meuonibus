/**
 * Controller do componente BusLine
 */
import React, {useState} from 'react';
import BusLineView from './BusLineView'

//Importa as actions
import {
    searchBusLines,
    getBusLineStops,
} from '../../store/modules/busInfo/actions';

//importa as funções useDispatch e useSelector do React Redux
import { useDispatch, useSelector } from 'react-redux';

const BusLineController = () => {

    //Busca as variaveis do Reducer
    const busLines = useSelector((state) => state.busInfo.busLines);
    const isConnectingSearchBusLines = useSelector((state) => state.busInfo.isConnectingSearchBusLines);
    const searchBusLinesWithSuccess = useSelector((state) => state.busInfo.searchBusLinesWithSuccess);

    //Inicia o dispatch
    const dispatch = useDispatch();

    //Inicia o SearchText state
    const [searchText, setSearchText] = useState('');

    //função que é chamada quando o texto do search é chamado
    const onTextChange = (e) => {
        console.log(e.target.value);
        setSearchText(e.target.value);
    }
    //função que será chamada ao clicar no botão
    const findBusLines = () => {
        //Despacha o Redux Action presente no getNewInfo para chamar a Saga
        dispatch(searchBusLines(searchText));
    }

    //função que será chamada ao escolher uma linha
    const chooseBusLine = (busLine) => {
        dispatch(getBusLineStops(busLine));
    }

    return (
        <BusLineView 
            onTextChange={onTextChange}
            findBusLines={findBusLines}
            busLines={busLines}
            isConnectingSearchBusLines={isConnectingSearchBusLines}
            searchBusLinesWithSuccess={searchBusLinesWithSuccess}
            chooseBusLine={chooseBusLine}
        />
    )
}
export default BusLineController;