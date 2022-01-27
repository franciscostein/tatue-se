import './ImageUploader.css';
import { Fragment, useState, useEffect, useRef } from 'react';
import Image from 'react-bootstrap/Image';

import avatarPlaceholder from '../../assets/user_w.png';

const ImageUploader = ({ image, setImageBase64 }) => {
    const [fileInput, setFileInput] = useState('');
    const [previewSource, setPreviewSource] = useState(null);
    const inputFile = useRef(null);

    useEffect(() => {
        if (image) setPreviewSource(image);
    }, [image]);

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
            setImageBase64(reader.result);
        }
    }

    const onImageClick = () => inputFile.current.click();

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
                src={previewSource ?? avatarPlaceholder} 
                className="profile-picture my-4 image-uploader" 
                roundedCircle
                onClick={onImageClick}
            />
        </Fragment>
    );
}

export default ImageUploader;