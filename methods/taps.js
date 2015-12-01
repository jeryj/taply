Meteor.methods({

    addNewTap: function(parentID) {
        Meteor.call("isLoggedIn", Meteor.userId());

        // check to make sure the value is a string
        check(parentID, String);

        if(parentID === "") {
            throw new Meteor.Error("no-parent-ID", "Yo! Don't delete our vals. Not cool.");
        }

        var data = {
                        onTap: false,
                        tapList: parentID,
                        createdAt: new Date(),
                        owner: Meteor.user().username,
                        ownerId: Meteor.userId()
                    };

        var newTapId = Taps.insert(data);

        return Taps.findOne({_id: newTapId});
    },

    deleteTap: function(tapId) {
        // check permissions
        Meteor.call("isTapOwner", Meteor.userId(), tapId);

        // they own it, so... it's gone!
        // TODO: Soft delete, probably.
        Taps.remove(tapId);
    },

    putOnTap: function(tapId, bevId) {
        // check permissions
        Meteor.call("isTapOwner", Meteor.userId(), tapId);

        Taps.update(tapId, {
            $set : {onTap: bevId}
        });

    },

    removeBevFromTap: function(tapId) {
        Meteor.call("isTapOwner", Meteor.userId(), tapId);

        Taps.update(tapId, {
            $set : {onTap: false}
        });

    },

});
