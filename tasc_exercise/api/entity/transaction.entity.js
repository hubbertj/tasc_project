'use strict';

function Transaction(properties) {
    var self = this;
    this.id = properties.id || 999;
    this.subTotal = properties.subTotal || 0.00;
    this.tax = properties.tax || 0.00;
    this.total = properties.total || (this.subTotal + this.tax);
    this.items = properties.items || [];
    this.lastUpdated = properties.lastUpdated || new Date().getTime();
}

module.exports = Transaction;