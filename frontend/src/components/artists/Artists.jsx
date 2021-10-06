import './Artists.css';
import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import axios from 'axios';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchTattooStyles } from '../../actions/tattooStyles';

import Form from 'react-bootstrap/Form';

import ArtistCard from './fragments/ArtistCard';
import TattooStyles from '../tattooStyles/TattooStyles';

const Artists = ({ tattooStyles: { tattooStyles, loading }, fetchTattooStyles }) => {
    const [tattooStylesArray, setTattooStyles] = useState([]);
    const [artists, setArtists] = useState([]);

    useEffect(() => {
        fetchTattooStyles();
        fetchArtists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchTattooStyles, loading]);

    const fetchArtists = async () => {
        const res = await axios.get('/api/artists');

        if (res.data) {
            buildArtists(res.data);
        } else {
            console.log(res.error);
        }
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
                {/* {
                    tattooStylesArray ? */}
                    <div className="tattoo-styles-header">
                        {
                            <TattooStyles selectedTattooStylesIds={tattooStylesArray} />
                        }
                    </div>
                    {/* : null
                } */}
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

Artists.propTypes = {
    fetchTattooStyles: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    tattooStyles: state.tattooStyles
})

export default connect(mapStateToProps, { fetchTattooStyles })(withRouter(Artists));