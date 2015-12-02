Template.tapLists.helpers({
    'tapList': function(){
        return TapLists.find({}, {sort: {name: 1}});
    },
});

Template.tapListLI.events({
    'click .delete-taplist': function(e) {
        e.preventDefault();
        var tapListId = this._id;

        // TODO: Give some kind of warning message

        Meteor.call("deleteTapList", tapListId, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success!
                console.log('Deleted '+tapListId);
            }
        });
    },

});

Template.addTapList.events({
    'submit form': function(e) {
        e.preventDefault();
        var tapListName = $('[name=name]').val();
        var numOfTaps = $('[name=number-of-taps]').val();

        // Insert a taplist into the collection
        Meteor.call("addNewTapList", tapListName, numOfTaps, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // send them to the page they created
                var newTapList = results; // returns the id of the page created
                Router.go('/taplist/'+Meteor.user().username+'/'+newTapList.slug);
            }
        });
    }

});
