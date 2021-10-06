import './TattooStyle.css';

const TattooStyle = ({ tattooStyle, onClick }) => {
    return (
        <span 
            className={tattooStyle.selected ? 'tattoo-style-badge-active tattoo-style-badge font-50 m-1' : 'tattoo-style-badge font-50 m-1'}
            onClick={onClick}
        >
        {/* <span className="tattoo-style-badge font-50 mx-1 mb-2">{tattooStyle}</span> */}
            {tattooStyle.name}
        </span>
    );
}

export default TattooStyle;