import './AddWorkplaceModal.css';
import { useState, useEffect } from 'react';
// import axios from 'axios';

import Modal from 'react-bootstrap/Modal';

import SearchResultStudio from './SearchResultStudio';

import studiosData from './studioData.json';

const AddWorkplaceModal = ({ show, closeFunction, addWorkplace, selectedWorplaces }) => {
    const [searchInput, setSearchInput] = useState('');
    const [studios, setSudios] = useState([]);

    useEffect(() => {
        getStudios();
    }, [selectedWorplaces]);

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

        const newArray = studios.filter(studio => !selectedWorplaces.some(selected => selected._id === studio._id));

        setSudios(newArray);
    }

    const handleFilter = event => {
        const search = event.target.value;
        setSearchInput(search);
    }

    const handleSearchClick = studio => {
        addWorkplace(studio);
    }

    return (
        <Modal centered show={show} onHide={closeFunction}>
            <Modal.Body id="body">
                    <div className="search-input">
                        <label htmlFor="search-input">Add workplace</label>
                        <input id="search-input" type="text" placeholder="Studio name" className="form-control" value={searchInput} onChange={handleFilter} />
                    </div>
                    {
                        studios && 
                        <div className="data-result">
                            { studios.map(studio => <SearchResultStudio studio={studio} onClick={() => handleSearchClick(studio)} />) }
                        </div>
                    }
            </Modal.Body>
        </Modal>
    );
}

export default AddWorkplaceModal;