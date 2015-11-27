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

Template.navigation.events({
    'click .logout': function(e) {
        e.preventDefault();
        // Meteor Logout function
        Meteor.logout();
        // Where to send the user after logout
        Router.go('home');
    }
});

Template.tapLists.helpers({
    'tapList': function(){
        return TapLists.find({archived: false}, {sort: {name: 1}});
    },

});

Template.archivedTapLists.helpers({
    'archivedTapList': function(){
        return TapLists.find({archived: true}, {sort: {name: 1}});
    },
});

Template.tapLists.events({
    'click .delete-taplist': function(e) {
        e.preventDefault();
        var tapListId = this._id;

        // TODO: Give some kind of warning message

        Meteor.call("deleteTapList", tapListId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success!
                console.log('Deleted '+tapListId);
            }
        });
    },

    'click .archive-taplist': function(e) {
        e.preventDefault();
        var tapListId = this._id;

        Meteor.call("archiveTapList", tapListId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success!
                console.log('Archived '+tapListId);
            }
        });
    },

    'click .unarchive-taplist': function(e) {
        e.preventDefault();
        var tapListId = this._id;

        Meteor.call("unarchiveTapList", tapListId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success!
                console.log('UnArchived '+tapListId);
            }
        });
    },
});

Template.addTapList.events({
    'submit form': function(e) {
        e.preventDefault();
        var tapListName = $('[name=name]').val();

        // Insert a taplist into the collection
        Meteor.call("addNewTapList", tapListName, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // send them to the page they created
                var id = results; // returns the id of the page created
                var taplistURL = '/taplist/'+id;
                Router.go(taplistURL);
            }
        });

        // clear the name value
        $('[name=name]').val('');
    }

});

Template.addTapForm.events({
    'submit .add-tap': function(e) {
        e.preventDefault();
        var tapListId = this._id;

        var tapName = $('#tap-name').val();
        var tapLocation = $('#tap-location').val();
        tapLocation = parseInt(tapLocation, 10);
        var tapDesignator = $('#tap-designator').val();

        tap = {
                    'name' : tapName,
                    'location' : tapLocation,
                };


        // insert a tap into the collection
        Meteor.call("addNewTap", tap, tapListId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success! Add the tap to the taplist
                var id = results; // returns the id of the tap created
                // go back to taplist
                Router.go('/taplist/'+tapListId);
            }
        });

    },
});

Template.taps.helpers({
    'taps': function(tapListId){
        // return taps of the current tapListId
        return Taps.find({tapList: tapListId}, {sort: {location: 1}});
    }
});

Template.archivedBevs.helpers({
    'archivedBevs': function(tapListId){
        // return taps of the current tapListId
        return Bevs.find({tapList: tapListId, onTap: false}, {sort: {name: 1}});
    }
});

Template.bevs.helpers({
    'bevs': function(tapListId){
        // return taps of the current tapListId
        return Bevs.find({tapList: tapListId}, {sort: {name: 1}});
    }
});

Template.taps.events({
    'click .delete-tap': function(e) {
        e.preventDefault();
        var tapId = this._id;

        // TODO: Give some kind of warning message

        Meteor.call("deleteTap", tapId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success!
                console.log('Deleted '+tapId);
            }
        });
    },

    'click .archive-tap': function(e) {
        e.preventDefault();
        var tapId = this._id;

        Meteor.call("archiveTap", tapId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success!
                console.log('Archived '+tapId);
            }
        });
    },

});

Template.archivedBevs.events({
    'click .unarchive-bev': function(e) {
        e.preventDefault();
        var tapId = this._id;

        // TODO: Give some kind of warning message
        Meteor.call("unarchiveTap", tapId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success!
                console.log('Unarchived '+tapId);
            }
        });
    }
});

Template.addBev.events({
    'submit .add-bev': function(e) {
        e.preventDefault();

        var bevName = $('#beverage-name').val();
        var bevType = $('#beverage-type').val();

        bev = {
                    'name' : bevName,
                    'type' : bevType
                };


        // insert a bev into the collection
        Meteor.call("addNewBev", bev, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success! Add the tap to the taplist
                var id = results; // returns the id of the tap created
                console.log(id);
            }
        });

    },
});

// global template helper
Template.registerHelper('isOwner', function(owner) {
    var isOwner = false;
    if(Meteor.userId() === owner) {
        isOwner = true;
    }

    return isOwner;
});
