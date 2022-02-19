import './StudioProfile.css';
import { useState, useEffect, Fragment } from 'react';
import { connect } from 'react-redux';
import PlacesAutoComplete from 'react-google-autocomplete';

import {
	fetchStudio,
	saveStudio,
	saveStudioImage,
	saveStudioImages,
} from '../../../actions/studio';
import ImageUploader from '../../fragments/ImageUploader';
import Alert from '../../fragments/Alert';
import BusinessHour from '../fragments/BusinessHour';
import ImagesModal from '../../ImagesModal/ImagesModal';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaTrashAlt, FaPlus } from 'react-icons/fa';

const StudioProfile = ({
	studio: { studio },
	user: {
		user: { userId },
	},
	fetchStudio,
	saveStudio,
	saveStudioImage,
	saveStudioImages,
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
	const [showImagesModal, setShowImagesModal] = useState(false);
	const [cover, setCover] = useState('');
	const [photos, setPhotos] = useState([]);

	useEffect(() => {
		if (studio && studio.owner === userId) {
			setFormData({
				name: studio.name,
				email: studio.social.email,
				website: studio.social.website,
				phone: studio.social.phone,
				facebook: studio.social.facebook,
				instagram: studio.social.instagram,
				location: studio.location,
				about: studio.about,
			});
			if (studio.businessHours) setBusinessHours(studio.businessHours);
			if (studio.logo) setLogo(studio.logo.publicId);
			if (studio.cover) setCover(studio.cover.publicId);
			if (studio.photos) setPhotos(studio.photos);
		} else {
			fetchStudio();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [studio]);

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
		saveStudio({
			...formData,
			businessHours,
			social: { email, website, phone, facebook, instagram },
		});
	};

	const selectPlaceHandler = place => {
		const {
			formatted_address,
			geometry: {
				location: { lat, lng },
			},
		} = place;
		setFormData(prevFormData => ({
			...prevFormData,
			location: {
				address: formatted_address,
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
		if (!studio.cover || cover !== studio.cover.publicId) {
			saveStudioImage(cover, 'cover');
		}
		if (photos.some(photo => photo.base64)) {
			saveStudioImages(photos);
		}
	};

	return (
		<Container>
			<Form>
				<div className="d-flex justify-content-between solid-bottom-border-secondary mt-5 mb-4">
					<div>
						<h1>Studio</h1>
					</div>
					<div>
						<Button variant="secondary" className="px-3 mx-2">
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
				{studio && (
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
								onChange={e => onChange(e)}
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
							className="places-autocomplete"
							placeholder="Where it is?"
							apiKey={process.env.REACT_APP_GOOGLE_API_KEY}
							options={{ types: ['address'] }}
							value={location.address}
							onChange={e =>
								setFormData(prevFormData => ({
									...prevFormData,
									location: {
										...location,
										address: e.target.value,
									},
								}))
							}
							onPlaceSelected={selectPlaceHandler}
						/>
					</Form.Group>
				</Row>
				<Row className="mb-3">
					<Form.Group controlId="formStudioAbout">
						<Form.Label className="font-75">About</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
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
				{studio && (
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
					</Fragment>
				)}
				{studio && (
					<Fragment>
						<hr />
						<h3 className="d-flex pt-3 mb-3">Delete account</h3>
						<p className="font-55">
							Deleting your tatue-se account will permanently
							remove your profile, along with all data you have
							produced while on tatue-se, including permanent
							removal of photos, comments, saved boards, workplace
							history, and subscription and billing info, booking
							history, your account information and settings.
						</p>
						<Button variant="danger" className="d-flex mt-4 mb-5">
							<FaTrashAlt size={19} />
							<span className="ps-2">Delete my account</span>
						</Button>
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
})(StudioProfile);
