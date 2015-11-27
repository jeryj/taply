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
        isTapOwner(Meteor.userId(), tapId);

        // they own it, so... it's gone!
        // TODO: Soft delete, probably.
        Taps.remove(tapId);
    },

});
