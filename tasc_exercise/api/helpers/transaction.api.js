'use strict';
const util = require('util');
const Transaction = require('../entity/transaction.entity');
const toFixed = require('tofixed');

function TransactionApi(items) {
    var self = this;
    this.items = items;

    /**
     * The total for just the items, rounded to nearest cent.
     * @param  {[type]} itms [description]
     * @return {[type]}      [description]
     */
    this.getTransactionTotal = function(itms) {
        let items = itms || self.items;
        let itemsList = DB.getData("/item");
        let total = 0;
        for (var i in items) {
            var fItem = itemsList.find((item) => item.id === items[i].ItemId);
            if (fItem && 'price' in fItem) {
                total += (fItem.price * items[i].quantity);
            }
        }
        return parseFloat(toFixed(total, 2));
    }

    /**
     * [getTaxTotal description]
     * @param  {[type]} itms [description]
     * @return {[type]}      [description]
     */
    this.getTaxTotal = function(itms) {
        let items = itms || self.items;
        let itemsList = DB.getData("/item");
        let totalTax = 0;
        let totalImportTax = 0;

        let taxDomesticRate = tasc.defaults.taxes.domestic.default;
        let taxImportRate = tasc.defaults.taxes.import.default;
        let roundAmount = tasc.defaults.taxes.round;

        for (var i in items) {
            var fItem = itemsList.find((item) => item.id === items[i].ItemId);
            if (fItem && 'price' in fItem) {
                if ('except' in fItem && !fItem.except) {
                    totalTax += Math.ceil(((fItem.price * items[i].quantity) * taxDomesticRate) / roundAmount) * roundAmount;
                }
                if ('import' in fItem && fItem.except) {
                    totalImportTax += Math.ceil(((fItem.price * items[i].quantity) * taxImportRate) / roundAmount) * roundAmount;
                }
            }
        }
        return totalTax + totalImportTax;
    }

    /**
     * [save description]
     * @return {[type]} [description]
     */
    this.save = function() {
        return new Promise((result, reject) => {
            try {
                let itemsList = DB.getData("/item");
                let filterItemList = itemsList.map((val, i, arr) => val.id);
                let transactionList = DB.getData("/transaction");
                let newTransactionId = 1;
                let transaction = null;
                let transItems = [];

                if (util.isArray(transactionList)) {
                    transactionList = transactionList.sort((a, b) => a.id - b.id);
                } else {
                    transactionList = [transactionList];
                }

                for (var item in self.items) {
                    var itemId = self.items[item].ItemId;
                    //validate itemId
                    if (filterItemList.indexOf(itemId) === -1) {
                        return reject({
                            message: `Item ID ${itemId} was not found in system`,
                            code: 404
                        });
                    }
                    //Adds current prices to items.
                    var fItem = itemsList.find((aItem) => aItem.id === self.items[item].ItemId);
                    if (fItem) {
                        fItem.quantity = self.items[item].quantity;
                        transItems.push(fItem);
                    }
                }

                if (transactionList && transactionList.length > 0) {
                    newTransactionId = transactionList.length + 2;
                }

                //totals
                let tax = self.getTaxTotal();
                let subTotal = self.getTransactionTotal();
                let totalRounded = parseFloat(toFixed((tax + subTotal), 2));

                transaction = new Transaction({
                    id: newTransactionId,
                    items: transItems,
                    tax: tax,
                    subTotal: subTotal,
                    total: totalRounded
                });
                transactionList.push(transaction);

                DB.push("/transaction", transactionList);
                DB.save();
                return result(transaction);

            } catch (err) {
                return reject(err);
            }
            
        });
    }
}

module.exports = TransactionApi;