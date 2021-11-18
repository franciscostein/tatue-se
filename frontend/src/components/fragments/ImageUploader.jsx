import './ImageUploader.css';
import { Fragment, useState, useEffect, useRef } from 'react';
import Image from 'react-bootstrap/Image';

import avatarPlaceholder from '../../assets/user_w.png';

const ImageUploader = ({ profilePicture }) => {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState('');
    const [selectedFile, setSelectedFile] = useState();
    const inputFile = useRef(null);

    useEffect(() => {
        console.log(previewSource);
    }, [previewSource]);

    const handleFileInputChange = event => {
        const { files } = event.target;

        if (files && files.length) {
            const file = files[0];

            previewFile(file);
            setSelectedFile(file);
            setFileInputState(event.target.value);
        }
    }

    const previewFile = file => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onloadend = () => {
            setPreviewSource(reader.result);
        }
    }

    const handleSubmitFile = event => {
        event.preventDefault();

        if (!selectedFile) return;

        const reader = new FileReader();
        reader.readAsDataURL(selectedFile);
        reader.onloadend = () => {
            uploadImage(reader.result);
        }
        reader.onerror = () => {
            console.error('something went very wrong indeed!');
        }
    }

    const uploadImage = async base64EncodedImage => {
        try {
            await fetch('/api/upload', {
                method: 'POST',
                body: JSON.stringify({ base: base64EncodedImage })
            });
            
            setFileInputState('');
            setPreviewSource('');
            console.log('Success!!!');
        } catch (err) {
            console.error(err);
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
            <button className="btn text-white" type="button" onClick={handleSubmitFile}>
                upload!
            </button>
            {
                previewSource && (
                    <img src={previewSource} alt="profile" style={{ height: '300px' }} />
                )
            }
        </Fragment>
    );
}

export default ImageUploader;