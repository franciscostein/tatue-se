import './TattooStyle.css';

const TattooStyle = ({ tattooStyle, onClick }) => {
	return (
		<span
			className={
				tattooStyle.selected
					? 'tattoo-style-badge-active tattoo-style-badge font-50 m-1'
					: 'tattoo-style-badge font-50 m-1'
			}
			onClick={onClick}
			id="tattoo-style"
		>
			{tattooStyle.name}
		</span>
	);
};

export default TattooStyle;
