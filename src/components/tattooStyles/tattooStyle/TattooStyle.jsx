import './TattooStyle.css';

const TattooStyle = ({ tattooStyle, selected, onClick }) => {
	return (
		<span
			className={
				selected
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
