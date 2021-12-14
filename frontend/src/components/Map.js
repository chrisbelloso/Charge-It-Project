import React, { useCallback, useEffect, useRef, useState } from "react";
import { Badge } from "react-bootstrap";


import {
    GoogleMap,
    useLoadScript,
    Marker,
    InfoWindow,
} from "@react-google-maps/api";

import { getCompaniesFromApi } from "../services/CompanyServices";

const libraries = ["places"];
const center = { lat: 25.76585949266363, lng: -80.19816792343089 };

const Map = () => {
    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);

    const mapRef = useRef();

    const onMapLoad = useCallback((map) => {
        mapRef.current = map;
    }, []);

    useEffect(() => {
        const getCoordinates = async () => {
            try {
                const response = await getCompaniesFromApi();
                setMarkers(response.data);
            } catch (error) {
                console.log("Can get trees");
            }
        };
        getCoordinates();
    }, []);

    const options = {
        disableDefaultUI: true,
        zoomControl: true,
        minZoom: 13,
        maxZoom: 17,
    }
    const mapContainerStyle = {
        width: "100%",
        height: "550px",
    };

    const { isLoaded, loadError } = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_KEY,
        libraries,
    });

    if (loadError) return "Error loading maps";
    if (!isLoaded) return "Loading maps";

    return (
        <GoogleMap
            mapContainerClassName="map"
            mapContainerStyle={mapContainerStyle}
            zoom={13}
            center={center}
            options={options}
            onLoad={onMapLoad}
            id="ChargeIt"
        >
            {markers.map((marker) => (
                <Marker
                    key={marker.uid}
                    position={{ lat: marker.latitude, lng: marker.longitude }}
                    icon={{
                        url: "/map-marker.svg",
                        origin: new window.google.maps.Point(0, 0),
                        anchor: new window.google.maps.Point(19.5, 15),
                        scaledSize: new window.google.maps.Size(40, 40),
                    }}
                onClick={() => {
                    setSelected(marker);
                }}
                />
            ))}

            {selected ? (
                <InfoWindow
                position={{
                    lat: selected.latitude,
                    lng: selected.longitude,
                }}
                onCloseClick={() => setSelected(null)}
                >
                    <div>
                        <h6>{selected.name}</h6>
                        <p>{selected.address}</p>
                    </div>
                </InfoWindow>
            ) : null}
        </GoogleMap>
    );
};

export default Map;