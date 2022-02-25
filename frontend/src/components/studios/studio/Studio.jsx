import './Studio.css';
import { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { useParams, withRouter } from 'react-router-dom';

import { fetchStudio } from '../../../actions/studio';
import { fetchArtists } from '../../../actions/artist';
import { isOpenNow } from '../../../utils/datetime';
import ArtistCard from '../../artists/fragments/ArtistCard';
import StudioMap from '../fragments/StudioMap';
import BusinessHoursDisplay from '../fragments/BusinessHoursDisplay';
import Social from '../../fragments/Social';

import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { FaCircle, FaMapMarkerAlt } from 'react-icons/fa';

import profilePlaceholder from '../../../assets/user_w.png';
import coverPlaceholder from '../../../assets/cover.jpg';

const Studio = ({ studio: { studio }, fetchStudio, fetchArtists, history }) => {
	const { id } = useParams();
	const [studioInfo, setStudioInfo] = useState({
		cover: '',
		logoImage: '',
		name: '',
		location: {},
		about: '',
		businessHours: {
			sunday: {},
			monday: {},
			tuesday: {},
			wednesday: {},
			thursday: {},
			friday: {},
			saturday: {},
		},
		photos: [],
		social: {},
		artists: [],
	});
	const [openNow, setOpenNow] = useState(false);

	useEffect(() => {
		if (!studio || studio._id !== id) {
			fetchStudio(id);
		} else {
			setStudioInfo({
				cover: studio.cover ? studio.cover.publicId : '',
				logoImage: studio.logo ? studio.logo.publicId : '',
				name: studio.name,
				location: studio.location,
				about: studio.about,
				businessHours: studio.businessHours,
				photos: studio.photos,
				social: studio.social,
				artists: studio.artists,
			});
			setOpenNow(isOpenNow(studio));
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [id, studio]);

	const {
		cover,
		logoImage,
		name,
		location,
		about,
		businessHours,
		photos,
		social,
		artists,
	} = studioInfo;

	return (
		<div>
			<div id="cover">
				<Image src={cover || coverPlaceholder} className="cover-img" />
			</div>
			<div
				id="header"
				className="d-flex justify-content-between align-items-center"
			>
				<div className="d-flex">
					<Image
						src={logoImage || profilePlaceholder}
						className="avatar"
						roundedCircle
					/>
					<div className="align-self-center">
						<Row>
							<div>
								<span className="font-75 d-flex">{name}</span>
							</div>
						</Row>
						<Row>
							<span className="font-55 d-flex align-items-center">
								<FaMapMarkerAlt size={15} className="me-1" />{' '}
								{location.address}
							</span>
						</Row>
					</div>
				</div>
				<div className="my-4 mx-5 font-75">
					{openNow ? (
						<div>
							<FaCircle size={15} className="open-hour me-1" />{' '}
							Open now
						</div>
					) : (
						<div>
							<FaCircle size={15} className="closed-hour me-1" />{' '}
							Closed now
						</div>
					)}
				</div>
			</div>
			<div className="d-flex justify-content-between m-5">
				<Col
					xs={7}
					className="d-flex flex-column justify-content-between mx-4"
				>
					<div>
						<h3 className="d-flex solid-bottom-border-secondary">
							About
						</h3>
						<p className="font-65 mx-1">{about}</p>
					</div>
					<div className="mx-1">
						<BusinessHoursDisplay businessHours={businessHours} />
					</div>
				</Col>
				<Col className="mx-4">
					<StudioMap location={location} />
					<Social social={social} />
				</Col>
			</div>
			{photos.length > 0 && (
				<div className="m-5 px-4">
					<Row className="solid-bottom-border-secondary">
						<h4 className="d-flex mt-2 font-w-300">Studio</h4>
					</Row>
					<div className="d-flex flex-wrap justify-content-center my-3">
						{photos.map(photo => (
							<Image
								src={photo.publicId}
								key={photo._id}
								className="m-2 studio-img"
							/>
						))}
					</div>
					{artists.length > 0 && <hr />}
				</div>
			)}
			{artists.length > 0 && (
				<div className="ms-4">
					<h3 className="d-flex ms-5">Artists</h3>
					<div className="d-flex flex-wrap mx-5">
						{artists.map(artist => (
							<ArtistCard
								key={artist._id}
								artist={artist}
								onClick={() =>
									history.push(`/artists/${artist._id}`)
								}
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

const mapStateToProps = state => ({
	studio: state.studio,
	artist: state.artist,
});

export default connect(mapStateToProps, { fetchStudio, fetchArtists })(
	withRouter(Studio)
);
