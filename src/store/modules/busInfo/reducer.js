/**
 * Objeto que organiza o reducer do módulo busInfo
 */

//Importa a função produce do immer
import produce from 'immer';

//Seta o state inicial
const INITIAL_STATE = {
    apiToken: '',
    busLines: [],
    isConnectingSearchBusLines: false,
    searchBusLinesWithSuccess: 0,
    busLineChose: null,
    busStops: [],
    isConnectingGetBusLineStops: false,
    GetBusLineStopsWithSuccess: 0,
    userCoordinate: {
        latitude: 0,
        longitude: 0
    },
    arriveBusLines: [],
    isConnectingGetArriveBusStops: false,
    getArriveBusStopsWithSuccess: 0,
    busLinesPositions: [],
    isConnectingGetBusLinePositions: false,
    getBusLinePositionsWithSuccess: 0,    
};

//Cria a função responsável por organizar o Reducer
export default function busInfo(state = INITIAL_STATE, { type, payload }) {

    //A função de uma maneira mais fácil o state com o draft
    // e retorna um novo state para o reducer
    return produce(state, (draft) => {

        switch (type) {
            case 'busInfo/SEARCH_BUSLINES_START': {
                //Altera a informação do Info no state
                draft.busLines = [];
                draft.isConnectingSearchBusLines = true;
                draft.searchBusLinesWithSuccess = 0;
                draft.busLineChose = null;
                break;
            }
            case 'busInfo/SEARCH_BUSLINES_FINISH_SUCCESS': {
                //Altera a informação do Info no state
                draft.apiToken = payload.apiToken;
                draft.busLines = payload.busLines;
                draft.isConnectingSearchBusLines = false;
                draft.searchBusLinesWithSuccess = 1;
                break;
            }
            case 'busInfo/SEARCH_BUSLINES_FINISH_ERROR': {
                //Altera a informação do Info no state
                draft.busLines = [];
                draft.isConnectingSearchBusLines = false;
                draft.searchBusLinesWithSuccess = 2;
                break;
            }
            case 'busInfo/GET_BUSLINES_STOPS_START': {
                //Altera a informação do Info no state
                draft.busLineChose = payload.busLine;
                draft.busStops = [];
                draft.isConnectingGetBusLineStops = true;
                draft.GetBusLineStopsWithSuccess = 0;
                break;
            }
            case 'busInfo/GET_BUSLINES_STOPS_FINISH_SUCCESS': {
                //Altera a informação do Info no state
                draft.busStops = payload.busStops;
                draft.isConnectingGetBusLineStops = false;
                draft.GetBusLineStopsWithSuccess = 1;
                break;
            }
            case 'busInfo/GET_BUSLINES_STOPS_FINISH_ERROR': {
                //Altera a informação do Info no state
                draft.busStops = [];
                draft.isConnectingGetBusLineStops = false;
                draft.GetBusLineStopsWithSuccess = 2;
                break;
            }
            case 'busInfo/CHANGE_USER_COORDINATE': {
                //Altera a informação do Info no state
                draft.userCoordinate = {
                    latitude: payload.latitude,
                    longitude: payload.longitude
                };
                break;
            }
            case 'busInfo/GET_ARRIVE_BUS_STOPS_START': {
                //Altera a informação do Info no state
                draft.arriveBusLines = [];
                draft.isConnectingGetArriveBusStops = true;
                draft.getArriveBusStopsWithSuccess = 0;
                break;
            }
            case 'busInfo/GET_ARRIVE_BUS_STOPS_FINISH_SUCCESS': {
                //Altera a informação do Info no state
                draft.arriveBusLines = payload.arriveBusLines;
                draft.isConnectingGetArriveBusStops = false;
                draft.getArriveBusStopsWithSuccess = 1;
                draft.apiToken = payload.apiToken;
                break;
            }
            case 'busInfo/GET_ARRIVE_BUS_STOPS_FINISH_ERROR': {
                //Altera a informação do Info no state
                draft.arriveBusLines = [];
                draft.isConnectingGetArriveBusStops = false;
                draft.getArriveBusStopsWithSuccess = 2;
                break;
            }
            case 'busInfo/GET_BUSLINES_POSITIONS_START': {
                //Altera a informação do Info no state
                draft.busLinesPositions = [];
                draft.isConnectingGetBusLinePositions = true;
                draft.getBusLinePositionsWithSuccess = 0;
                break;
            }
            case 'busInfo/GET_BUSLINES_POSITIONS_FINISH_SUCCESS': {
                //Altera a informação do Info no state
                draft.busLinesPositions = payload.busLinesPositions;
                draft.isConnectingGetBusLinePositions = false;
                draft.getBusLinePositionsWithSuccess = 1;
                break;
            }
            case 'busInfo/GET_BUSLINES_POSITIONS_FINISH_ERROR': {
                //Altera a informação do Info no state
                draft.busLinesPositions = [];
                draft.isConnectingGetBusLinePositions = false;
                draft.getBusLinePositionsWithSuccess = 2;
                break;
            }
            default:
        }
    });
}
