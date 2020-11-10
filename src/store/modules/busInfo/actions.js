/**
 * Objeto que reúne os Actions que alteram as informações no BusInfo
 */


//Função que adiciona Action Start no Search Buslines
export function searchBusLinesStart() {

    //Retorna o Redux Action busInfo/SEARCH_BUSLINES_START
    return {
        type: 'busInfo/SEARCH_BUSLINES_START',
    };
}

//Função que adiciona o Saga para buscar as linhas
export function searchBusLines(search) {

    //Retorna o Redux Action busInfo/SEARCH_BUSLINES
    //para chamar o Saga
    return {
        type: 'busInfo/SEARCH_BUSLINES',
        payload: { search },
    };
}

//Função que adiciona Action Finish Success no Search Buslines
export function searchBusLinesFinishSuccess(busLines, apiToken) {

    //Retorna o Redux Action busInfo/SEARCH_BUSLINES_FINISH_SUCCESS
    return {
        type: 'busInfo/SEARCH_BUSLINES_FINISH_SUCCESS',
        payload: { busLines, apiToken },
    };
}

//Função que adiciona Action Finish Error no Search Buslines
export function searchBusLinesFinishError() {

    //Retorna o Redux Action busInfo/SEARCH_BUSLINES_FINISH_ERROR
    return {
        type: 'busInfo/SEARCH_BUSLINES_FINISH_ERROR',
        payload: {  },
    };
}

//Função que adiciona Action Start no Get Buslines Stops
export function getBusLineStopsStart(busLine) {

    //Retorna o Redux Action busInfo/GET_BUSLINES_STOPS_START
    return {
        type: 'busInfo/GET_BUSLINES_STOPS_START',
        payload: { busLine },
    };
}

//Função que adiciona o Saga para buscar as paradas da linha
export function getBusLineStops(busLine) {

    //Retorna o Redux Action busInfo/GET_BUSLINES_STOPS
    //para chamar o Saga
    return {
        type: 'busInfo/GET_BUSLINES_STOPS',
        payload: { busLine },
    };
}

//Função que adiciona Action Finish Success no Get Buslines Stops
export function getBusLineStopsFinishSuccess(busStops) {

    //Retorna o Redux Action busInfo/GET_BUSLINES_STOPS_FINISH_SUCCESS
    return {
        type: 'busInfo/GET_BUSLINES_STOPS_FINISH_SUCCESS',
        payload: { busStops },
    };
}

//Função que adiciona Action Finish Error no Get Buslines Stops
export function getBusLineStopsFinishError() {

    //Retorna o Redux Action busInfo/GET_BUSLINES_STOPS_FINISH_ERROR
    return {
        type: 'busInfo/GET_BUSLINES_STOPS_FINISH_ERROR',
        payload: {  },
    };
}

//Função que altera a posição do usuário no Reducer
export function updateUserCoordinate(latitude, longitude) {

    //Retorna o Redux Action busInfo/CHANGE_USER_COORDINATE
    return {
        type: 'busInfo/CHANGE_USER_COORDINATE',
        payload: {
            latitude, longitude
        },
    };
}

//Função que adiciona Action Start no Get Arrive Buslines
export function getArriveBusStopsStart() {

    //Retorna o Redux Action busInfo/GET_ARRIVE_BUS_STOPS_START
    return {
        type: 'busInfo/GET_ARRIVE_BUS_STOPS_START',
        payload: {  },
    };
}

//Função que adiciona o Saga para buscar as chegadas da parada
export function getHomeInfo(busStopID, busLineID ) {

    //Retorna o Redux Action busInfo/GET_HOME_INFO
    //para chamar o Saga
    return {
        type: 'busInfo/GET_HOME_INFO',
        payload: { busStopID, busLineID },
    };
}

//Função que adiciona Action Finish Success no Get Arrive Buslines
export function getArriveBusStopsFinishSuccess(arriveBusLines, apiToken) {

    //Retorna o Redux Action busInfo/GET_ARRIVE_BUS_STOPS_FINISH_SUCCESS
    return {
        type: 'busInfo/GET_ARRIVE_BUS_STOPS_FINISH_SUCCESS',
        payload: { arriveBusLines, apiToken },
    };
}

//Função que adiciona Action Finish Error no Get Arrive Buslines
export function getArriveBusStopsFinishError() {

    //Retorna o Redux Action busInfo/GET_ARRIVE_BUS_STOPS_FINISH_ERROR
    return {
        type: 'busInfo/GET_ARRIVE_BUS_STOPS_FINISH_ERROR',
        payload: {},
    };
}

//Função que adiciona Action Start no Get Buslines Positions
export function getBusLinePositionsStart() {

    //Retorna o Redux Action busInfo/GET_BUSLINES_POSITIONS_START
    return {
        type: 'busInfo/GET_BUSLINES_POSITIONS_START',
        payload: {},
    };
}

//Função que adiciona Action Finish Success no Get Buslines Positions
export function getBusLinePositionsFinishSuccess(busLinesPositions) {

    //Retorna o Redux Action busInfo/GET_BUSLINES_POSITIONS_FINISH_SUCCESS
    return {
        type: 'busInfo/GET_BUSLINES_POSITIONS_FINISH_SUCCESS',
        payload: { busLinesPositions },
    };
}

//Função que adiciona Action Finish Error no Get Buslines Positions
export function getBusLinePositionsFinishError() {

    //Retorna o Redux Action busInfo/GET_BUSLINES_POSITIONS_FINISH_ERROR
    return {
        type: 'busInfo/GET_BUSLINES_POSITIONS_FINISH_ERROR',
        payload: {},
    };
}
