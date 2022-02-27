export const findLocation = addressComponents => {
	let country = '';
	let region = '';
	let city = '';

	for (const address of addressComponents) {
		const { types, long_name, short_name } = address;

		if (hasType('country', types)) {
			country = long_name;
		}
		if (hasType('administrative_area_level_1', types)) {
			region = short_name;
		}
		if (
			hasType('locality', types) ||
			hasType('administrative_area_level_2', types)
		) {
			city = long_name;
		}
	}
	return {
		country,
		region,
		city,
	};
};

const hasType = (value, array) => array.some(type => type === value);
