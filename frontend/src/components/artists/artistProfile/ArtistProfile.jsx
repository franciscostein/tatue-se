import { useState, useEffect, Fragment } from 'react';
import { withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
	fetchArtistProfile,
	saveProfile,
	saveArtistImage,
	saveArtistPortfolio,
	deleteArtist,
} from '../../../actions/artist';

import StudioMiniCard from '../../studios/fragments/StudioMiniCard';
import ConfirmationModal from '../../modals/ConfirmationModal';
import AddWorkplaceModal from './AddWorkplaceModal';
import TattooStyles from '../../tattooStyles/TattooStyles';
import ImageUploader from '../../fragments/ImageUploader';
import Alert from '../../fragments/Alert';
import ImagesModal from '../../ImagesModal/ImagesModal';
import CurrencySelect from '../fragments/CurrencySelect';

import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { FaPlus, FaTrashAlt } from 'react-icons/fa';

const ArtistProfile = ({
	artist: { profile },
	user: {
		user: { userId },
	},
	history,
	fetchArtistProfile,
	saveProfile,
	saveArtistImage,
	saveArtistPortfolio,
	deleteArtist,
}) => {
	const [formData, setFormData] = useState({
		fullName: '',
		biography: '',
		workplaces: [],
		tattooStyles: [],
		portfolio: [],
		facebook: '',
		instagram: '',
		website: '',
		phone: '',
		email: '',
		hourRate: '',
		minRate: '',
		currency: '',
	});
	const [profilePicture, setProfilePicture] = useState('');
	const [cover, setCover] = useState('');
	const [portfolio, setPortfolio] = useState([]);
	const [showAddWorkplaceModal, setShowAddWorkplaceModal] = useState(false);
	const [showRemoveWorkplaceModal, setShowRemoveWorkplaceModal] =
		useState(false);
	const [showDeleteAccountModal, setShowDeleteAccountModal] = useState(false);
	const [showImagesModal, setShowImagesModal] = useState(false);
	const [idToRemove, setIdToRemove] = useState('');

	useEffect(() => {
		if (profile && profile.user === userId) {
			setFormData({
				fullName: profile.fullName,
				biography: profile.biography,
				workplaces: profile.workplaces,
				tattooStyles: profile.tattooStyles,
				facebook: profile.social.facebook,
				instagram: profile.social.instagram,
				website: profile.social.website,
				phone: profile.social.phone,
				email: profile.social.email,
				hourRate:
					profile.pricing && profile.pricing.hourRate
						? profile.pricing.hourRate
						: '',
				minRate:
					profile.pricing && profile.pricing.minRate
						? profile.pricing.minRate
						: '',
				currency: profile.pricing.currency,
			});
			if (profile.profilePicture)
				setProfilePicture(profile.profilePicture.publicId);
			if (profile.cover) setCover(profile.cover.publicId);
			if (profile.portfolio) setPortfolio(profile.portfolio);
		} else {
			fetchArtistProfile();
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [profile]);

	const {
		fullName,
		biography,
		workplaces,
		tattooStyles,
		facebook,
		instagram,
		website,
		phone,
		email,
		hourRate,
		minRate,
		currency,
	} = formData;

	const onChange = e =>
		setFormData(prevFormData => ({
			...prevFormData,
			[e.target.name]: e.target.value,
		}));

	const saveHandler = e => {
		saveProfile({
			fullName,
			biography,
			workplaces,
			social: { email, website, phone, facebook, instagram },
			pricing: { hourRate, minRate, currency },
		});
	};

	const addWorkplaceHandler = workplace => {
		setShowAddWorkplaceModal(false);

		if (!workplaces.some(item => item._id === workplace._id)) {
			workplaces.push(workplace);
			setFormData({
				...formData,
				workplaces,
			});
		}
	};

	const removeWorkplaceHandler = workplaceId => {
		setIdToRemove(workplaceId);
		setShowRemoveWorkplaceModal(true);
	};

	const removeWorkplaceConfirmationHandler = () => {
		setShowRemoveWorkplaceModal(false);

		if (workplaces.some(workplace => workplace._id === idToRemove)) {
			const filteredWorkplaces = workplaces.filter(
				workplace => workplace._id !== idToRemove
			);
			setFormData({
				...formData,
				workplaces: filteredWorkplaces,
			});
		}
		setIdToRemove('');
	};

	const addPhotoHandler = base64 => {
		setPortfolio(prevPortfolio => [
			...prevPortfolio,
			{
				publicId: base64,
				base64,
			},
		]);
	};

	const removePhotoHandler = photoId => {
		const filteredPhotos = portfolio.filter(photo => photo._id !== photoId);
		setPortfolio(filteredPhotos);
	};

	const changePhotoHandler = (photoId, base64) => {
		const newPhotos = portfolio.map(photo => {
			if (photo._id === photoId) {
				photo.base64 = base64;
			}
			return photo;
		});
		setPortfolio(newPhotos);
	};

	const saveProtosHandler = () => {
		if (cover !== profile.cover.publicId) {
			saveArtistImage(cover, 'cover');
		}
		if (portfolio.some(photo => photo.base64)) {
			saveArtistPortfolio(portfolio);
		}
	};

	return (
		<Container>
			<Form>
				<div className="d-flex justify-content-between solid-bottom-border-secondary mt-5 mb-4">
					<div>
						<h1>Artist</h1>
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
				{profile && (
					<div>
						<ImageUploader
							image={profilePicture}
							onImageChange={imageBase64 =>
								setProfilePicture(imageBase64)
							}
							onSave={() =>
								saveArtistImage(
									profilePicture,
									'profilePicture'
								)
							}
						/>
					</div>
				)}
				<Row className="my-3">
					<Col>
						<Form.Group controlId="formArtistName">
							<Form.Label className="font-75">Name</Form.Label>
							<Form.Control
								required
								type="text"
								placeholder="Full name"
								name="fullName"
								value={fullName}
								onChange={e => onChange(e)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formArtistEmail">
							<Form.Label className="font-75">E-mail</Form.Label>
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
						<Form.Group controlId="formArtistWebsite">
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
						<Form.Group controlId="formArtistPhone">
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
						<Form.Group controlId="formArtistFacebook">
							<Form.Label className="font-75">
								Facebook
							</Form.Label>
							<Form.Control
								type="text"
								placeholder="facebook.com/example"
								name="facebook"
								value={facebook}
								onChange={e => onChange(e)}
							/>
						</Form.Group>
					</Col>
					<Col>
						<Form.Group controlId="formArtistInstagram">
							<Form.Label className="font-75">
								Instagram
							</Form.Label>
							<Form.Control
								type="tel"
								placeholder="instagram.com/example"
								name="instagram"
								value={instagram}
								onChange={e => onChange(e)}
							/>
						</Form.Group>
					</Col>
				</Row>
				<Row className="pb-3">
					<Form.Group controlId="formArtistBiography">
						<Form.Label className="font-75">Biography</Form.Label>
						<Form.Control
							as="textarea"
							rows={3}
							name="biography"
							value={biography}
							onChange={e => onChange(e)}
						/>
					</Form.Group>
				</Row>
				<div className="mt-4 mb-3">
					<div className="d-flex justify-content-between">
						<div>
							<h3>Workplaces</h3>
						</div>
						<div>
							<Button
								variant="dark"
								onClick={() => setShowAddWorkplaceModal(true)}
							>
								<FaPlus size={23} />
							</Button>
						</div>
						<AddWorkplaceModal
							show={showAddWorkplaceModal}
							onClose={() => setShowAddWorkplaceModal(false)}
							addWorkplace={addWorkplaceHandler}
							selectedWorplaces={workplaces}
						/>
					</div>
					<div className="d-flex flex-wrap">
						{workplaces &&
							workplaces.map(studio => (
								<StudioMiniCard
									key={studio._id}
									studio={studio}
									removeFunction={() =>
										removeWorkplaceHandler(studio._id)
									}
								/>
							))}
						<ConfirmationModal
							show={showRemoveWorkplaceModal}
							objectId={idToRemove}
							onClose={() => setShowRemoveWorkplaceModal(false)}
							title="Remove workplace"
							titleColor="text-danger"
							bodyText="Are you sure you want to remove it?"
							acceptVariant="danger"
							onAccept={removeWorkplaceConfirmationHandler}
						/>
					</div>
				</div>
				<hr />
				<div className="mt-4 mb-5">
					<h3 className="d-flex">Styles</h3>
					<div className="d-flex flex-wrap py-1">
						<TattooStyles selectedTattooStylesIds={tattooStyles} />
					</div>
				</div>
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
								photos={portfolio}
								photosLimit={13}
								onClose={() => setShowImagesModal(false)}
								onAddPhoto={addPhotoHandler}
								onRemovePhoto={removePhotoHandler}
								onChangeCover={setCover}
								onChangePhoto={changePhotoHandler}
								onSave={saveProtosHandler}
							/>
						</div>
					</Fragment>
				)}
				<hr />
				<div className="mb-5">
					<h3>Pricing</h3>
					<Row>
						<Col md={{ span: 5 }}>
							<Form.Group controlId="formArtistPriceHour">
								<Form.Label className="font-75">
									Per hour
								</Form.Label>
								<Form.Control
									type="number"
									name="hourRate"
									className="text-center"
									value={hourRate}
									onChange={e => onChange(e)}
								/>
							</Form.Group>
						</Col>
						<Col md={{ span: 5 }}>
							<Form.Group controlId="formArtistPriceMin">
								<Form.Label className="font-75">
									Min rate
								</Form.Label>
								<Form.Control
									type="number"
									name="minRate"
									className="text-center"
									value={minRate}
									onChange={e => onChange(e)}
								/>
							</Form.Group>
						</Col>
						<Col>
							<CurrencySelect
								priceCurrency={currency}
								onSelect={value =>
									setFormData(prevFormData => ({
										...prevFormData,
										currency: value,
									}))
								}
							/>
						</Col>
					</Row>
				</div>
				{profile && (
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
						<Button
							variant="danger"
							className="d-flex mt-4 mb-5"
							onClick={() => setShowDeleteAccountModal(true)}
						>
							<FaTrashAlt size={19} />
							<span className="ps-2">Delete my account</span>
						</Button>
						<ConfirmationModal
							show={showDeleteAccountModal}
							onClose={() => setShowDeleteAccountModal(false)}
							title="Delete account"
							titleColor="text-danger"
							bodyText="Are you sure? It can't be undone!"
							declineText="Cancel"
							acceptVariant="danger"
							onAccept={() => deleteArtist(history)}
							acceptText="Yes, delete it"
						/>
					</Fragment>
				)}
			</Form>
		</Container>
	);
};

ArtistProfile.propTypes = {
	fetchArtistProfile: PropTypes.func.isRequired,
	saveProfile: PropTypes.func.isRequired,
	artist: PropTypes.object.isRequired,
};

const mapStateToProps = state => ({
	artist: state.artist,
	user: state.user,
});

export default connect(mapStateToProps, {
	fetchArtistProfile,
	saveProfile,
	saveArtistImage,
	saveArtistPortfolio,
	deleteArtist,
})(withRouter(ArtistProfile));
