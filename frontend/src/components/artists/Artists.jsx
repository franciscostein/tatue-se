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
                {/* <div className="studio-card m-3">
                    <Row>
                        <Image src={img1} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
                        <Col>
                            <Row className="font-60 ps-2">Tattoist 1</Row>
                            <Row className="font-45 ps-2">Tattoo Studio</Row>
                        </Col>
                    </div>
                    <div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
                        <span className="tattoo-style-badge mx-1">Blackwork</span>
                        <span className="tattoo-style-badge mx-1">Dotwork</span>
                    </div>
                </div>
                <div className="studio-card m-3">
                    <Row>
                        <Image src={img2} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
                        <Col>
                            <Row className="font-60 ps-2">Tattoist 2</Row>
                            <Row className="font-45 ps-2">Tattoo Studio</Row>
                        </Col>
                    </div>
                    <div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
                        <span className="tattoo-style-badge mx-1">Blackwork</span>
                        <span className="tattoo-style-badge mx-1">Neo-Tradicional</span>
                        <span className="tattoo-style-badge mx-1">Realism</span>
                        <span className="tattoo-style-badge mx-1">Illustrative</span>
                    </div>
                </div>
                <div className="studio-card m-3">
                    <Row>
                        <Image src={img3} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
                        <Col>
                            <Row className="font-60 ps-2">Tattoist 3</Row>
                            <Row className="font-45 ps-2">Tattoo Studio</Row>
                        </Col>
                    </div>
                    <div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
                        <span className="tattoo-style-badge mx-1">Black &amp; Gray</span>
                        <span className="tattoo-style-badge mx-1">Blackwork</span>
                        <span className="tattoo-style-badge mx-1">Dotwork</span>
                        <span className="tattoo-style-badge mx-1">Fineline</span>
                        <span className="tattoo-style-badge mx-1">Ornamental</span>
                    </div>
                </div>
                <div className="studio-card m-3">
                    <Row>
                        <Image src={img4} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
                        <Col>
                            <Row className="font-60 ps-2">Tattoist 4</Row>
                            <Row className="font-45 ps-2">Tattoo Studio</Row>
                        </Col>
                    </div>
                    <div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
                        <span className="tattoo-style-badge mx-1">Blackwork</span>
                        <span className="tattoo-style-badge mx-1">Fineline</span>
                        <span className="tattoo-style-badge mx-1">Neo-Tradition</span>
                        <span className="tattoo-style-badge mx-1">Illustrative</span>
                        <span className="tattoo-style-badge mx-1">Surrealism</span>
                    </div>
                </div>
                <div className="studio-card m-3">
                    <Row>
                        <Image src={img5} className="studio-card-img" />
                    </Row>
                    <div className="d-flex align-items-center mb-1">
                        <Image src={avatar} className="studio-avatar-img" roundedCircle />
                        <Col>
                            <Row className="font-60 ps-2">Tattoist 5</Row>
                            <Row className="font-45 ps-2">Tattoo Studio</Row>
                        </Col>
                    </div>
                    <div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
                        <span className="tattoo-style-badge mx-1">Blackwork</span>
                        <span className="tattoo-style-badge mx-1">Fineline</span>
                        <span className="tattoo-style-badge mx-1">Neo-Tradition</span>
                        <span className="tattoo-style-badge mx-1">Illustrative</span>
                        <span className="tattoo-style-badge mx-1">Surrealism</span>
                    </div>
                </div> */}
        </div>
    );
}

export default Artists;