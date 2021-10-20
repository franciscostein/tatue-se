import './AddWorkplaceModal.css';
import { useState, useEffect } from 'react';
// import axios from 'axios';

import Modal from 'react-bootstrap/Modal';

import SearchResultStudio from './SearchResultStudio';

import studiosData from './studioData.json';

const AddWorkplaceModal = ({ show, closeFunction, addWorkplace, selectedWorplaces }) => {
    const [searchInput, setSearchInput] = useState('');
    const [studios, setStudios] = useState([]);
    const [filteredStudios, setFilteredStudios] = useState([]);

    useEffect(() => {
        getStudios();
    }, [addWorkplace, selectedWorplaces]);

    const getStudios = async () => {
        // const res = await axios.get('/api/studios?search=idAndName');

        // console.log(res);

        // if (res.data) {
        //     console.log(res.data)
        //     setSudios(res.data);
        // } else {
        //     console.log(res.error);
        // }
        setSearchInput('');
        setStudios(studiosData);
        setFilteredStudios(filterSelectedStudios(studios));
    }

    const filterSelectedStudios = studios => studios.filter(studio => !selectedWorplaces.some(selected => selected._id === studio._id));

    const handleFilter = event => {
        const search = event.target.value;
        setSearchInput(search);

        const newFilter = studios.filter(studio => studio.name.toLowerCase().includes(search.toLowerCase()));

        if (search === '') {
            setFilteredStudios([]);
        } else {
            setFilteredStudios(filterSelectedStudios(newFilter));
        }
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
                        filteredStudios && 
                        <div className="data-result">
                            { filteredStudios.slice(0, 13).map(studio => <SearchResultStudio studio={studio} onClick={() => handleSearchClick(studio)} />) }
                        </div>
                    }
            </Modal.Body>
        </Modal>
    );
}

export default AddWorkplaceModal;