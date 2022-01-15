import './Studios.css';
import React, { useEffect } from 'react';
import { withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux'

import { fetchStudios } from '../../actions/studio';
import { resetArtists } from '../../actions/artist';
import StudioCard from './fragments/StudioCard';

import Form from 'react-bootstrap/Form';


const Studios = ({ studio: { studios }, fetchStudios, resetArtists, history }) => {
    useEffect(() => {
        fetchStudios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const handleStudioCardClick = studioId => {
        resetArtists();
        history.push(`/studios/${studioId}`);
    }

    return (
        <div className="full-content">
            <div className="search-header">
                <h1 className="mt-5">Studios</h1>
                <p className="font-70 secondary-color">Find tattoo studios near you.</p>
                <Form.Group controlId="formArtistLocation">
                    <Form.Control type="text" placeholder="In which city?" />
                </Form.Group>
            </div>

            <hr className="my-3" />

            <div className="d-flex flex-wrap justify-content-center mx-5">
                {
                    studios && studios.map(studio => <StudioCard key={studio._id} studio={studio} onClick={() => handleStudioCardClick(studio._id)} />)
                }
            </div>
        </div>
    );
}

Studios.propTypes = {
    studio: PropTypes.object.isRequired,
    fetchStudios: PropTypes.func.isRequired
}

const mapStateToProps = state => ({
    studio: state.studio
});

export default connect(mapStateToProps, { fetchStudios, resetArtists })(withRouter(Studios));