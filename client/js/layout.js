Template.navigation.events({
    'click .logout': function(e) {
        e.preventDefault();
        // Meteor Logout function
        Meteor.logout();
        // Where to send the user after logout
        Router.go('home');
    }
});
