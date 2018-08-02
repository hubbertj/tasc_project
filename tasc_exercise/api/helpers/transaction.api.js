'use strict';
const util = require('util');
const Transaction = require('../entity/transaction.entity');
const Item = require('../entity/item.entity');
const toFixed = require('tofixed');

/**
 * Api for inventory managment
 * @param {[array]} items List of items for transaction to process
 */
function TransactionApi(items) {
    var self = this;
    this.items = items;

    /**
     * The total for just the items, rounded to nearest cent.
     * @param  {[array]} itms items to calc
     * @return {[float]} The total for transaction
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
     * calcs the taxas for the transaction
     * @param  {[array]} itms items to calc
     * @return {[float]} The total taxes
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
     * Return a transaction from the id
     * @param  {[int]} transactionId The transaction id
     * @return {[obj]} Promise The found transaction
     */
    this.find = function(transactionId) {
        return new Promise((resolve, reject) => {
            let transactionList = DB.getData("/transaction");
            let fTransaction = transactionList.find(trans => trans.id === transactionId);
            if (fTransaction) {
                return resolve(fTransaction);
            } else {
                return reject({
                    message: `Transaction ID ${transactionId} was not found in system`,
                    code: 404
                });
            }
        });
    }

    /**
     * Updates a transaction
     * @param  {[obj]} tran The transaction attr to update
     * @return {[obj]} Promise a transaction
     */
    this.updateTransaction = function(tran) {
        return new Promise((resolve, reject) => {
            try {
                let transList = DB.getData("/transaction");
                let transIndex = transList.findIndex(aTran => aTran.id === tran.id);
                if (transIndex !== -1) {
                    var newTran = new Transaction(tran);
                    transList[transIndex] = newTran;
                    DB.save();
                    return resolve(newTran);
                } else {
                    return reject({
                        message: `Transaction ID ${tran.id} was not found in system`,
                        code: 404
                    });
                }
            } catch (err) {
                return reject(err);
            }
        });
    }
    
    /**
     * Removes a transaction from the system
     * @param  {[int]} transId  id of the transaction
     * @return {[obj]} Promise a simple message of what happen
     */
    this.removeTransaction = function(transId) {
        return new Promise((resolve, reject) => {
            try {
                let transList = DB.getData("/transaction");
                let tranIndex = transList.findIndex(tran => tran.id === transId);
                if (tranIndex !== -1) {
                    transList.splice(tranIndex, 1);
                    DB.save();
                    return resolve(`Transaction ID ${transId} was removed from the system.`);
                } else {
                    return reject({
                        message: `Transaction ID ${transId} was not found in system`,
                        code: 404
                    });
                }
            } catch (err) {
                return reject(err);
            }
        });
    }

    /**
     * Save a transaction from the item list
     * @return {[obj]} Promise returns a transaction.
     */
    this.save = function() {
        return new Promise((result, reject) => {
            try {
                let itemsList = DB.getData("/item");
                let filterItemList = itemsList.map((val, i, arr) => val.id);
                let transactionList = DB.getData("/transaction");
                let newTransactionId = 1;
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
                        var newItem = new Item(fItem);
                        newItem.quantity = self.items[item].quantity;
                        transItems.push(newItem);
                    }
                }

                if (transactionList && transactionList.length > 0) {
                    newTransactionId = transactionList.length + 2;
                }

                //totals
                let tax = self.getTaxTotal();
                let subTotal = self.getTransactionTotal();
                let totalRounded = parseFloat(toFixed((tax + subTotal), 2));

                let transaction = new Transaction({
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