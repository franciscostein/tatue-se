import './ImagesModal.css';
import { Fragment } from 'react';

import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { FaTimes } from 'react-icons/fa';

import add_dark from '../../../assets/add_dark.png';
import add_light from '../../../assets/add_light.png';
import add1_dark from '../../../assets/add1_dark.png';
import add1_light from '../../../assets/add1_light.png';

const ImagesModal = ({ show, cover, photos, closeFunction, removeCover, removePhoto }) => {
    return (
        <Modal fullscreen show={show} onHide={closeFunction}>
            <Modal.Header closeButton>
                <Modal.Title>Add photos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="m-2">
                    <Image src={add_dark || cover} className="add-photos_cover clickable" />
                    <FaTimes size={30} className="remove-cover" onClick={removeCover} />
                </div>
                <hr />
                <div className="d-flex flex-wrap justify-content-center my-3 mx-4">
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
                    {
                        photos.length < 7 && <Image src={add1_dark} className="m-2 studio-img studio-img-modal clickable" />
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