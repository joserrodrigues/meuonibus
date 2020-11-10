/**
 * Objeto que organiza o reducer do módulo auth
 */

//Importa a função produce do immer
import produce from 'immer';

//Seta o state inicial
const INITIAL_STATE = {
    userToken: null,
    userGoogleID: null,
    userName: '',
    userGivenName: '',
    userEmail: '',
    userBusLine: {},
    userBusStop: {},   
};

//Cria a função responsável por organizar o Reducer
export default function busInfo(state = INITIAL_STATE, { type, payload }) {

    //A função de uma maneira mais fácil o state com o draft
    // e retorna um novo state para o reducer
    return produce(state, (draft) => {

        switch (type) {
            case 'auth/GET_LOGIN': {
                //Altera a informação do Info no state
                draft.userToken = payload.loginInfo.accessToken;
                draft.userGoogleID = payload.loginInfo.googleId;
                draft.userName = payload.loginInfo.profileObj.name;
                draft.userGivenName = payload.loginInfo.profileObj.givenName;
                draft.userEmail = payload.loginInfo.profileObj.email;
                break;
            }
            case 'auth/GET_LOGOFF': {
                //Altera a informação do Info no state
                draft.userToken = null;
                draft.userGoogleID = '';
                draft.userName = '';
                draft.userGivenName = '';
                draft.userEmail = '';
                break;
            }  
            case 'auth/UPDATE_USER_INFO': {
                //Altera a informação do Info no state
                draft.userBusLine = payload.busLine;
                draft.userBusStop = payload.busStop;
                break;
            }                        
            default:
        }
    });
}
