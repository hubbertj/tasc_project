'use strict';
const util = require('util');
const ErrorApi = require('../helpers/error.api');
const TransactionApi = require('../helpers/transaction.api');

/**
 * Get a transaction
 * @param  {[obj]} req 
 * @param  {[obj]} res 
 * @return {[obj]} A transaction object
 */
function _getTransaction(req, res) {
    let transactionId = req.swagger.params.transactionId.value;
    new TransactionApi().find(transactionId)
        .then((transaction) => {
            res.json(transaction);
        })
        .catch((err, code) => {
            var error = new ErrorApi(err.message);
            error.code = err.code || 500;
            res.status(error.code).json(error.getErrorMessage());
        });
}

/**
 * Creates a transaction.
 * @param  {[obj]} req 
 * @param  {[obj]} res 
 * @return {[obj]} A transaction object
 */
function _createTransaction(req, res) {
    let items = req.swagger.params.items.value || null;
    if (items && items.length > 0) {
        new TransactionApi(items).save()
            .then((transaction) => {
                res.json(transaction);
            })
            .catch((err, code) => {
                var error = new ErrorApi(err.message);
                error.code = err.code || 500;
                res.status(error.code).json(error.getErrorMessage());
            })

    } else {
        var error = new ErrorApi("Items must be passed in the list to create a transaction.");
        error.code = 400;
        res.status(error.code).json(error.getErrorMessage());
    }
}

/**
 * Updates a transaction.
 * @param  {[obj]} req 
 * @param  {[obj]} res 
 * @return {[obj]} A transaction object
 */
function _putTransaction(req, res) {
    let transaction = req.swagger.params.transaction.value;
    new TransactionApi().updateTransaction(transaction)
        .then(tran => res.json(tran))
        .catch((err, code) => {
            var error = new ErrorApi(err.message);
            error.code = err.code || 500;
            res.status(error.code).json(error.getErrorMessage());
        });
}

/**
 * Deletes a transaction from the system.
 * @param  {[obj]} req 
 * @param  {[obj]} res 
 * @return {[str]} A simple message 
 */
function _deleteTransaction(req, res) {
    let transactionId = req.swagger.params.transactionId.value;
    new TransactionApi().removeTransaction(transactionId)
        .then(repsonse => res.json(repsonse))
        .catch((err, code) => {
            var error = new ErrorApi(err.message);
            error.code = err.code || 500;
            res.status(error.code).json(error.getErrorMessage());
        });
}

module.exports = {
    getTransaction: _getTransaction,
    createTransaction: _createTransaction,
    putTransaction: _putTransaction,
    deleteTransaction: _deleteTransaction
};