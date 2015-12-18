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
            Meteor.call("addNewTap", newTapListId);
            i++;
        }

        return TapLists.findOne({_id: newTapListId});
    },

    // functionality for updating taplists (especially updating the number of taps logic)

    // TAPLIST METHODS
    updateTapList: function(tapList, tapListName, numOfTaps) {
        // Make sure the user is logged in before inserting a taplist
        Meteor.call("isLoggedIn", Meteor.userId());

        // check to make sure the value is a string
        check(tapListName, String);

        // if they submitted an empty form (via console), create a new name for them
        if(tapListName === ""){
            throw new Meteor.Error("no-taplist-name", "Yo! Name yo taplist!");
        }

        numOfTaps = parseInt(numOfTaps);
        check(numOfTaps, Number);

        if(1000 < numOfTaps) {
            throw new Meteor.Error("too-many-taps", "More than 1000 taps? Dawg, you better fly us out to your place to drink some o dat.");
        }

        if(numOfTaps < 1) {
            throw new Meteor.Error("no-taps", "What's the point of a Taplist with no taps, dawg?");
        }

        // create the slug
        var slug = Meteor.call("slugify", tapListName);
        check(slug, String);

        // see if the existing slug equals the newly made one
        if(tapList.slug === slug) {
            // name wasn't updated
            // no need to check to see if there's a duplicate
        } else {
            // slug is new. check to make sure there's no duplicate for this user
            var duplicate = TapLists.findOne({slug: slug, owner: Meteor.user().username});
            if(duplicate) {
                throw new Meteor.Error("duplicate-slug", "You already have a taplist with this name. Get dem creative juices flowin, dawg.");
            }
        }

        // update the taplist
        var updateTapListId = TapLists.update(tapList._id, {
                                $set : {name: tapListName, slug: slug }
                            });

        // check if the tap number has changed
        var existingTaps = Taps.find({tapList: tapList._id}).count();
        if(numOfTaps !== existingTaps) {
            // check to see if we need to add/remove taps
            if(numOfTaps < existingTaps) { // delete taps
                // find the difference
                var delete_this_many_taps = existingTaps - numOfTaps;
                var tapsToDelete = Taps.find({}, {fields: {_id: 1}, sort: {createdAt: -1}, limit: delete_this_many_taps}).fetch();
                // not working yet...
                // Taps.remove({_id: {$in: tapsToDelete}});
                //return false;
            } else { // add taps

                var i = 0;
                add_this_many_taps = numOfTaps - existingTaps;
                while(i < add_this_many_taps) {
                    Meteor.call("addNewTap", tapList._id);
                    i++;
                }
            }

        }

        return TapLists.findOne({_id: tapList._id});
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
