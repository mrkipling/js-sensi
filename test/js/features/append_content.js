Sensi.Features['append_content'] = {

    description: "Appends some content to the #content element.",

    init: function () {
        $('#content').append('<p>Hello! I am appending content to this element.</p>');
        Sensi.Features['append_content'].extra();
    },

    extra: function () {
        $('#content').append('<p><strong>Bonus function:</strong> user ' + (Sensi.App.user_logged_in() ? 'is' : 'is not') + ' logged in.</p>');
    }

};
