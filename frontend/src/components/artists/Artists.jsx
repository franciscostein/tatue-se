import './Artists.css';

import React, { useState, useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchArtists } from '../../actions/artist';

import Form from 'react-bootstrap/Form';
import ArtistCard from './fragments/ArtistCard';
import TattooStyles from '../tattooStyles/TattooStyles';

const Artists = ({ artist: { artists }, fetchArtists, history }) => {
    const [selectedTattooStyles, setSelectedTattooStyles] = useState([]);

    useEffect(() => {
        fetchArtists();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    return (
        <div>
            <div className="search-header">
                <h1 className="mt-5">Artists</h1>
                <p className="font-70 secondary-color">Find your next tattoo artist.</p>
                <Form.Group controlId="formArtistLocation">
                    <Form.Control type="text" placeholder="In which city?" />
                </Form.Group>

                <div className="tattoo-styles-header">
                    {
                        <TattooStyles selectedTattooStylesIds={selectedTattooStyles} />
                    }
                </div>
            </div>
            <hr className="my-2" />
            {
                artists ?
                <div className="d-flex flex-wrap justify-content-center mx-5">
                    {
                        artists.map(artist => <ArtistCard key={artist._id} artist={artist} onClick={() => history.push(`/artists/${artist._id}`)} />)
                    }
                </div>
                : null
            }
        </div>
    );
}

Artists.propTypes = {
    artist: PropTypes.object.isRequired,
    fetchArtists: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    artist: state.artist,
});

export default connect(mapStateToProps, { fetchArtists })(withRouter(Artists));