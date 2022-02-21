import './TattooStyle.css';

const TattooStyle = ({ tattooStyle, onClick }) => {
	return (
		<span
			className={
				tattooStyle.selected
					? 'font-50 m-1 tattoo-style-badge tattoo-style-badge-active'
					: 'font-50 m-1 tattoo-style-badge'
			}
			onClick={() => onClick(tattooStyle._id)}
			id="tattoo-style"
		>
			{tattooStyle.name}
		</span>
	);
};

export default TattooStyle;
