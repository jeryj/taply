Template.register.events({
    'submit form': function(e) {
        e.preventDefault();

        // Get the values
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();

        // Create the user
        Accounts.createUser({
            email: email,
            password: password
        }, function(error){
            if(error){
                console.log(error.reason); // Output error if registration fails
            } else {
                Router.go("home"); // Redirect user if registration succeeds
            }
        });

    }
});


Template.login.events({
    'submit form': function(e) {
        e.preventDefault();
        var email = $('[name=email]').val();
        var password = $('[name=password]').val();
        // Meteor premade function, just pass it the values
        Meteor.loginWithPassword(email, password, function(error){
            if(error){
                console.log(error.reason);
            } else {
                Router.go("home");
            }
        });
    }

});
