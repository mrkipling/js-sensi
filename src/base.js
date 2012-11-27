var Sensi = Sensi || (function ($) {

    var Utils    = {}, // settings and toolbox
        Pages    = {}, // page-specific logic
        Features = {}, // generic re-usable features
        App      = {}; // global logic and initialiser

    // if not defined, let's assume that we're not in debug mode

    if (typeof DEBUG === 'undefined') {
        DEBUG = false;
    }

    // Utils

    Utils = {
        settings: {
            meta: {
                page: -1,
                action: -1,
                features: [],
                current_user: -1
            },

            init: function() {
                // get the page name
                var page = $('meta[name="page"]').attr("content");
                if (typeof page !== 'undefined' && page !== '') {
                    Utils.settings.meta.page = page;
                }

                // get the action
                var action = $('meta[name="action"]').attr("content");
                if (typeof action !== 'undefined' && action !== '') {
                    Utils.settings.meta.action = action;
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

                Utils.settings.meta.features = features;

                // get the current user ID
                var userid = $('meta[name="userid"]').attr("content");
                if (typeof userid !== 'undefined' && userid !== '') {
                    Utils.settings.meta.current_user = userid;
                }
            },

            info: function () {
                if (!DEBUG) { return; }

                _log('Page: ' + (Utils.settings.meta.page === -1 ? 'not defined' : Utils.settings.meta.page));
                _log('Action: ' + (Utils.settings.meta.action === -1 ? 'not defined' : Utils.settings.meta.action));
                _log('\nInformation on activated features:\n');

                for (var i = 0; i < Utils.settings.meta.features.length; i+= 1) {
                    var feature_name = Utils.settings.meta.features[i];
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
        },

        // wrapper for console.log
        log: function (what, type) {
            if (DEBUG) {
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
        }
    };

    // let's make this available globally
    _log = Utils.log;

    // App

    App = {
        logic: {},

        init: function() {
            Utils.settings.init(); // populate the meta values
            App.init_page();       // initialise page-specific JS, if it exists
            App.init_features();   // initialise all of the fetures
        },

        // run page-specific code
        init_page: function () {
            var page = Utils.settings.meta.page;
            if (typeof Pages[page] !== 'undefined' && typeof Pages[page].init !== 'undefined') {
                Pages[page].init.call();

                // call the action, if defined
                var action = Utils.settings.meta.action;
                if (action !== -1 && typeof Pages[page][action] !== 'undefined') {
                    Pages[page][action].call();
                }
            }
        },

        // initalise all required features
        init_features: function () {
            var features = Utils.settings.meta.features;
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

})(window.jQuery);

jQuery(document).ready(Sensi.App.init);
