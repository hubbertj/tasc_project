'use strict';
const readYaml = require('read-yaml');
const DEFAULT_SETTINGS = __dirname + "/config/default.yaml";

function Global() {
    this.settings = {};
    this.defaults = {};
    this.environment = '';
    this.appRoot = __dirname;
    this.init = () => {
        return new Promise((resolve, reject) => {
            let promise = new Promise(function(aResolve, aReject) {
                    readYaml(DEFAULT_SETTINGS, function(err, data) {
                        if (err) return aReject(err);
                        return aResolve(data);
                    });
                })
                .then((yamlData) => {
                    var self = this;
                    if (yamlData) this.defaults = yamlData;
                    return new Promise(function(aResolve, aReject) {
                        let settings = null;

                        if (process.env['environment']) {
                            self.environment = process.env['environment'];
                        } else if ('environment' in yamlData) {
                            self.environment = yamlData['environment'];
                        } else {
                            self.environment = 'development';
                        }

                        //Get the environment settings 
                        if (self.environment && self.environment in yamlData) {
                            return aResolve(yamlData[self.environment]);
                        } else {
                            return aReject("Failed to find environment settings!");
                        }
                    });
                })
                .then((settings) => {
                    if (settings) this.settings = settings;
                    resolve(this);
                })
                .catch((err) => {
                    reject(err);
                });
        });
    };

}

module.exports = new Global();