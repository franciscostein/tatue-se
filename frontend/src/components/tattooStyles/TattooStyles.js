import { useEffect, useState } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import { fetchTattooStyles } from '../../actions/tattooStyles';

import TattooStyle from './tattooStyle/TattooStyle';

const TattooStyles = ({ tattooStyles: { tattooStyles, loading }, fetchTattooStyles, selectedTattooStyles }) => {
    const [localTattooStyles, setLocalTattooStyles] = useState([]);

    useEffect(() => {
        fetchTattooStyles();
        setLocalTattooStyles(tattooStyles);
        selectTattooStyles();
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [fetchTattooStyles, loading, selectedTattooStyles]);

    const selectTattooStyles = () => {
        const newArray = [];
        
        tattooStyles.forEach(tattooStyle => {
            newArray.push({
                ...tattooStyle,
                selected: selectedTattooStyles.some(_id => _id === tattooStyle._id)
            })
        });

        setLocalTattooStyles(newArray);
    }

    return localTattooStyles.map(tattooStyle => <TattooStyle tattooStyle={tattooStyle} />);
}

TattooStyles.propTypes = {
    fetchTattooStyles: PropTypes.func.isRequired,
    tattooStyles: PropTypes.object.isRequired
}

const mapStateToProps = state => ({
    tattooStyles: state.tattooStyles
});

export default connect(mapStateToProps, { fetchTattooStyles })(withRouter(TattooStyles));