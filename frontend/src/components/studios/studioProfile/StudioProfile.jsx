import { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PlacesAutoComplete from 'react-google-autocomplete';

import {
	fetchStudio,
	saveStudio,
	saveStudioImage,
	saveStudioImages,
	deleteStudio,
} from '../../../actions/studio';
import { findLocation } from '../../../utils/location';
import { setAlertTimeout } from '../../../actions/alert';
import ImageUploader from '../../fragments/ImageUploader';
import Alert from '../../fragments/Alert';
import BusinessHour from '../fragments/BusinessHour';
import ImagesModal from '../../ImagesModal/ImagesModal';
import ConfirmationModal from '../../modals/ConfirmationModal';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import TextArea from 'react-textarea-autosize';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';

const StudioProfile = ({
	studio: { profile },
	user: {
		user: { userId },
	},
	history,
	fetchStudio,
	saveStudio,
	saveStudioImage,
	saveStudioImages,
	deleteStudio,
	setAlertTimeout,
}) => {
	const [formData, setFormData] = useState({
		name: '',
		email: '',
		website: '',
		phone: '',
		facebook: '',
		instagram: '',
		location: {
			address: '',
			city: '',
			region: '',
			country: '',
			latitude: '0',
			longitude: '0',
		},
		about: '',
	});
	const [businessHours, setBusinessHours] = useState({
		monday: { opens: '', closes: '', isOpen: false },
		tuesday: { opens: '', closes: '', isOpen: false },
		wednesday: { opens: '', closes: '', isOpen: false },
		thursday: { opens: '', closes: '', isOpen: false },
		friday: { opens: '', closes: '', isOpen: false },
		saturday: { opens: '', closes: '', isOpen: false },
		sunday: { opens: '', closes: '', isOpen: false },
	});
	const [logo, setLogo] = useState('');
	const [cover, setCover] = useState('');
	const [photos, setPhotos] = useState([]);
	const [showImagesModal, setShowImagesModal] = useState(false);
	const [showDeleteProfileModal, setShowDeleteProfileModal] = useState(false);
	const [isNameInvalid, setIsNameInvalid] = useState(false);
	const [isAddressInvalid, setIsAddressInvalid] = useState(false);

	useEffect(() => {
		if (!profile || profile.owner !== userId) {
			fetchStudio();
		} else {
			setFormData({
				name: profile.name,
				email: profile.social.email,
				website: profile.social.website,
				phone: profile.social.phone,
				facebook: profile.social.facebook,
				instagram: profile.social.instagram,
				location: profile.location,
				about: profile.about,
			});
			if (profile.businessHours) setBusinessHours(profile.businessHours);
			if (profile.logo) setLogo(profile.logo.publicId);
			if (profile.cover) setCover(profile.cover.publicId);
			if (profile.photos) setPhotos(profile.photos);
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profile]);

	const {
		name,
		email,
		website,
		phone,
		facebook,
		instagram,
		location,
		about,
	} = formData;

	const onChange = e =>
		setFormData(prevFormData => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}));

	const saveHandler = () => {
		if (validate()) {
			saveStudio({
				...formData,
				businessHours,
				social: { email, website, phone, facebook, instagram },
			});
			setIsNameInvalid(false);
			setIsAddressInvalid(false);
		}
	};

	const validate = () => {
		let isValid = true;

		if (name.trim() === '') {
			setIsNameInvalid(true);
			setAlertTimeout('Name is required', 'danger');
			isValid = false;
		}
		if (location.address.trim() === '' || location.city === '') {
			setIsAddressInvalid(true);
			setAlertTimeout(
				'Address is required, enter and select it',
				'danger'
			);
			isValid = false;
		}
		return isValid;
	};

	const selectPlaceHandler = place => {
		const {
			formatted_address,
			address_components,
			geometry: {
				location: { lat, lng },
			},
		} = place;
		const { city, region, country } = findLocation(address_components);

		setFormData(prevFormData => ({
			...prevFormData,
			location: {
				address: formatted_address,
				city,
				region,
				country,
				latitude: lat(),
				longitude: lng(),
			},
		}));
	};

	const addPhotoHandler = base64 => {
		setPhotos(prevPhotos => [
			...prevPhotos,
			{
				publicId: base64,
				base64,
			},
		]);
	};

	const removePhotoHandler = photoId => {
		const filteredPhotos = photos.filter(photo => photo._id !== photoId);
		setPhotos(filteredPhotos);
	};

	const changePhotoHandler = (photoId, base64) => {
		const newPhotos = photos.map(photo => {
			if (photo._id === photoId) {
				photo.base64 = base64;
			}
			return photo;
		});
		setPhotos(newPhotos);
	};

	const savePhotosHandler = () => {
		if (!profile.cover || cover !== profile.cover.publicId) {
			saveStudioImage(cover, 'cover');
		}
		if (photos.some(photo => photo.base64)) {
			saveStudioImages(photos);
		}
	};

	const nameChangeHandler = event => {
		onChange(event);
		setIsNameInvalid(false);
	};

	const addressChangeHandler = event => {
		setFormData(prevFormData => ({
			...prevFormData,
			location: {
				...location,
				address: event.target.value,
			},
		}));
		setIsAddressInvalid(false);
	};

	return (
		<Container>
			<Form>
				<div className="d-flex justify-content-between solid-bottom-border-secondary mt-5 mb-4">
					<div>
						<h1>Studio</h1>
					</div>
					<div>
						<Button
							variant="secondary"
							className="px-3 mx-2"
							onClick={() => history.goBack()}
						>
							Cancel
						</Button>
						<Button
							variant="dark"
							className="px-3 mx-2"
							onClick={saveHandler}
						>
							Save
						</Button>
					</div>
				</div>
				<Alert />
				{profile && (
					<ImageUploader
						buttonText="Save logo"
						image={logo}
						onImageChange={imageBase64 => setLogo(imageBase64)}
						onSave={() => saveStudioImage(logo, 'logo')}
					/>
				)}
				<Row className="my-3">
					<Col>
						<Form.Group controlId="formStudioName">
							<Form.Label className="font-75">Name</Form.Label>
							<Form.Control
								type="text"
								placeholder="Name"
								name="name"
								value={name}
								onChange={nameChangeHandler}
								isInvalid={isNameInvalid}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formStudioEmail">
							<Form.Label className="font-75">Email</Form.Label>
							<Form.Control
								type="email"
								placeholder="example@email.com"
								name="email"
								value={email}
								onChange={e => onChange(e)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row className="mb-3">
					<Col>
						<Form.Group controlId="formStudioWebsite">
							<Form.Label className="font-75">Website</Form.Label>
							<Form.Control
								type="text"
								placeholder="example.com"
								name="website"
								value={website}
								onChange={e => onChange(e)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formStudioPhone">
							<Form.Label className="font-75">Phone</Form.Label>
							<Form.Control
								type="tel"
								placeholder="Phone number"
								name="phone"
								value={phone}
								onChange={e => onChange(e)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row className="mb-3">
					<Col>
						<Form.Group controlId="formStudioFacebook">
							<Form.Label className="font-75">
								Facebook
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="Facebook"
								name="facebook"
								value={facebook}
								onChange={e => onChange(e)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formStudioInstagram">
							<Form.Label className="font-75">
								Instagram
							</Form.Label>
							<Form.Control
								type="tel"
								placeholder="Instagram"
								name="instagram"
								value={instagram}
								onChange={e => onChange(e)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row className="mb-3">
					<Form.Group controlId="formStudioLocation">
						<Form.Label className="font-75">Address</Form.Label>
						<PlacesAutoComplete
							className={
								isAddressInvalid
									? 'form-control is-invalid'
									: 'form-control'
							}
							placeholder="Where it is?"
							apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
							options={{ types: ['address'] }}
							value={location.address}
							onChange={addressChangeHandler}
							onPlaceSelected={selectPlaceHandler}
						/>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group controlId="formStudioAbout">
						<Form.Label className="font-75">About</Form.Label>
						<TextArea
							className="form-control"
							name="about"
							value={about}
							onChange={e => onChange(e)}
						/>
					</Form.Group>
				</Row>
				<div className="d-flex solid-bottom-border-secondary mt-5 mb-3">
					<h3>Business hours</h3>
				</div>
				<BusinessHour
					weekday="Monday"
					day={businessHours.monday}
					setChecked={value =>
						setBusinessHours({
							...businessHours,
							monday: {
								...businessHours.monday,
								isOpen: value,
							},
						})
					}
					onChangeOpen={e =>
						setBusinessHours({
							...businessHours,
							monday: {
								...businessHours.monday,
								opens: e.target.value,
							},
						})
					}
					onChangeClose={e =>
						setBusinessHours({
							...businessHours,
							monday: {
								...businessHours.monday,
								closes: e.target.value,
							},
						})
					}
				/>
				<BusinessHour
					weekday="Tuesday"
					day={businessHours.tuesday}
					setChecked={value =>
						setBusinessHours({
							...businessHours,
							tuesday: {
								...businessHours.tuesday,
								isOpen: value,
							},
						})
					}
					onChangeOpen={e =>
						setBusinessHours({
							...businessHours,
							tuesday: {
								...businessHours.tuesday,
								opens: e.target.value,
							},
						})
					}
					onChangeClose={e =>
						setBusinessHours({
							...businessHours,
							tuesday: {
								...businessHours.tuesday,
								closes: e.target.value,
							},
						})
					}
				/>
				<BusinessHour
					weekday="Wednesday"
					day={businessHours.wednesday}
					setChecked={value =>
						setBusinessHours({
							...businessHours,
							wednesday: {
								...businessHours.wednesday,
								isOpen: value,
							},
						})
					}
					onChangeOpen={e =>
						setBusinessHours({
							...businessHours,
							wednesday: {
								...businessHours.wednesday,
								opens: e.target.value,
							},
						})
					}
					onChangeClose={e =>
						setBusinessHours({
							...businessHours,
							wednesday: {
								...businessHours.wednesday,
								closes: e.target.value,
							},
						})
					}
				/>
				<BusinessHour
					weekday="Thursday"
					day={businessHours.thursday}
					setChecked={value =>
						setBusinessHours({
							...businessHours,
							thursday: {
								...businessHours.thursday,
								isOpen: value,
							},
						})
					}
					onChangeOpen={e =>
						setBusinessHours({
							...businessHours,
							thursday: {
								...businessHours.thursday,
								opens: e.target.value,
							},
						})
					}
					onChangeClose={e =>
						setBusinessHours({
							...businessHours,
							thursday: {
								...businessHours.thursday,
								closes: e.target.value,
							},
						})
					}
				/>
				<BusinessHour
					weekday="Friday"
					day={businessHours.friday}
					setChecked={value =>
						setBusinessHours({
							...businessHours,
							friday: {
								...businessHours.friday,
								isOpen: value,
							},
						})
					}
					onChangeOpen={e =>
						setBusinessHours({
							...businessHours,
							friday: {
								...businessHours.friday,
								opens: e.target.value,
							},
						})
					}
					onChangeClose={e =>
						setBusinessHours({
							...businessHours,
							friday: {
								...businessHours.friday,
								closes: e.target.value,
							},
						})
					}
				/>
				<BusinessHour
					weekday="Saturday"
					day={businessHours.saturday}
					setChecked={value =>
						setBusinessHours({
							...businessHours,
							saturday: {
								...businessHours.saturday,
								isOpen: value,
							},
						})
					}
					onChangeOpen={e =>
						setBusinessHours({
							...businessHours,
							saturday: {
								...businessHours.saturday,
								opens: e.target.value,
							},
						})
					}
					onChangeClose={e =>
						setBusinessHours({
							...businessHours,
							saturday: {
								...businessHours.saturday,
								closes: e.target.value,
							},
						})
					}
				/>
				<BusinessHour
					weekday="Sunday"
					day={businessHours.sunday}
					setChecked={value =>
						setBusinessHours({
							...businessHours,
							sunday: {
								...businessHours.sunday,
								isOpen: value,
							},
						})
					}
					onChangeOpen={e =>
						setBusinessHours({
							...businessHours,
							sunday: {
								...businessHours.sunday,
								opens: e.target.value,
							},
						})
					}
					onChangeClose={e =>
						setBusinessHours({
							...businessHours,
							sunday: {
								...businessHours.sunday,
								closes: e.target.value,
							},
						})
					}
				/>
				{profile && (
					<Fragment>
						<hr />
						<div className="d-flex justify-content-between align-items-center mt-5 pb-4">
							<div>
								<h3>Photos</h3>
							</div>
							<div>
								<Button
									variant="dark"
									onClick={() => setShowImagesModal(true)}
								>
									<FaPlus size={23} />
								</Button>
							</div>
							<ImagesModal
								show={showImagesModal}
								cover={cover}
								photos={photos}
								photosLimit={7}
								onClose={() => setShowImagesModal(false)}
								onAddPhoto={addPhotoHandler}
								onRemovePhoto={removePhotoHandler}
								onChangeCover={setCover}
								onChangePhoto={changePhotoHandler}
								onSave={savePhotosHandler}
							/>
						</div>
						<hr />
						<h3 className="d-flex pt-3 mb-3">Delete profile</h3>
						<p className="font-55">
							Deleting your tatue-se profile will permanently
							remove it, along with all data you have produced
							while on tatue-se, including permanent removal of
							photos, your profile information and settings.
						</p>
						<Button
							variant="danger"
							className="d-flex mt-4 mb-5"
							onClick={() => setShowDeleteProfileModal(true)}
						>
							<FaTrashAlt size={19} />
							<span className="ps-2">Delete my profile</span>
						</Button>
						<ConfirmationModal
							show={showDeleteProfileModal}
							onClose={() => setShowDeleteProfileModal(false)}
							title="Delete profile"
							titleColor="text-danger"
							bodyText="Are you sure? It can't be undone!"
							declineText="Cancel"
							acceptVariant="danger"
							onAccept={() => deleteStudio(history)}
							acceptText="Yes, delete it"
						/>
					</Fragment>
				)}
			</Form>
		</Container>
	);
};

const mapStateToProps = state => ({
	studio: state.studio,
	user: state.user,
});

export default connect(mapStateToProps, {
	fetchStudio,
	saveStudio,
	saveStudioImage,
	saveStudioImages,
	deleteStudio,
	setAlertTimeout,
})(withRouter(StudioProfile));
