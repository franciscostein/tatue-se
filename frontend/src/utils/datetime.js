export const formatDateToTime = dateTime => {
    const date = new Date(dateTime);

    return date.toLocaleTimeString(navigator.language, {
        hour: '2-digit',
        minute: '2-digit'
    });
}

export const isOpenNow = studio => {
    const date = new Date();
    const timeNow = formatDateToTime(date.getTime());
    console.log(timeNow);
    const { businessHours: { sunday, monday, tuesday, wednesday, thursday, friday, saturday }} = studio;

    console.log(friday);

    switch (date) {
        case 0: // sunday
            if (sunday.isOpen && timeNow >= formatDateToTime(sunday.opens) && timeNow <= formatDateToTime(sunday.closes)) {
                return true;
            } else {
                return false;
            }
        case 1: // monday
            if (monday.isOpen && timeNow >= formatDateToTime(monday.opens) && timeNow <= formatDateToTime(monday.closes)) {
                return true;
            } else {
                return false;
            }
        case 2: // tuesday
            if (tuesday.isOpen && timeNow >= formatDateToTime(tuesday.opens) && timeNow <= formatDateToTime(tuesday.closes)) {
                return true;
            } else {
                return false;
            }
        case 3: // wednesday
            if (wednesday.isOpen && timeNow >= formatDateToTime(wednesday.opens) && timeNow <= formatDateToTime(wednesday.closes)) {
                return true;
            } else {
                return false;
            }
        case 4: // thursday
            if (thursday.isOpen && timeNow >= formatDateToTime(thursday.opens) && timeNow <= formatDateToTime(thursday.closes)) {
                return true;
            } else {
                return false;
            }
        case 5: // friday
            if (friday.isOpen && timeNow >= formatDateToTime(friday.opens) && timeNow <= formatDateToTime(friday.closes)) {
                return true;
            } else {
                return false;
            }
        case 6: // saturday
            if (saturday.isOpen && timeNow >= formatDateToTime(saturday.opens) && timeNow <= formatDateToTime(saturday.closes)) {
                return true;
            } else {
                return false;
            }
        default:
            return false;
    }
}