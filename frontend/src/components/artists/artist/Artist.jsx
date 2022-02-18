import './Artist.css';
import { Fragment, useEffect, useState } from 'react';
import { useParams, withRouter } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { fetchArtistProfile } from '../../../actions/artist';
import Social from '../../fragments/Social';

import Image from 'react-bootstrap/Image';
import Row from 'react-bootstrap/Row';
import avatar from '../../../assets/user_w.png';

const Artist = ({ artist: { profile }, fetchArtistProfile, history }) => {
	const { id } = useParams();
	const [artist, setArtist] = useState({
		fullName: '',
		biography: '',
		profilePicture: '',
		tattooStyles: [],
		workplaces: [],
		social: {},
		hourRate: '',
		minRate: '',
		currency: '',
		portfolio: [],
	});

	useEffect(() => {
		if (!profile || profile._id !== id) {
			fetchArtistProfile(id);
		} else {
			setArtist({
				fullName: profile.fullName,
				biography: profile.biography,
				profilePicture: profile.profilePicture
					? profile.profilePicture.publicId
					: '',
				tattooStyles: profile.tattooStyles,
				workplaces: profile.workplaces ?? profile.workplaces,
				social: profile.social,
				hourRate: profile.pricing.hourRate,
				minRate: profile.pricing.minRate,
				currency: profile.pricing.currency,
				portfolio: profile.portfolio,
			});
		}
	}, [fetchArtistProfile, id, profile]);

	const {
		fullName,
		biography,
		profilePicture,
		tattooStyles,
		workplaces,
		social,
		hourRate,
		minRate,
		currency,
		portfolio,
	} = artist;

	return (
		<div id="main" className="d-flex align-items-start m-5">
			<div id="sidebar" className="p-2 me-3">
				<div className="d-flex align-items-center mb-1">
					<Image
						src={profilePicture || avatar}
						className="artist-avatar m-3"
						roundedCircle
					/>
					<span className="font-60">{fullName}</span>
				</div>
				{biography && (
					<div className="dashed-top-border">
						<h5 className="d-flex pt-2 m-1 mb-2">Bio</h5>
						<p className="font-50 mx-2 pb-3">{biography}</p>
					</div>
				)}

				<Social social={social} />

				<h5 className="pt-4">Worplaces</h5>
				{workplaces.map(workplace => (
					<div
						className="align-items-center studio-card-mini clickable m-3 px-2"
						onClick={() =>
							history.push(`/studios/${workplace._id}`)
						}
					>
						<Image
							src={
								workplace.logo && workplace.logo.publicId
									? workplace.logo.publicId
									: avatar
							}
							className="studio-avatar m-1 me-2"
							roundedCircle
						/>
						<div className="ms-3">
							<Row className="font-60">{workplace.name}</Row>
							<Row className="font-45">
								{workplace.location.address}
							</Row>
						</div>
					</div>
				))}
				{tattooStyles.length > 0 && (
					<Fragment>
						<hr />
						<h5 className="d-flex pt-3">Styles</h5>
						<div className="d-flex flex-wrap py-1">
							{tattooStyles.map(tattooStyle => (
								<span className="tattoo-style-badge mx-1">
									{tattooStyle.name}
								</span>
							))}
						</div>
					</Fragment>
				)}
				{(hourRate || minRate) && (
					<Fragment>
						<h5 className="d-flex pt-3">Pricing</h5>
						<div className="d-flex">
							{hourRate && (
								<div className="price-display py-1 mx-2 mb-3">
									<Row>
										<span className="secondary-color font-50">
											Hour rate:
										</span>
									</Row>
									<Row>
										<span className="font-50">{`${hourRate} ${currency}`}</span>
									</Row>
								</div>
							)}
							{minRate && (
								<div className="price-display py-1 mx-2 mb-3">
									<Row>
										<span className="secondary-color font-50">
											Min. rate:
										</span>
									</Row>
									<Row>
										<span className="font-50">{`${minRate} ${currency}`}</span>
									</Row>
								</div>
							)}
						</div>
					</Fragment>
				)}
			</div>
			{portfolio.length > 0 && (
				<div id="content" className="mx-3">
					<div className="solid-bottom-border-secondary">
						<h4 className="d-flex m-2 font-w-300">Tattoos</h4>
					</div>
					<div className="d-flex flex-wrap justify-content-center">
						{portfolio.map(photo => (
							<Image
								src={photo.publicId}
								className="m-2 tattoo-img"
							/>
						))}
					</div>
				</div>
			)}
		</div>
	);
};

Artist.propTypes = {
	artist: PropTypes.object.isRequired,
	fetchArtistProfile: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
	artist: state.artist,
});

export default connect(mapStateToProps, { fetchArtistProfile })(
	withRouter(Artist)
);
