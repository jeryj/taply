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

    'click .remove-bev-from-tap': function(e) {
        e.preventDefault();
        var tapId = this._id;

        // TODO: Give some kind of warning message

        Meteor.call("removeBevFromTap", tapId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success!
                console.log('Removed bev from ' +tapId);
            }
        });
    },

    'submit .put-on-tap': function(e) {
        e.preventDefault();
        var tapId = this._id;
        var form = event.target;

        var bevId = $('.put-on-tap-bev-list option:selected', form).attr('data-bevID');

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
