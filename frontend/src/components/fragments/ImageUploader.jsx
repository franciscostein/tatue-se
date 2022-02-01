import './ImageUploader.css';
import { Fragment, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';

import { setAlertTimeout } from '../../actions/alert';

import Image from 'react-bootstrap/Image';

import avatarPlaceholder from '../../assets/user_w.png';

const ImageUploader = ({ image, setImageBase64, setAlertTimeout }) => {
    const [fileInput, setFileInput] = useState('');
    const [previewSource, setPreviewSource] = useState(null);
    const inputFile = useRef(null);

    useEffect(() => {
        if (image) setPreviewSource(image);
    }, [image]);

    const handleFileInputChange = event => {
        const { files } = event.target;

        if (files && files.length) {
            if (files[0].size > 9999999) {
                setAlertTimeout('File too large, the maximum size is 10mb.', 'danger');
                return;
            }
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

export default connect(null, { setAlertTimeout })(ImageUploader);