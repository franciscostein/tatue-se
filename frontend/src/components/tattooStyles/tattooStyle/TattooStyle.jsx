const TattooStyle = ({ tattooStyle }) => {
    return (
        <span 
            className={tattooStyle.selected ? 'tattoo-style-badge-active tattoo-style-badge font-50 m-1' : 'tattoo-style-badge font-50 m-1'}
        >
        {/* <span className="tattoo-style-badge font-50 mx-1 mb-2">{tattooStyle}</span> */}
            {tattooStyle.name}
        </span>
    );
}

export default TattooStyle;