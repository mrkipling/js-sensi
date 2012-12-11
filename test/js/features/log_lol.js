Sensi.Features.log_lol = {

    description: "Logs the word 'lol' to the console. That's it.",

    init: function () {
        _log("lol");
        Sensi.Features.log_lol.extra();
    },

    extra: function () {
        _log("Bonus function: dongs");
    }

};
