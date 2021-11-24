import './AddWorkplaceModal.css';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import Modal from 'react-bootstrap/Modal';

import SearchResultStudio from './SearchResultStudio';

// import studiosData from './studioData.json';

const AddWorkplaceModal = ({ show, closeFunction, addWorkplace, selectedWorplaces }) => {
    const [searchInput, setSearchInput] = useState('');
    const [studios, setStudios] = useState([]);
    const [filteredStudios, setFilteredStudios] = useState([]);
    const [error, setError] = useState(false);

    useEffect(() => {
        getStudios();
    }, [selectedWorplaces]);

    const getStudios = async () => {
        const res = await axios.get('/api/studios?search=idNameLogoAddress');

        console.log('data', res.data);

        if (res.data) {
            setStudios(res.data);
            setError(false);
        } else {
            setError(true);
            console.log(res.error);
        }

        setSearchInput('');
        setFilteredStudios(filterSelectedStudios(studios));
    }

    const filterSelectedStudios = studios => {
        if (studios.length > 0) {
            return studios.filter(studio => !selectedWorplaces.some(selected => selected._id === studio._id));
        } else {
            setError(true);
        }
    }

    const handleFilter = event => {
        if (studios.length > 0) {
            const search = event.target.value;
            setSearchInput(search);

            const newFilter = studios.filter(studio => studio.name.toLowerCase().includes(search.toLowerCase()));

            if (search === '') {
                setFilteredStudios([]);
            } else {
                setFilteredStudios(filterSelectedStudios(newFilter));
            }
        } else {
            setError(true);
        }
    }

    const handleSearchClick = studio => {
        addWorkplace(studio);
    }

    return (
        <Modal centered show={show} onHide={closeFunction}>
            <Modal.Body id="body">
                    { error ?
                        <h1 className="text-danger">Error, please try again later.</h1>
                        :
                        <Fragment>
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
                        </Fragment>
                    }
            </Modal.Body>
        </Modal>
    );
}

export default AddWorkplaceModal;