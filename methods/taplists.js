Meteor.methods({

    // TAPLIST METHODS
    addNewTapList: function(tapListName) {
        // Make sure the user is logged in before inserting a taplist
        Meteor.call("isLoggedIn", Meteor.userId());

        // check to make sure the value is a string
        check(tapListName, String);

        // if they submitted an empty form (via console), create a new name for them
        if(tapListName === ""){
            tapListName = defaultName(currentUser);
        }

        // create the slug
        var data = {
                    name: tapListName,
                    createdAt: new Date(),
                    owner: Meteor.user().username,
                    ownerId: Meteor.userId()
                };

        // using return statement so it'll pass back to the function that called this
        return TapLists.insert(data);
    },


    deleteTapList: function(tapListId) {
        // Make sure the user has permissions to be here
        Meteor.call("isTapListOwner", Meteor.userId(), tapListId);

        // they own it, so... it's gone!
        // TODO: Soft delete, probably.

        // delete the taps associated with that tapList
        Taps.remove({tapList: tapListId});
        // delete the taplist
        TapLists.remove(tapListId);

    },
});
