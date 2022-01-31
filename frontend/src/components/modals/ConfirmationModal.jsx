import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const ConfirmationModal = ({
    centered = false,
    show,
    onClose,
    title,
    titleColor,
    bodyText,
    bodyColor,
    declineVariant = 'secondary', 
    declineFunction = onClose, 
    declineText = 'No', 
    acceptVariant = 'primary', 
    acceptFunction, 
    acceptText = 'Yes' 
}) => {
    return  (
        <Modal centered={centered} show={show} onHide={onClose}>
            {
                title ?
                    <Modal.Header>
                        <Modal.Title className={titleColor}>{title}</Modal.Title>
                    </Modal.Header>
                : null
            }
            {
                bodyText ?
                    <Modal.Body className={bodyColor}>{bodyText}</Modal.Body>
                : null
            }
            <Modal.Footer className={!title && !bodyText ? 'd-flex justify-content-center' : ''}>
                <Button variant={declineVariant} onClick={declineFunction}>
                    {declineText}
                </Button>
                <Button variant={acceptVariant} onClick={acceptFunction}>
                    {acceptText}
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default ConfirmationModal;