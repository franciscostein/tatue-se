exports.formatMessageApi = (payloadValue, status = 200) => {
	return {
		status,
		payload: {
			...payloadValue
		}
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