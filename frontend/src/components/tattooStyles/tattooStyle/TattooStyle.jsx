const TattooStyle = ({ tattooStyle }) => {
    return (
        <span className={tattooStyle.selected ? 'tattoo-style-badge-active tattoo-style-badge font-50 m-1' : 'tattoo-style-badge font-50 m-1'}>{tattooStyle.name}</span>
    );
}

export default TattooStyle;