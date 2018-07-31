'use strict';
const util = require('util');
const Item = require('../entity/item.entity');

function InventoryApi() {
    var self = this;

    /**
     * Returns a list of all items
     * @return {obj} Promise
     */
    this.get = function() {
        return new Promise((resolve, reject) => {
            let itemList = DB.getData("/item");
            if (itemList && itemList.length > 0) {
                return resolve(itemList);
            } else {
                return resolve([]);
            }
        });
    }

    /**
     * Finds and returns a single item from the system.
     * @param  {int} itemId The id of the item we want to find
     * @return {obj} Promise
     */
    this.find = function(itemId) {
        return new Promise((resolve, reject) => {
            let itemList = DB.getData("/item");
            let fItem = itemList.find(item => item.id === itemId);
            if (fItem) {
                return resolve(fItem);
            } else {
                return reject({
                    message: `Item ID ${itemId} was not found in system`,
                    code: 404
                });
            }
        });
    }

    /**
     * Updates a items in the system.
     * @param  {[obj]} item Item we are updating and its attr.
     * @return {obj} Promise
     */
    this.updateItem = function(item) {
        return new Promise((result, reject) => {});
    }

    /**
     * Saves a items to the system
     * @param  {[obj]} item Item we are saveing.
     * @return {obj} Promise
     */
    this.saveItem = function(itemAttr) {
        return new Promise((result, reject) => {
            try {
                                console.log(DB);
                let item = new Item(itemAttr);
                let itemList = DB.getData("/item");

                item.id = 1;

                if (itemList && itemList.length > 0) {
                    item.id = itemList.length + 2;
                }

                itemList.push(item);
                DB.save();
                return result(item);

            } catch (err) {
                return reject(err);
            }
        });
    }
}

module.exports = InventoryApi;