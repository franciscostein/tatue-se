import { useEffect } from 'react';
import { connect } from 'react-redux';

import { fetchTattooStyles } from '../../actions/tattooStyles';
import { isEmpty } from '../../utils/arrays';
import TattooStyle from './tattooStyle/TattooStyle';

const TattooStyles = ({
	tattooStyles: { tattooStyles },
	fetchTattooStyles,
	selectedIds,
	onSelectedIds,
}) => {
	useEffect(() => {
		if (isEmpty(tattooStyles)) {
			fetchTattooStyles();
		}
	}, [tattooStyles, fetchTattooStyles]);

	const tattooStyleClickHandler = clickedId => {
		let newSelectedIds = [];

		if (selectedIds.includes(clickedId)) {
			newSelectedIds = selectedIds.filter(id => id !== clickedId);
		} else {
			newSelectedIds = [...selectedIds];
			newSelectedIds.push(clickedId);
		}
		onSelectedIds([...newSelectedIds]);
	};

	return tattooStyles.map(tattooStyle => (
		<TattooStyle
			key={tattooStyle._id}
			tattooStyle={tattooStyle}
			onClick={tattooStyleClickHandler}
			selected={selectedIds.includes(tattooStyle._id)}
		/>
	));
};

const mapStateToProps = state => ({
	tattooStyles: state.tattooStyles,
});

export default connect(mapStateToProps, { fetchTattooStyles })(TattooStyles);
