import { useState } from "react";

import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

const ConfirmModal = (headerTitle, bodyText, secondaryButtonText, primaryButtonText) => {
    const [show, setShow] = useState(true);

    // useEffect(() => {
    //     setShow(true);
    // }, []);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return (
        <div>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                    <Modal.Title>{headerTitle}</Modal.Title>
                </Modal.Header>
                <Modal.Body>{bodyText}</Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>{secondaryButtonText}</Button>
                    <Button variant="primary" onClick={handleClose}>{primaryButtonText}</Button>
                </Modal.Footer>
            </Modal>
        </div>
    );
}

export default ConfirmModal;