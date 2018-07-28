'use strict';
const util = require('util');
const Transaction = require('../entity/transaction.entity');

function TransactionApi(items) {
    var self = this;
    this.items = items;

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
        return total;
    }

    this.getTransactionTotalWithTax = function(itms) {
        let items = itms || self.items;
        let itemsList = DB.getData("/item");
        let total = 0;
        for (var i in items) {
            var fItem = itemsList.find((item) => item.id === items[i].ItemId);
            if (fItem && 'price' in fItem) {
                total += (fItem.price * items[i].quantity);
            }
        }
        return total;
    }

    this.save = function() {

        //verify all items are real,
        //get the total for all items and sales tax
        //save then to the database as a transaction
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
                        transItems.push(fItem);
                    }
                }

                if (transactionList && transactionList.length > 0) {
                    newTransactionId = transactionList.length + 2;
                }

                transaction = new Transaction({
                    id: newTransactionId,
                    items: transItems,
                    total: self.getTransactionTotalWithTax()
                });
                transactionList.push(transaction);

                // console.log(transactionList);

                DB.push("/transaction", transactionList);
                DB.save();



            } catch (err) {
                return reject(err);
            }
            return result(true);
        });
    }
}

module.exports = TransactionApi;