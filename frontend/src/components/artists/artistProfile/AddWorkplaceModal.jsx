import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

const AddWorkplaceModal = ({ show, closeFunction, confirmationFunction}) => {
    return (
        <Modal centered show={show} onHide={closeFunction}>
            <Modal.Body>
                Something
            </Modal.Body>
            <Modal.Footer>
                <Button variant="secondary" onClick={closeFunction}>
                    Close
                </Button>
                <Button variant="primary" onClick={confirmationFunction}>
                    Add
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default AddWorkplaceModal;