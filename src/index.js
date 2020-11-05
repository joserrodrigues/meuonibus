import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import HomeController from './Pages/Home/HomeController';
import * as serviceWorker from './serviceWorker';
//Importa o store
import store from './store/store';

//Importa o Provider do React Redux
import { Provider } from 'react-redux';

//Importa o Css do Bootstrap
import 'bootstrap/dist/css/bootstrap.min.css';

ReactDOM.render(
  <React.StrictMode>
    {/* Adicionar o Provider com o store importado*/}
    <Provider store={store}>
      <HomeController />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
//serviceWorker.register();
serviceWorker.registerServiceWorker();
