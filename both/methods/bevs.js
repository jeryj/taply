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
                    owner: Meteor.userId(),
                    }

        return Bevs.insert(data);
    },


    archiveBev: function(bevId) {
        isBevOwner(Meteor.userId(), bevId);

        Bevs.update(bevId, {
            $set : {archived: true}
        });
    },

    unarchiveBev: function(bevId) {
        isBevOwner(Meteor.userId(), bevId);

        Bevs.update(bevId, {
            $set : {archived: false}
        });
    },

});
