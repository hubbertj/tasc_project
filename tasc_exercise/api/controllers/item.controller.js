'use strict';
const util = require('util');
const ErrorApi = require('../helpers/error.api');
const InventoryApi = require('../helpers/inventory.api');

function _getItem(req, res) {
    let itemId = req.swagger.params.itemId.value;
}

function _getItems(req, res) {
    let itemsList = req.swagger.params.items.value;
}

function _updateItem(req, res) {
    let item = req.swagger.params.item.value;
}

function _removeItem(req, res) {
    let itemId = req.swagger.params.itemId.value;
}

function _removeItems(req, res) {
    let itemId = req.swagger.params.itemId.value;
}

module.exports = {
    getItem: _getItem,
    getAllItems: _getItems,
    putItem: _updateItem,
    deleteItem: _removeItem,
    deleteItems: _removeItems
};