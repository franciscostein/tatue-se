import './AddWorkplaceModal.css';
import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';

import { fetchStudios } from '../../../actions/studio';
import { isEmpty, isNotEmpty } from '../../../utils/arrays';
import SearchResultStudio from './SearchResultStudio';

import Modal from 'react-bootstrap/Modal';

const AddWorkplaceModal = ({
	studio: { studios },
	fetchStudios,
	show,
	onClose,
	addWorkplace,
	selectedWorplaces,
}) => {
	const [searchInput, setSearchInput] = useState('');
	const [filteredStudios, setFilteredStudios] = useState([]);
	const [error, setError] = useState(false);

	useEffect(() => {
		if (isEmpty(studios)) {
			fetchStudios('idNameLogoAddress');
		} else {
			setSearchInput('');
			setFilteredStudios(filterSelectedStudios(studios));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [studios, selectedWorplaces]);

	const filterSelectedStudios = studios => {
		if (isNotEmpty(studios)) {
			return studios.filter(
				studio =>
					!selectedWorplaces.some(
						selected => selected._id === studio._id
					)
			);
		} else {
			setError(true);
		}
	};

	const handleFilter = event => {
		if (isNotEmpty(studios)) {
			const search = event.target.value;
			setSearchInput(search);

			const newFilter = studios.filter(studio =>
				studio.name.toLowerCase().includes(search.toLowerCase())
			);

			if (search === '') {
				setFilteredStudios([]);
			} else {
				setFilteredStudios(filterSelectedStudios(newFilter));
			}
		} else {
			setError(true);
		}
	};

	const handleSearchClick = studio => {
		addWorkplace(studio);
	};

	return (
		<Modal centered show={show} onHide={onClose}>
			<Modal.Body id="body">
				{error ? (
					<h1 className="text-danger">
						Error, please try again later.
					</h1>
				) : (
					<Fragment>
						<div className="search-input">
							<label htmlFor="search-input">Add workplace</label>
							<input
								id="search-input"
								type="text"
								placeholder="Studio name"
								className="form-control"
								value={searchInput}
								onChange={handleFilter}
							/>
						</div>
						{filteredStudios && (
							<div className="data-result">
								{filteredStudios.slice(0, 13).map(studio => (
									<SearchResultStudio
										studio={studio}
										onClick={() =>
											handleSearchClick(studio)
										}
									/>
								))}
							</div>
						)}
					</Fragment>
				)}
			</Modal.Body>
		</Modal>
	);
};

const mapStateToProps = state => ({
	studio: state.studio,
});

export default connect(mapStateToProps, { fetchStudios })(AddWorkplaceModal);
