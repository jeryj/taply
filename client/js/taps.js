Template.addTapForm.events({
    'submit .add-tap': function(e) {
        e.preventDefault();
        var tapListId = this._id;

        var tapName = $('#tap-name').val();
        var tapLocation = $('#tap-location').val();
        tapLocation = parseInt(tapLocation, 10);
        var tapDesignator = $('#tap-designator').val();

        tap = {
                    'name' : tapName,
                    'location' : tapLocation,
                };


        // insert a tap into the collection
        Meteor.call("addNewTap", tap, tapListId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success! Add the tap to the taplist
                var id = results; // returns the id of the tap created
                // go back to taplist
                Router.go('/taplist/'+tapListId);
            }
        });

    },
});

Template.taps.helpers({
    'taps': function(tapListId){
        // return taps of the current tapListId
        return Taps.find({tapList: tapListId}, {sort: {location: 1}});
    },

    'isOnTap': function(tapId) {
        var whatsOnTap = Bevs.find({onTap: tapId});

        if(whatsOnTap != false) {
            return whatsOnTap;
        }

        return false;
    }

});

Template.taps.events({
    'click .delete-tap': function(e) {
        e.preventDefault();
        var tapId = this._id;

        // TODO: Give some kind of warning message

        Meteor.call("deleteTap", tapId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success!
                console.log('Deleted '+tapId);
            }
        });
    },

    'submit .put-on-tap': function(e) {
        e.preventDefault();
        var tapId = this._id;
        var form = event.target;

        var bevId = $('.put-on-tap-bev-list option:selected', form).attr('data-bevID')

        Meteor.call("putOnTap", tapId, bevId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success!
                console.log('Put on Tap '+bevId);
            }
        });
    },

});
