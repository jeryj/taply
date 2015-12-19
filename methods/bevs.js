Meteor.methods({

    addNewBev: function(bev) {
        Meteor.call("isLoggedIn", Meteor.userId());

        // check to make sure the value is a string
        check(bev.name, String);

        if(bev.name === "") {
            throw new Meteor.Error("no-bev-name", "Yo! Enter a name for your bev.");
        }


        var data = {
                    name: bev.name,
                    type: bev.type,
                    onTap: false,
                    createdAt: new Date(),
                    owner: Meteor.user().username,
                    ownerId: Meteor.userId(),
                };

        var newBev = Bevs.insert(data);
        return Bevs.findOne({_id: newBev});
    },


    deleteBev: function(bevId) {
        // check permissions
        Meteor.call("isBevOwner", Meteor.userId(), bevId);

        var removeBevFromTap = [];
        // If it's on tap anywhere, remove it from being on tap
        Taps.find({onTap: bevId}, {fields: {_id: 1}}).forEach(function(obj) {
            removeBevFromTap.push(obj._id);
        });

        // if we have any on tap, set them to false ontap
        if(removeBevFromTap.length) {
            Taps.update({_id: {$in: removeBevFromTap}},
                {$set : {onTap: false}},
                {multi: true} // allows multiple to be updated
            );
        }
        // they own it, so... it's gone!
        // TODO: Soft delete, probably.
        Bevs.remove(bevId);
    },


});
