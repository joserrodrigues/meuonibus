/**
 * Objeto que reúne as sagas deste módulo
 */
//Importa os effects do Redux-Saga 
import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import ApiSPTrans from '../../../Services/ApiSPTrans';

// Importa as funções Actions que serão chamadas pelo Saga
import {    
    searchBusLinesStart,
    searchBusLinesFinishSuccess,
    searchBusLinesFinishError,
    getBusLineStopsStart,
    getBusLineStopsFinishSuccess,
    getBusLineStopsFinishError,
    getArriveBusStopsStart,
    getArriveBusStopsFinishSuccess,
    getArriveBusStopsFinishError,
    getBusLinePositionsStart,
    getBusLinePositionsFinishSuccess,
    getBusLinePositionsFinishError,
} from './actions';

//Saga responsável por Buscar a informação e alterar o Reducer
function* getBusLines({ payload }) {
    try {
        //Obtendo a variável search do payload
        const { search } = payload;

        console.log("Start Connection");
        //Envia o Redux action que iniciou a conexão
        yield put(searchBusLinesStart());

        //Obtendo a informação da apitoken para não ter de buscar novamente
        let apiToken = yield select(state => state.busInfo.apiToken);

        //Se o apiToken ja existe, não vamos precisar buscar novamente
        if (apiToken === ''){            
            //Realiza a primeira conexão para Autenticar a conexão
            const dataReturn = yield call(ApiSPTrans.post, '/Login/Autenticar?token=' + process.env.REACT_APP_TOKEN_SPTRANS);

            //recebe as informações
            let response = dataReturn.data.response;
            apiToken = dataReturn.data.apiToken;

            //Verifica se a responsta da conexão veio como true
            if (response === false) {
                console.log("NOT SUCCESS");
                yield put(searchBusLinesFinishError());
            }   
        }        

        //Realiza a conexão para buscar as linhas
        const returnSearch = yield call(ApiSPTrans.get, '/Linha/Buscar?termosBusca=' + search +'&tokenConexao='+apiToken);

        console.log(returnSearch);        
        //Verificar se o retorno é um array, se sim, volta sucesso
        if (returnSearch.data instanceof Array){
            console.log("Success Call");
            yield put(searchBusLinesFinishSuccess(returnSearch.data, apiToken));
        } else {
            console.log("NOT SUCCESS");
            yield put(searchBusLinesFinishError());
        }        
    } catch (err) {
        //console.log(err);
        console.log("Error Call");
        yield put(searchBusLinesFinishError());
    }
}

//Saga responsável por Buscar as paradas relacionadas a linha e alterar o reducer
function* getBusLineStops({ payload }) {
    try {
        //Obtendo a variável search do payload
        const { busLine } = payload;

        console.log("Start Connection");
        //Envia o Redux action que iniciou a conexão
        yield put(getBusLineStopsStart(busLine));

        //Obtendo a informação da apitoken para não ter de buscar novamente
        let apiToken = yield select(state => state.busInfo.apiToken);

        //Realiza a conexão para buscar as linhas
        const returnInfo = yield call(ApiSPTrans.get, '/Parada/BuscarParadasPorLinha?codigoLinha=' + busLine.cl +'&tokenConexao='+apiToken);
        console.log(returnInfo);        
        //Verificar se o retorno é um array, se sim, volta sucesso
        if (returnInfo.data instanceof Array){
            console.log("Success Call");
            yield put(getBusLineStopsFinishSuccess(returnInfo.data, apiToken));
        } else {
            console.log("NOT SUCCESS");
            yield put(getBusLineStopsFinishError());
        }        
    } catch (err) {
        //console.log(err);
        console.log("Error Call");
        yield put(getBusLineStopsFinishError());
    }
}

//Saga responsável por Buscar as informações utilizadas na Home Info
function* getHomeInfo({ payload }) {
    try {
        //Obtendo a variável search do payload
        const { busStopID, busLineID } = payload;

        console.log("Start Connection");
        //Envia o Redux action que iniciou a conexão
        yield put(getArriveBusStopsStart());
        yield put(getBusLinePositionsStart());

        //Obtendo a informação da apitoken para não ter de buscar novamente
        let apiToken = yield select(state => state.busInfo.apiToken);

        //Se o apiToken ja existe, não vamos precisar buscar novamente
        if (apiToken === '') {
            //Realiza a primeira conexão para Autenticar a conexão
            const dataReturn = yield call(ApiSPTrans.post, '/Login/Autenticar?token=' + process.env.REACT_APP_TOKEN_SPTRANS);

            //recebe as informações
            let response = dataReturn.data.response;
            apiToken = dataReturn.data.apiToken;

            //Verifica se a responsta da conexão veio como true
            if (response === false) {
                console.log("NOT SUCCESS");
                yield put(searchBusLinesFinishError());
            }
        }        


        //Realiza a conexão para buscar todas as informações ao mesmo tempo
        const [returnInfoArriveBusStops, returnInfoBusLinePositions] = yield all([
            call(ApiSPTrans.get, '/Previsao/Parada?codigoParada=' + busStopID + '&tokenConexao=' + apiToken),
            call(ApiSPTrans.get, '/Posicao/Linha?codigoLinha=' + busLineID + '&tokenConexao=' + apiToken)
        ]);

        console.log(returnInfoArriveBusStops);        
        //Verificar se o retorno é um array, se sim, volta sucesso
        if (returnInfoArriveBusStops.data instanceof Object && 
            returnInfoArriveBusStops.data.p instanceof Object &&
            returnInfoArriveBusStops.data.p.l instanceof Array ){
            console.log("Success Call");
            yield put(getArriveBusStopsFinishSuccess(returnInfoArriveBusStops.data, apiToken));
        } else {
            console.log("NOT SUCCESS");
            yield put(getArriveBusStopsFinishError());
        }        

        console.log(returnInfoBusLinePositions);        
        //Verificar se o retorno é um array, se sim, volta sucesso
        if (returnInfoBusLinePositions.data.vs instanceof Array){
            console.log("Success Call");
            yield put(getBusLinePositionsFinishSuccess(returnInfoBusLinePositions.data));
        } else {
            console.log("NOT SUCCESS");
            yield put(getBusLinePositionsFinishError());
        }        
    } catch (err) {
        console.log(err);
        console.log("Error Call");
        yield put(getArriveBusStopsFinishError());
        yield put(getBusLinePositionsFinishError());
    }
}

//Junta todos as sagas deste objeto
export default all([
    //executa as operações recebidas e retorna o valor da última
    // Atenção ao busInfo/SEARCH_BUSLINES, ele é o link chamado no ACTION
    // para executar a Action
    takeLatest('busInfo/SEARCH_BUSLINES', getBusLines),    
    takeLatest('busInfo/GET_BUSLINES_STOPS', getBusLineStops),    
    takeLatest('busInfo/GET_HOME_INFO', getHomeInfo),    
]);
