Sparkles.Pages['page1'] = {

    description: "This is page one of the site. It doesn't do a lot.",

    init: function () {
        console.log("Initialising page 1");
        Sparkles.Pages['page1'].extra();
    },

    extra: function () {
        console.log("Extra function on page 1");
    }

};
