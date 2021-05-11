exports.formatMessageApi = (status, payloadValue, payloadName = 'msg') => {
	return {
		status,
		payload: {
			[payloadName]: payloadValue
		}
	}
}