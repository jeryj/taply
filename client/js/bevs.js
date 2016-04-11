Template.addBev.events({
    'submit .add-bev': function(e) {
        e.preventDefault();

        var bevName = $('#beverage-name').val();
        var bevType = $('#beverage-type').val();
        var bevABV = $('#beverage-abv').val();
        var bevSRM = $('#beverage-srm').val();
        var bevIBU = $('#ibu').val();
        var bevOG = $('#og').val();
        var bevFG = $('#fg').val();
        var brewDate = $('#brew-date').val();
        var bornOn = $('#born-on').val();

        bev = {
                    'name' : bevName,
                    'type' : bevType,
                    'abv' : bevABV,
                    'srm' : bevSRM,
                    'ibu' : bevIBU,
                    'og' : bevOG,
                    'fg' : bevFG,
                    'brewDate' : brewDate,
                    'bornOn' : bornOn,
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

Template.addBev.helpers({
    'styles': function() {

        Meteor.call("getBeerStyles", function(error, results) {
            if(error) {
                console.log('the error is '+error.reason);
            } else {
                //console.log(results);
                return results;
            }
        });
    },
});

Template.editBev.events({
    'submit .edit-bev': function(e) {
        e.preventDefault();

        var bevName = $('#beverage-name').val();
        var bevType = $('#beverage-type').val();
        var bevABV = $('#beverage-abv').val();
        var bevSRM = $('#beverage-srm').val();
        var bevIBU = $('#ibu').val();
        var bevOG = $('#og').val();
        var bevFG = $('#fg').val();
        var brewDate = $('#brew-date').val();
        var bornOn = $('#born-on').val();

        bev = {
                    '_id':  this._id, // this._id, this.owner, this.ownerId
                    'name' : bevName,
                    'type' : bevType,
                    'abv' : bevABV,
                    'srm' : bevSRM,
                    'ibu' : bevIBU,
                    'og' : bevOG,
                    'fg' : bevFG,
                    'brewDate' : brewDate,
                    'bornOn' : bornOn,
                };


        // edit a bev
        Meteor.call("updateBev", bev, function(error, results) {
            if(error) {
                console.log(error.reason);
            } else {
                // success! Add the tap to the taplist
                var bev = results; // returns the id of the tap
                Router.go('/user/'+bev.owner);
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
