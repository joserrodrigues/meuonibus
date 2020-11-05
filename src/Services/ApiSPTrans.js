//Importa a biblioteca Axios
import axios from 'axios';

//Cria uma conexão Axios com a URL base o que está na API da SPTrans
const ApiSPTrans = axios.create({
    baseURL: process.env.REACT_APP_API_SPTRANS,
});

export default ApiSPTrans;
