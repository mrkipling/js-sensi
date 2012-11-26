var Sensi = Sensi || (function ($) {

    var Utils    = {}, // toolbox
        Pages    = {}, // page-specific logic
        Features = {}, // generic re-usable features
        App      = {}; // global logic and initialiser

    Utils = {
        settings: {
            meta: {
                page: -1,
                features: [],
                currentUser: -1
            },

            init: function() {
                // get the page name
                Utils.settings.meta.page = $('meta[name="page"]').attr("content");

                // get the current user ID
                var userid = $('meta[name="userid"]').attr("content");
                if (typeof userid !== 'undefined') {
		    Utils.settings.meta.currentUser = userid;
                }

                // get the list of features
                Utils.settings.meta.features = $('meta[name="features"]').attr("content").split(' ');
            },

            info: function () {
                if (!DEBUG) { return; }

                _log('\nCurrently active page: ' + (Utils.settings.meta.page === -1 ? 'not defined' : Utils.settings.meta.page));
                _log('Information on activated features:\n');

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

        // run page-specific code
        init_page: function () {
            var page = Utils.settings.meta.page;
            if (typeof Pages[page] !== 'undefined' && typeof Pages[page].init !== 'undefined') {
                Pages[page].init.call();
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
        init: function() {
            Utils.settings.init(); // populate the meta values
            Utils.init_page();       // initialise page-specific JS, if it exists
            Utils.init_features();   // initialise all of the fetures
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
