// timeString -> 00:00
export const formatTime = timeString => {
	const date = new Date(`07/13/1977 ${timeString}`);

	return date.toLocaleTimeString(navigator.language, {
		hour: '2-digit',
		minute: '2-digit',
	});
};

export const isOpenNow = ({
	businessHours: {
		sunday,
		monday,
		tuesday,
		wednesday,
		thursday,
		friday,
		saturday,
	},
}) => {
	const date = new Date();
	const timeNow = formatTime(getTimeString(date));

	switch (date.getDay()) {
		case 0: // sunday
			return (
				sunday.isOpen &&
				timeNow >= formatTime(sunday.opens) &&
				timeNow <= formatTime(sunday.closes)
			);
		case 1: // monday
			return (
				monday.isOpen &&
				timeNow >= formatTime(monday.opens) &&
				timeNow <= formatTime(monday.closes)
			);
		case 2: // tuesday
			return (
				tuesday.isOpen &&
				timeNow >= formatTime(tuesday.opens) &&
				timeNow <= formatTime(tuesday.closes)
			);
		case 3: // wednesday
			return (
				wednesday.isOpen &&
				timeNow >= formatTime(wednesday.opens) &&
				timeNow <= formatTime(wednesday.closes)
			);
		case 4: // thursday
			return (
				thursday.isOpen &&
				timeNow >= formatTime(thursday.opens) &&
				timeNow <= formatTime(thursday.closes)
			);
		case 5: // friday
			return (
				friday.isOpen &&
				timeNow >= formatTime(friday.opens) &&
				timeNow <= formatTime(friday.closes)
			);
		case 6: // saturday
			return (
				saturday.isOpen &&
				timeNow >= formatTime(saturday.opens) &&
				timeNow <= formatTime(saturday.closes)
			);
		default:
			return false;
	}
};

export const getTimeString = dateTime => {
	const date = new Date(dateTime);
	const hour = formatIntoTwoDigits(date.getHours());
	const min = formatIntoTwoDigits(date.getMinutes());

	return `${hour}:${min}`;
};

const formatIntoTwoDigits = number => {
	if (number < 10) {
		number = '0' + number;
	}
	return number;
};
