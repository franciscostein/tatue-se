import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Image from 'react-bootstrap/Image';

import coverPlaceholder from '../../../assets/cover.jpg';
import avatarPlaceholder from '../../../assets/user_w.png';

const ArtistCard = ({
	artist: {
		cover = { publicId: null },
		profilePicture = { publicId: null },
		fullName,
		tattooStyles,
	},
	onClick,
}) => {
	return (
		<div className="studio-card m-3" onClick={onClick}>
			<Row>
				<Image
					src={cover.publicId ?? coverPlaceholder}
					className="studio-card-img"
				/>
			</Row>
			<div className="d-flex align-items-center mb-1">
				<Image
					src={profilePicture.publicId ?? avatarPlaceholder}
					className="studio-avatar-img"
					roundedCircle
				/>
				<Col>
					<Row className="font-60 ps-3">{fullName}</Row>
				</Col>
			</div>
			{tattooStyles.length > 0 && (
				<div className="dashed-top-border-secondary d-flex flex-wrap pt-2 pb-1">
					{tattooStyles.map(tattooStyle => (
						<span
							key={tattooStyle._id}
							className="tattoo-style-badge mx-1"
						>
							{tattooStyle.name}
						</span>
					))}
				</div>
			)}
		</div>
	);
};

export default ArtistCard;
