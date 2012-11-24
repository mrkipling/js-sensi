Sensi.Features['append-content'] = {

    description: "Appends some content to the #content element.",

    init: function () {
        $('#content').append('<p>Hello! I am appending content to this element.</p>');
        Sensi.Features['append-content'].extra();
    },

    extra: function () {
        $('#content').append('<p><strong>Bonus function:</strong> I think that you are perdy.</p>');
    }

};
