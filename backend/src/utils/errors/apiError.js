class apiError {
    constructor(code, message) {
        this.message = message;
        this.code = code;
    }

    static badRequest(msg) {
        return new apiError(400, msg);
    }
}

module.exports = apiError;