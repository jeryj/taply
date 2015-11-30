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
                var newTap = results; // returns the id of the tap created
                var tapList = TapLists.findOne({_id: newTap.tapList});
                // go back to taplist
                Router.go('/taplist/'+newTap.owner+'/'+tapList.name);
            }
        });

    },
});

Template.editTapForm.events({
    'submit .edit-tap': function(e) {
        e.preventDefault();
        var tapId = this._id;

        var tapName = $('#tap-name').val();
        var tapLocation = $('#tap-location').val();
        tapLocation = parseInt(tapLocation, 10);
        var tapDesignator = $('#tap-designator').val();

        tap = {
                    'name' : tapName,
                    'location' : tapLocation,
                };


        // insert a tap into the collection
        Meteor.call("editTap", tap, tapId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success! Add the tap to the taplist
                var id = results; // returns the id of the tap created
                // go back to taplist
                var editedTap = results;
                var tapList = TapLists.findOne({_id: editedTap.tapList});

                Router.go('/taplist/'+editedTap.owner+'/'+tapList.name);
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
