Template.addBev.events({
    'submit .add-bev': function(e) {
        e.preventDefault();

        var bevName = $('#beverage-name').val();
        var bevType = $('#beverage-type').val();

        bev = {
                    'name' : bevName,
                    'type' : bevType
                };


        // insert a bev into the collection
        Meteor.call("addNewBev", bev, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success! Add the tap to the taplist
                var newBev = results; // returns the id of the tap created
                Router.go('/user/'+newBev.owner);
            }
        });

    },
});

Template.bevLI.events({
    'click .delete-bev': function(e) {
        e.preventDefault();
        var bevId = this._id;

        // TODO: Give some kind of warning message

        Meteor.call("deleteBev", bevId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success!
                console.log(results);
            }
        });
    },
});

Template.bevs.helpers({
    'bevs': function(){
        return Bevs.find({owner: Meteor.user().username}, {sort: {name: 1}});
    }
});
