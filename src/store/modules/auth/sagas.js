/**
 * Objeto que reúne as sagas do módulo auth
 */
//Importa os effects do Redux-Saga 
import { takeLatest, call, put, all, select } from 'redux-saga/effects';
import { doc, getDoc, setDoc } from "firebase/firestore";
import { db } from "../../../Services/Firestore";

// Importa as funções Actions que serão chamadas pelo Saga
import {
    updateUserInfo,    
    login,
} from './actions';

//Saga responsável por salvar as informações no FireStore
function* changeUserInfo({ payload }) {
    try {
        //Obtendo as variáveis busLine e busStop do payload
        const { busLine, busStop } = payload;

        //Obtendo as informações do login do Google
        let userGoogleID = yield select(state => state.auth.userGoogleID);        

        //Salva as informações no FireStore usando o GoogleID como ID no banco
        const docRef = doc(db, "userInfo", userGoogleID);
        setDoc(docRef, {
          busLine: busLine,
          busStop: busStop,
        });

        //chama Redux Action para atualizar a informação do usuário
        yield put(updateUserInfo(busLine, busStop));

    } catch (err) {
        console.log(err);
        console.log("Error Call");        
    }
}

//Busca as informações no FireStore de forma assícrona
async function getFireStoreData(userGoogleID) {
    
    //Busca as informações da colletion userInfo cujo ID é igual ao userGoogleID    
    const docRef = doc(db, "userInfo", userGoogleID);
    
    //Busca as informações
    const info = await getDoc(docRef);
    if (!info.exists) {
        console.log('No such document!');
        return {}
    } else {
        console.log('Document data:', info.data());
        //retorna as informações buscadas
        return info.data();
    }         
}

//Saga responsável por Buscar as informações No FireStore
function* getUserInfo({ payload }) {
    try {

        //Obtendo as variáveis busLine e busStop do payload
        const { loginInfo } = payload;

        //Obtendo as informações do login do Google
        let userGoogleID = loginInfo.googleId;

        //Chamando função para buscar as informações no FireStore
        const dataReturn = yield call(getFireStoreData, userGoogleID);
        console.log(dataReturn);

        //Checa se o objeto é vazio
        if (Object.keys(dataReturn).length === 0 && dataReturn.constructor === Object){
            //chama Redux Action para atualizar a informação do usuário
            yield put(updateUserInfo(null, null));
        } else {
            //chama Redux Action para atualizar a informação do usuário
            yield put(updateUserInfo(dataReturn.busLine, dataReturn.busStop));
        }
        
        //Chama a Redux Action para passar a informação de login
        yield put(login(loginInfo));

    } catch (err) {
        console.log(err);
        console.log("Error Call");
    }
}

//Junta todos as sagas deste objeto
export default all([
    //executa as operações recebidas e retorna o valor da última
    // Atenção ao busInfo/SEARCH_BUSLINES, ele é o link chamado no ACTION
    // para executar a Action
    takeLatest('auth/GET_USER_INFO', getUserInfo),
    takeLatest('auth/CHANGE_USER_INFO', changeUserInfo),
]);