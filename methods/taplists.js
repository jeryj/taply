Meteor.methods({

    // TAPLIST METHODS
    addNewTapList: function(tapListName, numOfTaps) {
        // Make sure the user is logged in before inserting a taplist
        Meteor.call("isLoggedIn", Meteor.userId());

        // check to make sure the value is a string
        check(tapListName, String);

        // if they submitted an empty form (via console), create a new name for them
        if(tapListName === ""){
            tapListName = defaultName(currentUser);
        }

        numOfTaps = parseInt(numOfTaps);
        check(numOfTaps, Number);

        if(1000 < numOfTaps) {
            throw new Meteor.Error("too-many-taps", "More than 1000 taps? Dawg, you better fly us out to your place.");
        }

        if(numOfTaps < 1) {
            throw new Meteor.Error("no-taps", "What's the point of a Taplist with no taps?");
        }

        // create the slug
        var slug = Meteor.call("slugify", tapListName);
        check(slug, String);
        // check to make sure it's unique for this user
        var duplicate = TapLists.findOne({slug: slug, owner: Meteor.user().username});

        if(duplicate) {
            throw new Meteor.Error("duplicate-slug", "You already have a taplist with this name.");
        }


        var data = {
                    name: tapListName,
                    slug: slug,
                    createdAt: new Date(),
                    owner: Meteor.user().username,
                    ownerId: Meteor.userId()
                };

        // create the taplist
        var newTapListId = TapLists.insert(data);

        // now that we have our TapList, let's add our number of taps
        // loop through however many times we need to based on the number of taps

        var i = 0;
        while(i < numOfTaps) {
            Meteor.call("addNewTap", newTapListId, function(error, results) {
                if(error) {
                    console.log(error.reason);
                } else {
                    // success! Add the tap to the taplist
                    var newTap = results; // returns the id of the tap created
                }
            });
            i++;
        }

        return TapLists.findOne({_id: newTapListId});
    },

    // functionality for updating taplists (especially updating the number of taps logic)


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
