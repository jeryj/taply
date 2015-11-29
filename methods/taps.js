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
                    owner: Meteor.userId()
                    }

        return Taps.insert(data);
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
        Meteor.call("isBevOwner", Meteor.userId(), bevId);

        // put it on tap
        Bevs.update(bevId, {
            $set : {onTap: tapId}
        });

        Taps.update(tapId, {
            $set : {onTap: bevId}
        });

    },

    tapEmpty: function(tapId, bevId) {
        Meteor.call("isTapOwner", Meteor.userId(), tapId);

        if(bevId != false) {
            Meteor.call("isBevOwner", Meteor.userId(), bevId);

            Bevs.update(bevId, {
                $set : {onTap: false}
            });
        }

        Taps.update(tapId, {
            $set : {onTap: false}
        });

    },

});