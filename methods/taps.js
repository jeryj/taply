Meteor.methods({

    addNewTap: function(tap, parentID) {
        Meteor.call("isLoggedIn", Meteor.userId());

        // check to make sure the value is a string
        check(tap.name, String);

        if(tap.name == "") {
            throw new Meteor.Error("no-tap-name", "Yo! Enter a name for your tap.");
        }

        // check that value is an integer
        check(tap.location, Number);
        if(tap.location < 1) {
            throw new Meteor.Error("tap-location-too-low", "Yo! Enter a higher tap location value.");
        }

        if(1000 < tap.location) {
            throw new Meteor.Error("tap-location-too-high", "Really, dawg? You got 1000 taps?");
        }

        // check to make sure the value is a string
        check(parentID, String);

        if(parentID == "") {
            throw new Meteor.Error("no-parent-ID", "Yo! Don't delete our vals. Not cool.");
        }

        var data = {
                        name: tap.name,
                        location: tap.location,
                        onTap: false,
                        tapList: parentID,
                        createdAt: new Date(),
                        owner: Meteor.user().username,
                        ownerId: Meteor.userId()
                    };

        var newTapId = Taps.insert(data);

        return Taps.findOne({_id: newTapId});
    },

    editTap: function(tap, tapId) {
        Meteor.call("isTapOwner", Meteor.userId(), tapId);

        var data = {
          name: tap.name,
          location: tap.location
        };

        Taps.update(tapId, {
          $set : data
        });

        return Taps.findOne({_id: tapId});
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
