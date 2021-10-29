import { useState } from 'react';
import PlacesAutoComplete, { geocodeByAddress, getLatLng } from 'react-places-autocomplete';

import Form from 'react-bootstrap/Form';

const LocationInput = ({ searchOptions = null }) => {
    const [address, setAddress] = useState('');
    const [coordinates, setCoordinates] = useState({
        lat: null,
        lng: null
    });

    const handleSelect = async value => {
        const results = await geocodeByAddress(value);
        const latLng = await getLatLng(results[0]);

        setAddress(value);
        setCoordinates(latLng);
    }

    return (
        <PlacesAutoComplete 
            value={address} 
            onChange={setAddress}
            onSelect={handleSelect}
            searchOptions={searchOptions}
        >
            {
                ({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
                    <div>
                        {/* <p>Latitude: {coordinates.lat}</p>
                        <p>Longitude: {coordinates.lng}</p> */}

                        {/* <input { ...getInputProps({ placeholder: 'Type address' }) } /> */}
                        
                        <Form.Group controlId="formArtistLocation">
                            <Form.Label className="font-75">City</Form.Label>
                            <Form.Control 
                                name="city"
                                { ...getInputProps({ placeholder: 'Type address' }) }
                            />
                        </Form.Group>

                        <div>
                            { loading ? <div>loading...</div> : null }

                            {
                                suggestions.map(suggestion => {
                                    const style = {
                                        backgroundColor: suggestion.active ? '#0d6efd' : '#dee2e6',
                                        color: '#282c34'
                                    }

                                    return (
                                        <div { ...getSuggestionItemProps(suggestion, { style }) }>
                                            { suggestion.description }                                            
                                        </div>
                                    );
                                })
                            }
                        </div>
                    </div>
                )
            }
        </PlacesAutoComplete>
    );
}

export default LocationInput;