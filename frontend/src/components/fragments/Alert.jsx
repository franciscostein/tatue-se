import { connect } from 'react-redux';

import Alert from 'react-bootstrap/Alert';

const AlertComponent = ({ alert: { message, variant, showAlert }}) => {
    return showAlert && (
        <Alert variant={variant} className="m-3">
            {message}
        </Alert>
    );
}

const mapStateToProps = state => ({
    alert: state.alert
});

export default connect(mapStateToProps, {})(AlertComponent);