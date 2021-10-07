import './AddWorkplaceModal.css';
import { useState, useEffect } from 'react';
// import axios from 'axios';

import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
// import Button from 'react-bootstrap/Button';

import studiosData from './studioData.json';
import avatarPlaceholder from '../../../assets/user_w.png';

const AddWorkplaceModal = ({ show, closeFunction, confirmationFunction}) => {
    const [searchInput, setSearchInput] = useState('');
    const [studios, setSudios] = useState([]);

    useEffect(() => {
        getStudios();
    }, []);

    const getStudios = async () => {
        // const res = await axios.get('/api/studios?search=idAndName');

        // console.log(res);

        // if (res.data) {
        //     console.log(res.data)
        //     setSudios(res.data);
        // } else {
        //     console.log(res.error);
        // }
        setSudios(studiosData);
    }

    const handleFilter = event => {
        const search = event.target.value;
        setSearchInput(search);
    }

    return (
        <Modal centered show={show} onHide={closeFunction}>
            {/* <Modal.Header className="header">
                <Modal.Title>Add workplace</Modal.Title>
            </Modal.Header> */}
            <Modal.Body id="body">
                    <div className="search-input">
                        <label htmlFor="search-input">Add workplace</label>
                        <input id="search-input" type="text" placeholder="Studio name" className="form-control" value={searchInput} onChange={handleFilter} />
                    </div>
                    {
                        studios && 
                        <div className="data-result">
                            { studios.map(studio => <span className="search-item">{studio.name}</span>) }
                        </div>
                    }
            </Modal.Body>
            {/* <Modal.Footer id="footer">
                <Button variant="secondary" onClick={closeFunction}>
                    Cancel
                </Button>
                <Button variant="primary" onClick={confirmationFunction}>
                    Add
                </Button>
            </Modal.Footer> */}
        </Modal>
    );
}

export default AddWorkplaceModal;