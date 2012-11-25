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
        }

        log: function (what) {
            if (DEBUG) {
                console.log(what);
            }
        }
    };

    var _log = Utils.log;

    // App

    App = {
        init: function() {
            Utils.settings.init(); // populate the meta values
            App.init_page();       // initialise page-specific JS, if it exists
            App.init_features();   // initialise all of the fetures
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
