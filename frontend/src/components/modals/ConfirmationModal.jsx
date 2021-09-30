import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmationModal = ({ show, closeFunction, confirmationFunction }) => {
    return  (
        <Modal show={show} onHide={closeFunction}>
            <Modal.Header>
                <Modal.Title>Remove?</Modal.Title>
            </Modal.Header>
            <Modal.Body>Are you sure?</Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeFunction}>No</Button>
                <Button variant="primary" onClick={confirmationFunction}>Yes</Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;