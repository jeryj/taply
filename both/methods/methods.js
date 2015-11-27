Meteor.methods({

    defaultName: function(currentUser) {
        var nextLetter = 'A'
        var nextName = 'TapList ' + nextLetter;
        while (TapLists.findOne({ name: nextName, owner: currentUser })) {
            nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
            nextName = 'TapList ' + nextLetter;
        }
        return nextName;
    },

    // Some reusablections to help us out
    isTapOwner: function(userId, tapId) {
        isLoggedIn(userId);

        // check to make sure that the taplist is owned by the current user
        theTap = Taps.findOne({ _id: tapId });
        // if they don't own the tap, throw an error
        if(theTap.owner !== userId) {
            throw new Meteor.Error("tap-not-owned-by-user", "You don't own this Tap. What do you think you're doin', bud?.");
        }

        return true;
    },

    isBevOwner: function(userId, bevId) {
        isLoggedIn(userId);

        // check to make sure that the bevlist is owned by the current user
        theBev = Bevs.findOne({ _id: bevId });
        // if they don't own the bev, throw an error
        if(theBev.owner !== userId) {
            throw new Meteor.Error("bev-not-owned-by-user", "You don't own this Beverage. What do you think you're doin', bud?.");
        }

        return true;
    },

    isTapListOwner: function(userId, tapListId) {
        Meteor.call("isLoggedIn", userId);

        // check to make sure that the taplist is owned by the current user
        theTapList = TapLists.findOne({ _id: tapListId });
        // if they don't own the tap, throw an error
        if(theTapList.owner !== userId) {
            throw new Meteor.Error("taplist-not-owned-by-user", "You don't own this TapList. What do you think you're doin', bud?.");
        }

        return true;
    },

    isLoggedIn: function(userId) {
        // Make sure the user is logged in before inserting a tap
        if(! userId) {
          throw new Meteor.Error("not-logged-in", "You're not logged-in.");
        }

        return true;
    },

});


