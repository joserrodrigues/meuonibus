/**
 * Controller da page Home
 */
import React, {useRef} from 'react';

//Importa a biblioteca de GeoLocation
import { geolocated } from "react-geolocated";

//Importa a HomeView
import HomeView from './HomeView'

//Importa as actions
import {
    updateUserCoordinate,
} from '../../store/modules/busInfo/actions';

//importa a função useDispatch do React Redux
import { useDispatch } from 'react-redux';

const HomeController = (props) => {        
    console.log(props);

    //Inicia a UseRef
    const previousLatitude = useRef(0);
    const previousLongitude = useRef(0);

    //Inicia o dispatch
    const dispatch = useDispatch();

    //Verifica se a Geolocation esta disponvivel e se a posição é diferente do que pegamos anteriormente
    if (props.isGeolocationAvailable && props.isGeolocationEnabled && props.coords !== null && props.coords != undefined &&
        previousLatitude.current != props.coords.latitude && previousLongitude.current != props.coords.longitude){
        previousLatitude.current = props.coords.latitude;
        previousLongitude.current = props.coords.longitude;
        //Envia a informação para o Redux
        dispatch(updateUserCoordinate(props.coords.latitude, props.coords.longitude)); 
    }

    return (
        <HomeView />
    )
}

//Configura o Geolocated para buscar a informação
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    userDecisionTimeout: 5000,
})(HomeController);
