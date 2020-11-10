/**
 * View do componente BusPosition
 */
import React, { useRef, useEffect, useState} from 'react';
import './BusPosition.css';
import { Row, Col, Spinner } from 'react-bootstrap';

//Import o Map do google-maps-react
import { Map, GoogleApiWrapper, Marker, InfoWindow } from 'google-maps-react';

//Import o Link do react-router
import { Link } from 'react-router-dom';

//Importa os Componentes do FontAwesome 
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faHeart } from '@fortawesome/free-solid-svg-icons'

const BusPositionView = (props) => {

    //Informações para carregar o tamanho da largura do componente 
    // e acertar o mapa no tamanho certo
    const ref = useRef(null);
    const [componentWidth, setComponentWidth] = useState(300);
    let currentSite = window.location.href;    

    useEffect(() => {
        //Ao carregar a tela, busca a informação da largura do componente 
        //para acertar o mapa na tela
        if (ref.current !== null){
            setComponentWidth(ref.current ? ref.current.offsetWidth : 0);
            console.log('width', ref.current ? ref.current.offsetWidth : 0);
        }        
    }, [ref.current]);


    //Exibe Spinner se estiver carregando
    if (props.isConnectingGetBusLinePositions) {
        return (
            <div ref={ref} className="MessageError">
                <Spinner animation="border" variant="danger" />
            </div>
        )            
    }
    //Exibe mensagem se não tiver linha favorita
    else if (props.userBusLine === undefined || props.userBusLine === null || 
        !('cl' in props.userBusLine)) {
        return (
            <div ref={ref} className="MessageError">
                <br></br>
                Você ainda não escolheu uma Linha favorita! <br></br>Vá a página <Link to="/search">Search</Link>, 
                busque por uma linha e clique no <FontAwesomeIcon className='LinkChangeBusPosition' icon={faHeart} />

            </div>
        )    
    }
    //Exibe mensagem se houve uma conexão com erro
    else if (props.getBusLinePositionsWithSuccess === 2) {
        return (
            <div ref={ref} className="MessageError">
                Houve um erro ao buscar a informação. Tente novamente mais tarde!
            </div>
        );
        //Exibe mensagem não tem nenhuma linha encontrado
    } else if (props.busLinesPositions.length === 0) {
        return (
            <div ref={ref} className="MessageError">
                Não foi possível buscar a posição de nenhum ônibus dessa linha
            </div>
        );
    } else {
        let markers = [];

        //Adicionando a sua posição
        // Colocando onclick para abrir informação da linha
        markers.push(
            <Marker
                key={"SP-0000001"}
                name={"Sua posição"}
                onClick={props.onMarkerClick}
                position={{ lat: props.userCoordinate.latitude, lng: props.userCoordinate.longitude }}
            />
        );

        //Busca a informacao de cada onibus lido
        props.busLinesPositions.vs.forEach(buslinePosition => {
            //Monta o texto que estará naPopup
            let info = 
                <>
                    <b>Prefixo:</b> {buslinePosition.p}<br></br>
                    <b>é Acessivel:</b> {buslinePosition.a ? 'Sim' : 'Não'}<br></br>
                </>
            //Adiciona a informação da Popup
            markers.push(
                <Marker
                    key={buslinePosition.p}
                    name={info}
                    onClick={props.onMarkerClick}
                    icon={{
                        url: currentSite + "bus-solid.png",
                    }}
                    position={{ lat: buslinePosition.py, lng:  buslinePosition.px }}
                />
            );                    
        });    

        //Verifica a direção da linha para montar o nome correto
        let laneName = props.userBusLine.tp + " - " + props.userBusLine.ts;
        if (props.userBusLine.sl === 1) {
            laneName = props.userBusLine.ts + " - " + props.userBusLine.tp;
        }

        // Criando o View com a informação do Info e o botão para alterar o Reducer
        return (
            <div ref={ref} >
                <Row>
                    <Col lg="12" className="TextBusLinePosition">
                        Linha: {props.userBusLine.lt} - {laneName}
                </Col>
                </Row>
                <Row>
                    <Col>
                        {/* Coloca o link para ir a tela de search */}
                        <Link className="LinkChangeBusPosition" to="/search">Trocar</Link>
                    </Col>
                </Row>
                <Row className="MapsPositionDiv">
                    <Col lg="12">
                        {/* Adicionando o Mapa na tela e centraliza a posição atual do usuário */}
                        <Map
                            google={props.google}
                            zoom={14}
                            style={{
                                width: componentWidth + 'px',
                                height: '380px'
                            }}
                            initialCenter={
                                {
                                    lat: props.userCoordinate.latitude,
                                    lng: props.userCoordinate.longitude
                                }
                            }
                        >
                            {/* Adicionando os markers*/}
                            {markers}

                            {/* Adicionando o InfoWindow que exibe ao clicar no marker */}
                            <InfoWindow
                                marker={props.activeMarker}
                                visible={props.showingInfoWindows}
                                onClose={props.onClose}>
                                <div>
                                    {props.selectedBus.name}
                                </div>
                            </InfoWindow>
                        </Map>
                    </Col>
                </Row>
            </div>
        );
    }   
}

//Adiciona o HOC para carregar a informação do Google Maps
export default GoogleApiWrapper({
    apiKey: process.env.REACT_APP_GOOGLE_MAPS_KEY
})(BusPositionView);
