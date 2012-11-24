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
                Utils.settings.meta.page = $('meta[name="page"]').attr("content");

                var userid = $('meta[name="userid"]').attr("content");
                if (typeof userid !== 'undefined') {
		    Utils.settings.meta.currentUser = userid;
                }

                Utils.settings.meta.features = $('meta[name="features"]').attr("content").split(' ');
            }
        },
        cache: {
            window: window,
            document: document
        },
        log: function (what) {
            if (DEBUG) {
                console.log(what);
            }
        },
        init_page: function () {
            var page = Utils.settings.meta.page;

            if (typeof Pages[page] === 'undefined') {
                return;
            }

            if (typeof Pages[page].init !== 'undefined') {
                Pages[page].init.call();
            }
        },
        init_features: function () {
            var features = Utils.settings.meta.features;

            for (var i = 0; i < features.length; i++) {
                if (typeof Features[features[i]] !== 'undefined' && typeof Features[features[i]].init !== 'undefined') {
                    Features[features[i]].init.call();
                }
            }
        }
    };

    _log = Utils.log; // expose it globally... what's the worst that could happen

    // App

    App = {
        init: function() {
            Utils.settings.init();
            Utils.init_page();
            Utils.init_features();
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
