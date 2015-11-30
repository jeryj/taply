Meteor.methods({

    addNewBev: function(bev) {
        Meteor.call("isLoggedIn", Meteor.userId());

        // check to make sure the value is a string
        check(bev.name, String);

        if(bev.name == "") {
            throw new Meteor.Error("no-bev-name", "Yo! Enter a name for your bev.");
        }


        var data = {
                    name: bev.name,
                    type: bev.type,
                    onTap: false,
                    createdAt: new Date(),
                    owner: Meteor.user().username,
                    ownerId: Meteor.userId(),
                    }

        return Bevs.insert(data);
    },


    deleteBev: function(bevId) {
        // check permissions
        Meteor.call("isBevOwner", Meteor.userId(), bevId);

        // they own it, so... it's gone!
        // TODO: Soft delete, probably.
        Bevs.remove(bevId);
    },


});
