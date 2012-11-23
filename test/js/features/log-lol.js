Sparkles.Features['log-lol'] = {

    description: "Logs the word 'lol' to the console. That's it.",

    init: function () {
        _log("lol");
        Sparkles.Features['log-lol'].extra();
    },

    extra: function () {
        _log("Bonus function: dongs");
    }

};
