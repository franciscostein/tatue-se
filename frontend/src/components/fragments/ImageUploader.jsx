import './ImageUploader.css';
import { Fragment, useState, useEffect, useRef } from 'react';
import Image from 'react-bootstrap/Image';

import avatarPlaceholder from '../../assets/user_w.png';

const ImageUploader = ({ image, setImageBase64 }) => {
    const [fileInputState, setFileInputState] = useState('');
    const [previewSource, setPreviewSource] = useState(null);
    // const [selectedFile, setSelectedFile] = useState();
    const inputFile = useRef(null);

    useEffect(() => {
        if (image) {
            setPreviewSource(image);
        }
    }, [image]);

    const handleFileInputChange = event => {
        const { files } = event.target;

        if (files && files.length) {
            const file = files[0];

            previewFile(file);
            // setSelectedFile(file);
            setFileInputState(event.target.value);
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

    // const handleSubmitFile = event => {
    //     event.preventDefault();

    //     if (!selectedFile) return;

    //     const reader = new FileReader();
    //     reader.readAsDataURL(selectedFile);
    //     reader.onloadend = () => {
    //         const result = reader.result;
    //         uploadImage(result);
    //     }
    //     reader.onerror = () => {
    //         console.error('something went very wrong indeed!');
    //     }
    // }

    const onImageClick = () => {
        inputFile.current.click();
    }

    return (
        <Fragment>
            <input 
                type="file" 
                accept="image/*"
                ref={inputFile} 
                value={fileInputState}
                onChange={handleFileInputChange} 
            />
            <Image 
                src={previewSource ?? avatarPlaceholder} 
                className="profile-picture my-4 image-uploader" 
                roundedCircle
                onClick={onImageClick}
            />
            {/* <button className="btn text-white" type="button" onClick={handleSubmitFile}>
                upload!
            </button> */}
        </Fragment>
    );
}

export default ImageUploader;