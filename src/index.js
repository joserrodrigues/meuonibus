import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
//Importa o store
import store from './store/store';

//Importa o Provider do React Redux
import { Provider } from 'react-redux';

//Importa o Css do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

//Importa o BroserRouter do react-router-dom
import { BrowserRouter } from "react-router-dom";

//Importa o Controlador de rotas do aplicativo
import RouterController from './RouterController';

ReactDOM.render(
  <React.StrictMode>
    {/* Adiciona o BrowserRouter para controlar a rota */}
    <BrowserRouter>
      {/* Adicionar o Provider com o store importado*/}
      <Provider store={store}>
        <RouterController />
      </Provider>
    </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
// serviceWorker.registerServiceWorker();
