Template.addTap.events({
    'click .add-tap': function(e) {
        e.preventDefault();
        var tapListId = this._id;

        // insert a tap into the collection
        Meteor.call("addNewTap", tapListId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success! Add the tap to the taplist
                var newTap = results; // returns the id of the tap created
            }
        });

    },
});

Template.taps.helpers({
    'taps': function(tapListId){
        // return taps of the current tapListId
        return Taps.find({tapList: tapListId}, {sort: {location: 1}});
    },

    'whatsOnTap': function(bevId) {

      var whatsOnTap = Bevs.findOne({_id: bevId});
      console.log(whatsOnTap);
      if(whatsOnTap !== null) {
          return whatsOnTap;
      }

      return false;
    },

    'tapCount' : function(i) { // index starts with 0, we want it to start with 1
        return i + 1;
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
