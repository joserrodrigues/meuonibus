/**
 * Controller da page Home
 */
import React, { useRef, useEffect} from 'react';

//Importa a biblioteca de GeoLocation
import { useGeolocated } from "react-geolocated";

//Importa a HomeView
import HomeView from './HomeView'

//Importa as actions
import {
    updateUserCoordinate,
    getHomeInfo,
} from '../../store/modules/busInfo/actions';

//importa a função useDispatch do React Redux
import { useDispatch, useSelector } from 'react-redux';

const HomeController = (props) => {        
    console.log(props);

    //Inicia a UseRef
    const previousLatitude = useRef(0);
    const previousLongitude = useRef(0);
    
    //Busca as variaveis do Reducer
    const userBusLine = useSelector((state) => state.auth.userBusLine);
    const userBusStop = useSelector((state) => state.auth.userBusStop);

    //Inicia o dispatch
    const dispatch = useDispatch();

    //Realiza a busca após carregar a página
    useEffect(() => {
        let busLineID = userBusLine ? userBusLine.cl:undefined;
        let busStopID = userBusStop ? userBusStop.cp: undefined; //7014417
        //Envia informação com o ID do Parada e da linha 
        dispatch(getHomeInfo(busStopID, busLineID));
    }, [])

    //Get Geo Coordinates
    const { coords, isGeolocationAvailable, isGeolocationEnabled } =
      useGeolocated({
        positionOptions: {
          enableHighAccuracy: false,
        },
        userDecisionTimeout: 5000,
      });    

    //Verifica se a Geolocation esta disponvivel e se a posição é diferente do que pegamos anteriormente
    if (isGeolocationAvailable && isGeolocationEnabled && coords !== null && coords !== undefined &&
        previousLatitude.current !== coords.latitude && previousLongitude.current !== coords.longitude){
        previousLatitude.current = coords.latitude;
        previousLongitude.current = coords.longitude;
        //Envia a informação para o Redux
        dispatch(updateUserCoordinate(coords.latitude, coords.longitude)); 
    }

    return (
        <HomeView />
    )
}

//Configura o Geolocated para buscar a informação
export default HomeController;
