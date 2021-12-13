import React, { useState } from 'react';
import GoogleMap from 'google-map-react';

const StudioMap = ({ location: { latitude, longitude }}) => {
    const [center, setCenter] = useState({
        lat: latitude,
        lng: longitude
    });
    const [zoom, setZoom] = useState(11);

    return (
        <div style={{ height: '50vh', width: '100%' }}>
            <GoogleMap
                defaultCenter={center}
                defaultZoom={zoom}
            >
                <p>lat: {`${latitude}`}</p>
                <p>lng: {`${longitude}`}</p>
            </GoogleMap>
        </div>
    );
}

export default StudioMap;