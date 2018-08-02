'use strict';
const util = require('util');

/**
 * Call which handles the health check for the system.
 * @param  {[obj]} req
 * @param  {[obj]} res 
 * @return {[str]}    A simple message
 */
function _healthCheck(req, res) {
    var status = req.swagger.params.status.value || 'UNKNOWN';
    var message = util.format('System health is good, status = %s', status);
    res.json(message);
}

module.exports = {
    healthCheck: _healthCheck
};