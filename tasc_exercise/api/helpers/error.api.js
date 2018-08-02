'use strict';
const util = require('util');

/**
 * Api for creating error messages
 * @param {[str]} message The error message
 */
function ErrorApi(message) {
    var self = this;
    this.message = message;
    this.code = 0;

    this.getErrorMessage = function() {
        return {
            message: util.format('Error: %s', self.message),
            code: self.code
        }
    }
}

module.exports = ErrorApi;