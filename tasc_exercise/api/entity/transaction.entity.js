'use strict';

function Transaction(properties) {
    var self = this;
    this.id = properties.id || 999;
    this.total = properties.total || 0.00;
    this.items = properties.items || [];
    this.lastUpdated = properties.lastUpdated || new Date().getTime();
}

module.exports = Transaction;