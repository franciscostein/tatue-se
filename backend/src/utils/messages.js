exports.formatMessageApi = (payloadValue, status = 200, payloadName = 'msg') => {
	return {
		status,
		payload: {
			[payloadName]: payloadValue
		}
	}
}