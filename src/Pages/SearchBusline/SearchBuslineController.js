/**
 * Controller da page SearchBusline
 */
import React, { useRef } from 'react';

//Importa a biblioteca de GeoLocation
import { useGeolocated } from "react-geolocated";

//Importa a SearchBuslineView
import SearchBuslineView from './SearchBuslineView'

//Importa as actions
import {
    updateUserCoordinate,
} from '../../store/modules/busInfo/actions';

//importa a função useDispatch do React Redux
import { useDispatch } from 'react-redux';

const SearchBuslineController = (props) => {
    console.log(props);

    //Inicia a UseRef
    const previousLatitude = useRef(0);
    const previousLongitude = useRef(0);

    //Inicia o dispatch
    const dispatch = useDispatch();

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
        previousLatitude.current !== coords.latitude && previousLongitude.current !== coords.longitude) {
        previousLatitude.current = coords.latitude;
        previousLongitude.current = coords.longitude;
        //Envia a informação para o Redux
        dispatch(updateUserCoordinate(coords.latitude, coords.longitude));
    }

    return (
        <SearchBuslineView />
    )
}

//Configura o Geolocated para buscar a informação
export default SearchBuslineController;
