'use strict';
const util = require('util');
const ErrorApi = require('../helpers/error.api');
const TransactionApi = require('../helpers/transaction.api');

/**
 * [getTransaction description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _getTransaction(req, res) {
    var name = req.swagger.params.name.value || 'stranger';
    var hello = util.format('Hello, %s!', name);
    res.json(hello);
}

/**
 * [createTransaction description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _createTransaction(req, res) {
    let items = req.swagger.params.items.value || null;
    if (items && items.length > 0) {
        new TransactionApi(items).save()
            .then((transaction) => {
                res.json(transaction);
            })
            .catch((err) => {
                var error = new ErrorApi(err);
                error.code = 500;
                res.status(error.code).json(error.getErrorMessage());
            })

    } else {
        var error = new ErrorApi("Items must be passed in the list to create a transaction.");
        error.code = 400;
        res.status(error.code).json(error.getErrorMessage());
    }
}

/**
 * [putTransaction description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _putTransaction(req, res) {
    var name = req.swagger.params.name.value || 'stranger';
    var hello = util.format('Hello, %s!', name);
    res.json(hello);
}

/**
 * [deleteTransaction description]
 * @param  {[type]} req [description]
 * @param  {[type]} res [description]
 * @return {[type]}     [description]
 */
function _deleteTransaction(req, res) {
    var name = req.swagger.params.name.value || 'stranger';
    var hello = util.format('Hello, %s!', name);
    res.json(hello);
}

module.exports = {
    getTransaction: _getTransaction,
    createTransaction: _createTransaction,
    putTransaction: _putTransaction,
    deleteTransaction: _deleteTransaction
};