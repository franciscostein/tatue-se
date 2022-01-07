import { connect } from 'react-redux';

import Alert from 'react-bootstrap/Alert';
import { FaCheckSquare, FaExclamationTriangle } from 'react-icons/fa';

const AlertComponent = ({ alert: { message, variant, showAlert }}) => {
    return showAlert && (
        <Alert variant={variant} className="m-3">
            { variant === 'success' ? <FaCheckSquare /> : <FaExclamationTriangle /> }
            <span className="font-80 ms-3">{message}</span>
        </Alert>
    );
}

const mapStateToProps = state => ({
    alert: state.alert
});

export default connect(mapStateToProps, {})(AlertComponent);