import { useState, useEffect, useRef, Fragment } from 'react';
import { connect } from 'react-redux';

import { setAlertTimeout } from '../../actions/alert';

import Image from 'react-bootstrap/Image';
import { FaTimes } from 'react-icons/fa';

const ImageModal = ({
	photo,
	type,
	onChangePhoto,
	onRemovePhoto,
	setAlertTimeout,
}) => {
	const [fileInput, setFileInput] = useState('');
	const [previewSource, setPreviewSource] = useState(null);
	const inputFile = useRef(null);

	useEffect(() => {
		if (photo) {
			if (type === 'add') {
				setPreviewSource(photo);
			} else {
				setPreviewSource(photo.publicId);
			}
			setFileInput('');
		}
	}, [type, photo]);

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
			setPreviewSource(type === 'add' ? photo : reader.result);
			onChangePhoto(reader.result);
		};
	};

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
			{type !== 'add' && (
				<FaTimes
					size={30}
					className="remove-photos"
					onClick={() => onRemovePhoto(photo._id)}
				/>
			)}
		</Fragment>
	);
};

export default connect(null, { setAlertTimeout })(ImageModal);
