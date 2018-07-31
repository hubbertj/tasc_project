'use strict';
const util = require('util');
const ErrorApi = require('../helpers/error.api');
const InventoryApi = require('../helpers/inventory.api');

function _getItem(req, res) {
    let itemId = req.swagger.params.itemId.value;
    console.log(itemId);
    res.json("works");
}

function _getItems(req, res) {
    console.log("Running: get all items and return them");
    res.json([]);
}

function _updateItem(req, res) {
    let item = req.swagger.params.item.value;
    console.log(item);
    res.json("works");
}

function _removeItem(req, res) {
    let itemId = req.swagger.params.itemId.value;
    console.log(itemId);
    res.json("works");
}

function _removeItems(req, res) {
    let itemId = req.swagger.params.items.value;
    console.log(itemId);
    res.json("works");
}

module.exports = {
    getItem: _getItem,
    getAllItems: _getItems,
    putItem: _updateItem,
    deleteItem: _removeItem,
    deleteItems: _removeItems
};