import './Studios.css';
import React, { useState, useEffect } from 'react';
import axios from 'axios';

import Form from 'react-bootstrap/Form';

import StudioCard from './fragments/StudioCard';

const Studios = () => {
    const [studios, setStudios] = useState([]);

    useEffect(() => {
        fetchStudios();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    const fetchStudios = async () => {
        const res = await axios.get('/api/studios');

        if (res.data) {
            buildStudios(res.data);
        } else {
            console.log(res.error);
        }
    }

    const buildStudios = studios => {
        setStudios(studios);
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
                    studios ?
                    studios.map(studio => <StudioCard studio={studio} />)
                    : null
                }
            </div>
        </div>
    );
}

export default Studios;