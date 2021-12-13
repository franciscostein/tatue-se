import React from 'react';
import { GoogleMap, Marker, withScriptjs, withGoogleMap } from 'react-google-maps';

const StudioMap = ({ location: { latitude, longitude, address }}) => {

    const Map = () => {
        return (
            <GoogleMap 
                defaultZoom={11}
                defaultCenter={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
            >
                <Marker 
                    position={{ lat: parseFloat(latitude), lng: parseFloat(longitude) }}
                />
            </GoogleMap>
        );
    }

    const WrappedMap = withScriptjs(withGoogleMap(Map));

    return (
        <div style={{ width: '100%', height: '37vh' }}>
            <WrappedMap 
                googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${process.env.REACT_APP_GOOGLE_API_KEY}&v=3.exp&libraries=geometry,drawing,places`}
                loadingElement={<div style={{ height: `100%` }} />}
                containerElement={<div style={{ height: `100%` }} />}
                mapElement={<div style={{ height: `100%` }} />}
            />
            <p>{latitude}</p>
            <p>{longitude}</p>
            <p>{address}</p>
        </div>
    );
}

export default StudioMap;