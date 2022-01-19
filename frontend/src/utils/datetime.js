export const formatDateToTime = (dateTime, timezoneOffset) => {
    const date = new Date(dateTime);

    if (timezoneOffset) {
        return date.toLocaleTimeString(navigator.language, {
            hour: '2-digit',
            minute: '2-digit'
        });
    } else {
        return date.toLocaleTimeString(navigator.language, {
            timeZone: 'UTC',
            hour: '2-digit',
            minute: '2-digit'
        });
    }
}

export const formatDateToInput = dateTime => {
    const date = new Date(dateTime);
    const hour = formatIntoTwoDigits(date.getHours());
    const min = formatIntoTwoDigits(date.getMinutes());

    return `${hour}:${min}`;
}

const formatIntoTwoDigits = number => {
    if (number < 10) {
        number = '0' + number;
    }
    return number;
}

export const isOpenNow = ({ businessHours: { sunday, monday, tuesday, wednesday, thursday, friday, saturday }}) => {
    const date = new Date();
    const timeNow = formatDateToTime(date, true);

    switch (date.getDay()) {
        case 0: // sunday
            return (sunday.isOpen && timeNow >= formatDateToTime(sunday.opens) && timeNow <= formatDateToTime(sunday.closes));
        case 1: // monday
            return (monday.isOpen && timeNow >= formatDateToTime(monday.opens) && timeNow <= formatDateToTime(monday.closes));
        case 2: // tuesday
            return (tuesday.isOpen && timeNow >= formatDateToTime(tuesday.opens) && timeNow <= formatDateToTime(tuesday.closes));
        case 3: // wednesday
            return (wednesday.isOpen && timeNow >= formatDateToTime(wednesday.opens) && timeNow <= formatDateToTime(wednesday.closes));
        case 4: // thursday
            return (thursday.isOpen && timeNow >= formatDateToTime(thursday.opens) && timeNow <= formatDateToTime(thursday.closes));
        case 5: // friday
            return (friday.isOpen && timeNow >= formatDateToTime(friday.opens) && timeNow <= formatDateToTime(friday.closes));
        case 6: // saturday
            return (saturday.isOpen && timeNow >= formatDateToTime(saturday.opens) && timeNow <= formatDateToTime(saturday.closes));
        default:
            return false;
    }
}