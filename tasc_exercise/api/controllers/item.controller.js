'use strict';
const util = require('util');
const ErrorApi = require('../helpers/error.api');
const InventoryApi = require('../helpers/inventory.api');

function _getItem(req, res) {
    let itemId = req.swagger.params.itemId.value;
    new InventoryApi().find(itemId)
        .then((item) => {
            if (item && 'lastUpdated' in item) {
                delete item.lastUpdated;
            }
            res.json(item);
        })
        .catch((err, code) => {
            var error = new ErrorApi(err.message);
            error.code = err.code || 500;
            res.status(error.code).json(error.getErrorMessage());
        });
}

function _getItems(req, res) {
    new InventoryApi().get()
        .then(items => res.json(items))
        .catch((err, code) => {
            var error = new ErrorApi(err.message);
            error.code = err.code || 500;
            res.status(error.code).json(error.getErrorMessage());
        });
}

function _postItem(req, res) {
    let item = req.swagger.params.item.value;
    new InventoryApi().saveItem(item)
        .then(item => res.json(item))
        .catch((err, code) => {
            var error = new ErrorApi(err.message);
            error.code = err.code || 500;
            res.status(error.code).json(error.getErrorMessage());
        });
}

function _updateItem(req, res) {
    let item = req.swagger.params.item.value;
    new InventoryApi().updateItem(item)
        .then(item => res.json(item))
        .catch((err, code) => {
            var error = new ErrorApi(err.message);
            error.code = err.code || 500;
            res.status(error.code).json(error.getErrorMessage());
        });
}

function _removeItem(req, res) {
    let itemId = req.swagger.params.itemId.value;
    new InventoryApi().removeItem(itemId)
        .then(repsonse => res.json(repsonse))
        .catch((err, code) => {
            var error = new ErrorApi(err.message);
            error.code = err.code || 500;
            res.status(error.code).json(error.getErrorMessage());
        });
}

function _removeItems(req, res) {
    let itemId = req.swagger.params.items.value;
    console.log(itemId);
    res.json("works");
}

module.exports = {
    postItem: _postItem,
    getItem: _getItem,
    getAllItems: _getItems,
    putItem: _updateItem,
    deleteItem: _removeItem,
    deleteItems: _removeItems
};