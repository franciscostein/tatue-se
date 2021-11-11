import { Fragment, useState, useRef } from 'react';
import Image from 'react-bootstrap/Image';

import avatarPlaceholder from '../../assets/user_w.png';

const ImageUploader = ({ profilePicture }) => {
    const [image, setImage] = useState('');
    const inputFile = useRef(null);

    const handleFileUpload = event => {
        const { files } = event.target;

        if (files && files.length) {
            const fileName = files[0].name;

            const parts = fileName.split('.');
            const fileType = parts[parts.length - 1];
            console.log('fileType', fileType);

            setImage(files[0]);
        }
    }

    const onImageClick = () => {
        inputFile.current.click();
    }

    return (
        <Fragment>
            <input 
                type="file" 
                style={{ display: 'none' }} 
                accept="image/*"
                ref={inputFile} 
                onChange={handleFileUpload} 
            />
            <Image 
                src={profilePicture ?? avatarPlaceholder} 
                className="profile-picture my-4" 
                roundedCircle
                onClick={onImageClick}
            />
        </Fragment>
    );
}

export default ImageUploader;