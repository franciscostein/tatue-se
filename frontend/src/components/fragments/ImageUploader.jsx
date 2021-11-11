import './ImageUploader.css';
import { Fragment, useState, useEffect, useRef } from 'react';
import Image from 'react-bootstrap/Image';

import avatarPlaceholder from '../../assets/user_w.png';

const ImageUploader = ({ profilePicture }) => {
    const [image, setImage] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const inputFile = useRef(null);

    useEffect(() => {
        console.log(previewSource);
    }, [previewSource]);

    const handleFileInputChange = event => {
        const { files } = event.target;

        if (files && files.length) {
            const file = files[0];
            const fileName = file.name;

            previewFile(file);

            const parts = fileName.split('.');
            const fileType = parts[parts.length - 1];
            console.log('fileType', fileType);

            setImage(file);
        }
    }

    const previewFile = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const onImageClick = () => {
        inputFile.current.click();
    }

    return (
        <Fragment>
            <input 
                type="file" 
                accept="image/*"
                ref={inputFile} 
                onChange={handleFileInputChange} 
            />
            <Image 
                src={profilePicture ?? avatarPlaceholder} 
                className="profile-picture my-4 image-uploader" 
                roundedCircle
                onClick={onImageClick}
            />
        </Fragment>
    );
}

export default ImageUploader;