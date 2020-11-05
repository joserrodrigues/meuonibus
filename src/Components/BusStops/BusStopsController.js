/**
 * Controller do componente BusStop
 */
import React from 'react';
import BusStopsView from './BusStopsView'


//importa as funções useDispatch e useSelector do React Redux
import {  useSelector } from 'react-redux';

const BusStopsController = () => {

    //Busca as variaveis do Reducer
    const busLineChose = useSelector((state) => state.busInfo.busLineChose);
    const busStops = useSelector((state) => state.busInfo.busStops);
    const isConnectingGetBusLineStops = useSelector((state) => state.busInfo.isConnectingGetBusLineStops);
    const GetBusLineStopsWithSuccess = useSelector((state) => state.busInfo.GetBusLineStopsWithSuccess);

    //Chama o View
    return (
        <BusStopsView
            busLineChose={busLineChose}
            busStops={busStops}
            isConnectingGetBusLineStops={isConnectingGetBusLineStops}
            GetBusLineStopsWithSuccess={GetBusLineStopsWithSuccess}
        />
    )
}
export default BusStopsController;