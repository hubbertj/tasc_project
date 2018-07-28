'use strict';
const util = require('util');

/**
 * [_healthCheck description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _healthCheck(req, res) {
	console.log('hello');
    var status = req.swagger.params.status.value || 'UNKNOWN';
    var message = util.format('System health is good, status = %s', status);
    res.json(message);
}

module.exports = {
    healthCheck: _healthCheck
};