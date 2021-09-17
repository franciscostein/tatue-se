import './Artists.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';

import ArtistCard from './fragments/ArtistCard';

const Artists = () => {
    const [tattooStyles, setTattooStyles] = useState([]);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetchTattooStyles();
        fetchArtists();
    }, []);

    const fetchTattooStyles = async () => {
        const res = await axios.get('/api/tattoo-styles');

        if (res.data) {
            buildTattooStyles(res.data);
        } else {
            console.log(res.error);
        }
    }

    const fetchArtists = async () => {
        const res = await axios.get('/api/artists');


        if (res.data) {
            buildArtists(res.data);
        } else {
            console.log(res.error);
        }
    }

    const buildTattooStyles = tattooStyles => {
        const names = [];

        tattooStyles.forEach(tattooStyle => {
            names.push(tattooStyle.name);
        });

        setTattooStyles(names);
    }

    const buildArtists = artists => {
        const artistsArray = [];

        artists.forEach(artist => {
            artistsArray.push({
                ...artist
            });
        });

        setArtists(artistsArray);
    }

    return (
        <div>
            <div className="search-header">
                <h1 className="mt-5">Artists</h1>
                <p className="font-70 secondary-color">Find your next tattoo artist.</p>
                <Form.Group controlId="formArtistLocation">
                    <Form.Control type="text" placeholder="In which city?" />
                </Form.Group>
                {
                    tattooStyles ?
                    <div className="tattoo-styles-header">
                        {
                            tattooStyles.map(tattooStyle => <span className="tattoo-style-badge font-50 mx-1 mb-2">{tattooStyle}</span>)
                        }
                    </div>
                    : null
                }
            </div>
            <hr className="my-2" />
            {
                artists ?
                <div className="d-flex flex-wrap justify-content-center mx-5">
                    {
                        artists.map(artist => <ArtistCard artist={artist} />)
                    }
                </div>
                : null
            }
        </div>
    );
}

export default Artists;