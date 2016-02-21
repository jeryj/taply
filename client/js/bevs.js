Template.addBev.events({
    'submit .add-bev': function(e) {
        e.preventDefault();

        var bevName = $('#beverage-name').val();
        var bevType = $('#beverage-type').val();
        var bevABV = parseFloat($('#beverage-abv').val()).toFixed(1);
        var bevSRM = parseInt($('#beverage-srm').val());
        var bevIBU = parseInt($('#ibu').val());
        var bevOG = parseFloat($('#og').val()).toFixed(3);
        var bevFG = parseFloat($('#fg').val()).toFixed(3);

        bev = {
                    'name' : bevName,
                    'type' : bevType,
                    'abv' : bevABV,
                    'srm' : bevSRM,
                    'ibu' : bevIBU,
                    'og' : bevOG,
                    'fg' : bevFG,
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

Template.editBev.events({
    'submit .edit-bev': function(e) {
        e.preventDefault();

        var bevName = $('#beverage-name').val();
        var bevType = $('#beverage-type').val();
        var bevABV = parseFloat($('#beverage-abv').val()).toFixed(1);
        var bevSRM = parseInt($('#beverage-srm').val());
        var bevIBU = parseInt($('#ibu').val());
        var bevOG = parseFloat($('#og').val()).toFixed(3);
        var bevFG = parseFloat($('#fg').val()).toFixed(3);

        bev = {
                    '_id':  this._id, // this._id, this.owner, this.ownerId
                    'name' : bevName,
                    'type' : bevType,
                    'abv' : bevABV,
                    'srm' : bevSRM,
                    'ibu' : bevIBU,
                    'og' : bevOG,
                    'fg' : bevFG,
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
