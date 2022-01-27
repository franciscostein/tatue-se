import './ImagesModal.css';
import { useState, useRef, useEffect } from 'react';

import ImageModal from './ImageModal';

import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import { FaTimes } from 'react-icons/fa';

import add_dark from '../../../assets/add_dark.png';
import add1_dark from '../../../assets/add1_dark.png';

const ImagesModal = ({ show, cover, photos, closeFunction, removeCover, removePhoto }) => {
    const [fileInput, setFileInput] = useState('');
    const [previewSource, setPreviewSource] = useState(null);
    const inputFile = useRef(null);

    useEffect(() => {
        if (cover) setPreviewSource(cover);
    }, [cover]);

    const onImageClick = () => inputFile.current.click();

    const handleFileInputChange = event => {
        const { files } = event.target;

        if (files && files.length) {
            previewFile(files[0]);
            setFileInput(event.target.value);
        }
    }

    const previewFile = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    return (
        <Modal fullscreen show={show} onHide={closeFunction}>
            <Modal.Header closeButton>
                <Modal.Title>Add photos</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <div className="m-2">
                    <input
                        id="image-uploader-input"
                        type="file"
                        accept="image/*"
                        ref={inputFile}
                        value={fileInput}
                        onChange={handleFileInputChange}
                    />
                    <Image src={previewSource || add_dark} className="add-photos_cover clickable" onClick={onImageClick} />
                    {
                        !cover || <FaTimes size={30} className="remove-cover" onClick={removeCover} />
                    }
                </div>
                <hr />
                <div className="d-flex flex-wrap justify-content-center my-3 mx-4">
                    {
                        photos && photos.map(photo => <ImageModal key={photo._id} photo={photo} removePhoto={removePhoto} />)
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