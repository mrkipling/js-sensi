var Sensi = Sensi || (function ($, global, undefined) {

    var Utils    = {}, // settings and toolbox
        Pages    = {}, // page-specific logic
        Features = {}, // generic re-usable features
        App      = {}; // global logic and initialiser

    // keep this information private (don't return it as part of the Sensi object)
    // read it using e.g. Sensi.Private.meta('page')

    var Private = {
        meta: {
            page: -1,
            action: -1,
            features: [],
            current_user: -1
        },

        debug: (typeof global.DEBUG !== 'undefined' && global.DEBUG === true),

        init: function() {
            // get the page name
            var page = $('meta[name="page"]').attr("content");
            if (typeof page !== 'undefined' && page !== '') {
                Private.meta.page = page;
            }

            // get the action
            var action = $('meta[name="action"]').attr("content");
            if (typeof action !== 'undefined' && action !== '') {
                Private.meta.action = action;
            }

            // get the list of features
            var features = $('meta[name="features"]').attr("content");

            if (features === '') {
                features = [];
            } else {
                features = features.split(' ');
                // get rid of duplicates
                features.sort();
                for (var i = 1; i < features.length; i++) {
                    if (features[i] === features[i - 1]) {
                        features.splice(i--, 1);
                    }
                }
            }

            Private.meta.features = features;

            // get the current user ID
            var userid = $('meta[name="userid"]').attr("content");
            if (typeof userid !== 'undefined' && userid !== '') {
                Private.meta.current_user = userid;
            }
        }
    };

    Private.init();

    // Utils

    Utils = {
        settings: {
            meta: function (setting) {
                return Private.meta[setting];
            },

            debug: function () {
                return Private.debug;
            },

            feature_enabled: function (feature) {
                var enabled = false;
                for (var i = 0; i < Private.meta.features.length; i += 1) {
                    if (Private.meta.features[i] === feature) {
                        enabled = true;
                        break;
                    }
                }
                return enabled;
            },

            info: function () {
                if (!Private.debug) { return; }

                _log('User: ' + (Private.meta.current_user === -1 ? 'not defined' : Private.meta.current_user));

                var page_description = '';

                if (Private.meta.page !== -1) {
                    var page = Pages[Private.meta.page];

                    if (typeof page === 'undefined') {
                        page_description = ' [does not exist]';
                    } else{
                        if (typeof page.description !== 'undefined') {
                            page_description = ' - "' + page.description + '"';
                        }
                    }
                }

                _log('Page: ' + (Private.meta.page === -1 ? 'not defined' : Private.meta.page) + page_description);
                _log('Action: ' + (Private.meta.action === -1 ? 'not defined' : Private.meta.action));

                if (Private.meta.features.length === 0) {
                    _log('Features: none active');
                } else {
                    _log('\nInformation on activated features:\n');

                    for (var i = 0; i < Private.meta.features.length; i+= 1) {
                        var feature_name = Private.meta.features[i];
                        var feature_object = Features[feature_name];

                        if (typeof feature_object === 'undefined') {
                            _log(i + 1 + '. ' + feature_name + " could not be found.", 'warn');
                        } else {
                            var feature_description;

                            if (typeof feature_object.description !== 'undefined') {
                                feature_description = '"' + feature_object.description + '"';
                            } else {
                                feature_description = "No description provided.";
                            }

                            _log((i + 1) + '. ' + feature_name + ' - ' + feature_description);
                        }
                    }
                }
            }
        },

        // wrapper for console.log
        log: function (what, type) {
            if (!Private.debug) { return; }

            if (typeof type === 'undefined') {
                type = 'log';
            }

            switch (type) {
            case 'warn':
                console.warn(what); break;
            case 'error':
                console.error(what); break;
            case 'info':
                console.info(what); break;
            default:
                console.log(what);
            }
        }
    };

    // let's make this available globally
    _log = Utils.log;

    // App

    App = {
        logic: {},

        init: function() {
            App.init_page();       // initialise page-specific JS, if it exists
            App.init_features();   // initialise all of the features
        },

        // run page-specific code
        init_page: function () {
            var page = Private.meta.page;
            if (typeof Pages[page] !== 'undefined' && typeof Pages[page].init !== 'undefined') {
                Pages[page].init.call();

                // call the action, if defined
                var action = Private.meta.action;
                if (action !== -1 && typeof Pages[page][action] !== 'undefined') {
                    Pages[page][action].call();
                }
            }
        },

        // initalise all required features
        init_features: function () {
            var features = Private.meta.features;
            for (var i = 0; i < features.length; i++) {
                if (typeof Features[features[i]] !== 'undefined' && typeof Features[features[i]].init !== 'undefined') {
                    Features[features[i]].init.call();
                }
            }
        }
    };

    return {
        Utils: Utils,
        Pages: Pages,
        Features: Features,
        App: App
    };

})(window.jQuery, window);

jQuery(document).ready(Sensi.App.init);
