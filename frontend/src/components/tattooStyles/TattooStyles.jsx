import { useEffect, useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchTattooStyles } from '../../actions/tattooStyles';
import TattooStyle from './tattooStyle/TattooStyle';

const TattooStyles = ({
	tattooStyles: { tattooStyles, loading },
	fetchTattooStyles,
	selectedTattooStylesIds,
	onSelect,
}) => {
	const [localTattooStyles, setLocalTattooStyles] = useState([]);

	useEffect(() => {
		if (tattooStyles.length === 0) {
			fetchTattooStyles();
		} else {
			setLocalTattooStyles(tattooStyles);

			if (selectedTattooStylesIds) selectTattooStyles();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loading, selectedTattooStylesIds]);

	const selectTattooStyles = () => {
		const newArray = [];

		tattooStyles.forEach(tattooStyle => {
			newArray.push({
				...tattooStyle,
				selected: selectedTattooStylesIds.some(
					_id => _id === tattooStyle._id
				),
			});
		});
		setLocalTattooStyles(newArray);
	};

	const handleTattooStyleClick = tattooStyleId => {
		if (selectedTattooStylesIds.some(_id => _id === tattooStyleId)) {
			selectedTattooStylesIds.splice(
				selectedTattooStylesIds.indexOf(tattooStyleId),
				1
			);
		} else {
			selectedTattooStylesIds.push(tattooStyleId);
		}
		selectTattooStyles();
		onSelect();
	};

	return localTattooStyles.map(tattooStyle => (
		<TattooStyle
			key={tattooStyle._id}
			tattooStyle={tattooStyle}
			onClick={handleTattooStyleClick}
		/>
	));
};

TattooStyles.propTypes = {
	fetchTattooStyles: PropTypes.func.isRequired,
	tattooStyles: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	tattooStyles: state.tattooStyles,
});

export default connect(mapStateToProps, { fetchTattooStyles })(TattooStyles);
