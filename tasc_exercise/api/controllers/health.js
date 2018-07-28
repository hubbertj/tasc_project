'use strict';
const util = require('util');

/**
 * [hello description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _healthCheck(req, res) {
    var status = req.swagger.params.status.value || 'stranger';
    var message = util.format('System health is good, status = %s', status);
    res.json(message);
}

module.exports = {
    healthCheck: _healthCheck
};