/**
 * Controller do componente BusLineArrive
 */
import React from 'react';
import BusLineArriveView from './BusLineArriveView'

//importa as funções useDispatch e useSelector do React Redux
import { useSelector } from 'react-redux';

const BusLineController = () => {

    //Busca as variaveis do Reducer
    const arriveBusLines = useSelector((state) => state.busInfo.arriveBusLines);
    const isConnectingGetArriveBusStops = useSelector((state) => state.busInfo.isConnectingGetArriveBusStops);
    const getArriveBusStopsWithSuccess = useSelector((state) => state.busInfo.getArriveBusStopsWithSuccess);
    const userBusStop = useSelector((state) => state.auth.userBusStop);

    return (
        <BusLineArriveView
            arriveBusLines={arriveBusLines}
            userBusStop={userBusStop}
            isConnectingGetArriveBusStops={isConnectingGetArriveBusStops}
            getArriveBusStopsWithSuccess={getArriveBusStopsWithSuccess}
        />
    )
}
export default BusLineController;