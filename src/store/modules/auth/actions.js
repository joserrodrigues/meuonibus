
//Função que realiza o login no app
export function login(loginInfo) {

    //Retorna o Redux Action auth/GET_LOGIN
    return {
        type: 'auth/GET_LOGIN',
        payload: { loginInfo },
    };
}

//Função que realiza o logoff no app
export function logOff() {

     //Retorna o Redux Action auth/GET_LOGOFF
    return {
        type: 'auth/GET_LOGOFF',
    };
}

//Função que altera as informações do usuário no Redux/Firestore
export function changeUserInfo(busLine, busStop) {

    //Retorna o Redux Action auth/GET_LOGOFF
    return {
        type: 'auth/CHANGE_USER_INFO',
        payload: { busLine, busStop },
    };
}

//Função que busca as informações do usuário no Redux/Firestore
export function getUserInfo(loginInfo) {

    //Retorna o Redux Action auth/GET_LOGOFF
    return {
        type: 'auth/GET_USER_INFO',
        payload: { loginInfo },
    };
}

//Função que altera a informação no Redux após buscar no Firestore
export function updateUserInfo(busLine, busStop) {

    //Retorna o Redux Action auth/GET_LOGOFF
    return {
        type: 'auth/UPDATE_USER_INFO',
        payload: { busLine, busStop },
    };
}