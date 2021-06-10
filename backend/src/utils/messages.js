exports.apiResponse = (payload = {}, status = 200) => {
	return {
		status,
		payload
	}
}

exports.apiResponsePayloadName = (payloadName, payloadValue, status = 200) => {
	return {
		status,
		payload: {
			[payloadName]: payloadValue
		}
	}
}