'use strict';

function Item(properties) {
    var self = this;
    this.id = properties.id || 999;
    this.name = properties.name || "";
    this.type = properties.type || "";
    this.import = properties.import || false;
    this.except = properties.except || false;
    this.price = properties.price || 1.00;
    this.lastUpdated = properties.lastUpdated || new Date().getTime();
}

module.exports = Item;