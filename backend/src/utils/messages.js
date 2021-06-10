exports.formatMessageApi = (payload, status = 200) => {
	return {
		status,
		payload
	}
}


exports.formatMessageApiPayloadName = (payloadValue, status = 200, payloadName = 'msg') => {
	return {
		status,
		payload: {
			[payloadName]: payloadValue
		}
	}
}