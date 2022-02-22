import { Fragment } from 'react';
import {
	FaInstagram,
	FaFacebook,
	FaGlobe,
	FaPhone,
	FaRegEnvelope,
} from 'react-icons/fa';

const Social = ({ social: { instagram, facebook, website, phone, email } }) => {
	return (
		<Fragment>
			{instagram && (
				<div
					className={`p-2 ${
						(facebook || website || phone || email) &&
						'solid-bottom-border-secondary'
					}`}
				>
					<a
						href={instagram}
						className="d-flex align-items-center font-55"
					>
						<FaInstagram size={20} className="me-3" /> Instagram
					</a>
				</div>
			)}
			{facebook && (
				<div
					className={`p-2 ${
						(website || phone || email) &&
						'solid-bottom-border-secondary'
					}`}
				>
					<a
						href={facebook}
						className="d-flex align-items-center font-55"
					>
						<FaFacebook size={20} className="me-3" /> Facebook
					</a>
				</div>
			)}
			{website && (
				<div
					className={`p-2 ${
						(phone || email) && 'solid-bottom-border-secondary'
					}`}
				>
					<a
						href={website}
						className="d-flex align-items-center font-55"
					>
						<FaGlobe size={20} className="me-3" /> {website}
					</a>
				</div>
			)}
			{phone && (
				<div
					className={`d-flex align-items-center p-2 font-55 ${
						email && 'solid-bottom-border-secondary'
					}`}
				>
					<FaPhone size={20} className="me-3" /> {phone}
				</div>
			)}
			{email && (
				<div className="d-flex align-items-center p-2 font-55">
					<FaRegEnvelope size={20} className="me-3" /> {email}
				</div>
			)}
		</Fragment>
	);
};

export default Social;
