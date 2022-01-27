import './ImagesModal.css';
import { Fragment } from 'react';

import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { FaTimes } from 'react-icons/fa';

const ImagesModal = ({ show, cover, photos, closeFunction, removeCover, removePhoto }) => {
    return (
        <Modal fullscreen show={show} onHide={closeFunction}>
            <Modal.Header closeButton>
                <Modal.Title>Add photos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Image src={cover} className="add-photos_cover clickable" />
                <FaTimes size={30} className="remove-cover" onClick={removeCover} />
                <hr />
                <div className="d-flex flex-wrap justify-content-center my-3">
                    {
                        photos && photos.map(photo => {
                            return (
                                <Fragment>
                                    <Image key={photo._id} src={photo.publicId} className="m-2 studio-img studio-img-modal clickable" />
                                    <FaTimes size={30} className="remove-photos" onClick={() => removePhoto(photo._id)} />
                                </Fragment>
                            )
                        })
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