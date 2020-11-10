/**
 * Controller do componente BusPosition
 */
import React, {useState} from 'react';
import BusPositionView from './BusPositionView'

//importa as funções useDispatch e useSelector do React Redux
import { useSelector } from 'react-redux';

const BusPositionController = () => {

    // States para controlar a popup de informação
    const [showingInfoWindows, setShowingInfoWindows] = useState(false);
    const [activeMarker, setActiveMarker] = useState({});
    const [selectedBus, setSelectedBus] = useState({})

    //Busca as variaveis do Reducer
    const busLinesPositions = useSelector((state) => state.busInfo.busLinesPositions);
    const isConnectingGetBusLinePositions = useSelector((state) => state.busInfo.isConnectingGetBusLinePositions);
    const getBusLinePositionsWithSuccess = useSelector((state) => state.busInfo.getBusLinePositionsWithSuccess);    
    const userCoordinate = useSelector((state) => state.busInfo.userCoordinate);    
    const userBusLine = useSelector((state) => state.auth.userBusLine);
    

    //Executa função ao clicar no marker
    const onMarkerClick = (props, marker, e) => {
        //Seta a informação do marker e que está exibindo a popup
        setSelectedBus(props);
        setActiveMarker(marker);
        setShowingInfoWindows(true);
    }
    

    const onClose = () => {
        if (showingInfoWindows) {
            //Limpa a informação do marker e para de visualizar a popup
            setActiveMarker(null);
            setShowingInfoWindows(false);
        }
    };

    return (
        //Chamando o View e passando o props info e a funçao changeReducer
        <BusPositionView
            busLinesPositions={busLinesPositions}
            userBusLine={userBusLine}
            isConnectingGetBusLinePositions={isConnectingGetBusLinePositions}
            getBusLinePositionsWithSuccess={getBusLinePositionsWithSuccess}
            userCoordinate={userCoordinate}
            showingInfoWindows={showingInfoWindows}
            activeMarker={activeMarker}
            selectedBus={selectedBus}
            onMarkerClick={onMarkerClick}
            onClose={onClose}
        />
    )
}
export default BusPositionController;