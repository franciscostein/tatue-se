import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';

const ImagesModal = ({ show, closeFunction, cover, photos }) => {
    return (
        <Modal fullscreen show={show} onHide={closeFunction}>
            <Modal.Header closeButton>
                <Modal.Title>Add photos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image src={cover} style={{ width: '100%', height: '27vh', objectFit: 'cover', borderRadius: '16px' }} className="clickable" />
                <hr />
                <div className="d-flex flex-wrap justify-content-center my-3">
                    {
                        photos && photos.map(photo => <Image key={photo._id} src={photo.publicId} className="m-2 studio-img studio-img-modal clickable" />)
                    }
                </div>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="dark" onClick={closeFunction}>Cancel</Button>
                <Button variant="dark">Save</Button>
            </Modal.Footer>
        </Modal>
    );  
}

export default ImagesModal;