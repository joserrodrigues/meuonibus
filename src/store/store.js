/**
 * Realiza a configuração o React Redux e Redux-Saga
 */

//Importa os métodos e funções que usaremos no Redux-Saga
import createSagaMiddleware from 'redux-saga';
import { createStore, applyMiddleware } from 'redux';


 //Importa os objetos com os reducers e as sagas
import allReducers from './modules/allReducers';
import allSagas from './modules/allSagas';

//Criando o Middleware Saga
const sagaMiddleware = createSagaMiddleware();

//Criando um array caso precisemos de mais middlewares
const middlewares = [sagaMiddleware];

//Criando a Redux Store 
const store = createStore(allReducers, applyMiddleware(...middlewares));

// Rodando redux-saga
sagaMiddleware.run(allSagas);

export default store