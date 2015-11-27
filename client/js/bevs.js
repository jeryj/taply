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
                var id = results; // returns the id of the tap created
                console.log(id);
            }
        });

    },
});

Template.bevs.events({
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
    'bevs': function(tapListId){
        // return taps of the current tapListId
        return Bevs.find({tapList: tapListId}, {sort: {name: 1}});
    }
});

Template.archivedBevs.helpers({
    'archivedBevs': function(tapListId){
        // return taps of the current tapListId
        return Bevs.find({tapList: tapListId, onTap: false}, {sort: {name: 1}});
    }
});

Template.archivedBevs.events({
    'click .unarchive-bev': function(e) {
        e.preventDefault();
        var tapId = this._id;

        // TODO: Give some kind of warning message
        Meteor.call("unarchiveTap", tapId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success!
                console.log('Unarchived '+tapId);
            }
        });
    }
});

