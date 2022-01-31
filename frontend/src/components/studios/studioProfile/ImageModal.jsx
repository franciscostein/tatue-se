import { useState, useEffect, useRef, Fragment } from 'react';

import Image from 'react-bootstrap/Image';
import { FaTimes } from 'react-icons/fa';

const ImageModal = ({ photo, onRemovePhoto }) => {
    const [fileInput, setFileInput] = useState('');
    const [previewSource, setPreviewSource] = useState(null);
    const inputFile = useRef(null);

    useEffect(() => {
        if (photo) setPreviewSource(photo.publicId);
    }, [photo]);

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
        <Fragment>
            <input
                id="image-uploader-input"
                type="file"
                accept="image/*"
                ref={inputFile}
                value={fileInput}
                onChange={handleFileInputChange}
            />
            <Image
                key={photo._id}
                src={previewSource}
                className="m-2 studio-img studio-img-modal clickable"
                onClick={onImageClick}
            />
            <FaTimes 
                size={30}
                className="remove-photos"
                onClick={() => onRemovePhoto(photo._id)}
            />
        </Fragment>
    );
}

export default ImageModal;