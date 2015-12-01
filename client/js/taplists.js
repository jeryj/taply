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

        // Insert a taplist into the collection
        Meteor.call("addNewTapList", tapListName, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // send them to the page they created
                var id = results; // returns the id of the page created
                var taplistURL = '/taplist/'+Meteor.user().username+'/'+tapListName;
                Router.go(taplistURL);
            }
        });

        // clear the name value
        $('[name=name]').val('');
    }

});
