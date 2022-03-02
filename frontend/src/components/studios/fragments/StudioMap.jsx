import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const StudioMap = ({ location: { latitude, longitude } }) => {
	const { isLoaded } = useJsApiLoader({
		id: 'google-map-script',
		googleMapsApiKey: process.env.REACT_APP_GOOGLE_API_KEY,
	});

	return (
		isLoaded && (
			<GoogleMap
				zoom={13}
				center={{
					lat: parseFloat(latitude),
					lng: parseFloat(longitude),
				}}
				mapContainerClassName="map-card"
			>
				<Marker
					position={{
						lat: parseFloat(latitude),
						lng: parseFloat(longitude),
					}}
				/>
			</GoogleMap>
		)
	);
};

export default StudioMap;
