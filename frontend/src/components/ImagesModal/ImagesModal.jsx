import './ImagesModal.css';
import { useState, useRef, useEffect } from 'react';
import { connect } from 'react-redux';

import ImageModal from './ImageModal';
import { setAlertTimeout } from '../../actions/alert';

import Modal from 'react-bootstrap/Modal';
import Image from 'react-bootstrap/Image';
import Button from 'react-bootstrap/Button';
import Alert from '../fragments/Alert';
import { FaTimes } from 'react-icons/fa';

import add_dark from '../../assets/add_dark.png';
import add1_dark from '../../assets/add1_dark.png';

const ImagesModal = ({
	show,
	cover,
	photos,
	photosLimit,
	onClose,
	onRemovePhoto,
	onAddPhoto,
	onChangePhoto,
	onChangeCover,
	onSave,
	setAlertTimeout,
}) => {
	const [fileInput, setFileInput] = useState('');
	const [previewSource, setPreviewSource] = useState(null);
	const inputFile = useRef(null);

	useEffect(() => {
		setPreviewSource(cover);
	}, [cover, photos]);

	const onImageClick = () => inputFile.current.click();

	const handleFileInputChange = event => {
		const { files } = event.target;

		if (files && files.length) {
			if (files[0].size > 9999999) {
				setAlertTimeout(
					'File too large, the maximum size is 10mb.',
					'danger'
				);
				return;
			}
			previewFile(files[0]);
			setFileInput(event.target.value);
		}
	};

	const previewFile = file => {
		const reader = new FileReader();
		reader.readAsDataURL(file);
		reader.onloadend = () => {
			setPreviewSource(reader.result);
			onChangeCover(reader.result);
		};
	};

	return (
		<Modal id="parent" fullscreen show={show} onHide={onClose}>
			<Modal.Header closeButton>
				<Modal.Title>Add photos</Modal.Title>
			</Modal.Header>
			<Modal.Body id="child">
				<Alert />
				<div className="m-2">
					<input
						id="image-uploader-input"
						type="file"
						accept="image/*"
						ref={inputFile}
						value={fileInput}
						onChange={handleFileInputChange}
					/>
					<Image
						src={previewSource || add_dark}
						className="add-photos_cover clickable"
						onClick={onImageClick}
					/>
					{cover && (
						<FaTimes
							size={30}
							className="remove-cover"
							onClick={() => onChangeCover(null)}
						/>
					)}
				</div>
				<hr />
				<div className="d-flex flex-wrap justify-content-center my-3 mx-4">
					{photos &&
						photos.map((photo, index) => (
							<ImageModal
								key={photo._id || index}
								photo={photo}
								onRemovePhoto={onRemovePhoto}
								onChangePhoto={image64 =>
									onChangePhoto(photo._id, image64)
								}
							/>
						))}
					{photos.length < photosLimit && (
						<ImageModal
							photo={add1_dark}
							type="add"
							onChangePhoto={onAddPhoto}
						/>
					)}
				</div>
			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={onClose}>
					Cancel
				</Button>
				<Button variant="dark" onClick={onSave}>
					Save
				</Button>
			</Modal.Footer>
		</Modal>
	);
};

export default connect(null, { setAlertTimeout })(ImagesModal);
