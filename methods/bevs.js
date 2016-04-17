Meteor.methods({

    addNewBev: function(bev) {
        Meteor.call("isLoggedIn", Meteor.userId());

        bev = Meteor.call('validateBev', bev);

        var data = {
                    name: bev.name,
                    bev: 'beer',
                    type: bev.type,
                    bjcpCategory: bev.bjcpCategory,
                    bjcpSubcategory: bev.bjcpSubcategory,
                    abv: bev.abv,
                    srm: bev.srm,
                    ibu: bev.ibu,
                    og: bev.og,
                    fg: bev.fg,
                    notes: bev.notes,
                    brewDate: bev.brewDate,
                    bornOn: bev.bornOn,
                    onTap: false,
                    createdAt: new Date(),
                    owner: Meteor.user().username,
                    ownerId: Meteor.userId(),
                };

        var newBev = Bevs.insert(data);
        return Bevs.findOne({_id: newBev});
    },

    updateBev: function(bev) {
        // check to make sure they own this beer
        // Make sure the user has permissions to be here
        Meteor.call("isBevOwner", Meteor.userId(), bev._id);

        bev = Meteor.call('validateBev', bev);


        var newBev = Bevs.update(bev._id, {
                                $set : {
                                    name: bev.name,
                                    bev: 'beer',
                                    type: bev.type,
                                    bjcpCategory: bev.bjcpCategory,
                                    bjcpSubcategory: bev.bjcpSubcategory,
                                    abv: bev.abv,
                                    srm: bev.srm,
                                    ibu: bev.ibu,
                                    og: bev.og,
                                    fg: bev.fg,
                                    notes: bev.notes,
                                    brewDate: bev.brewDate,
                                    bornOn: bev.bornOn,
                                    }
                            });
        return Bevs.findOne({_id: bev._id});
    },


    deleteBev: function(bevId) {
        // check permissions
        Meteor.call("isBevOwner", Meteor.userId(), bevId);

        var removeBevFromTap = [];
        // If it's on tap anywhere, remove it from being on tap
        Taps.find({onTap: bevId}, {fields: {_id: 1}}).forEach(function(obj) {
            removeBevFromTap.push(obj._id);
        });

        // if we have any on tap, set them to false ontap
        if(removeBevFromTap.length) {
            Taps.update({_id: {$in: removeBevFromTap}},
                {$set : {onTap: false}},
                {multi: true} // allows multiple to be updated
            );
        }
        // they own it, so... it's gone!
        // TODO: Soft delete, probably.
        Bevs.remove(bevId);
    },

    validateBev: function(bev) {
        // check to make sure the value is a string
        check(bev.name, String);

        if(bev.name === "") {
            throw new Meteor.Error("no-bev-name", "Yo! Enter a name for your bev.");
        }

        //check(bev.abv, Match.Integer);
        // if no value was passed, set it to 0
        if(bev.abv !== '' && bev.abv !== undefined && bev.abv !== 'NaN') {
            bev.abv = parseFloat(bev.abv).toFixed(1);
            if(bev.abv > 100) {
                throw new Meteor.Error("bev-abv-too-high", "Really, dawg? Your bev can't be that dank.");
            }
        } else {
            bev.abv = '';
        }

        if(bev.srm !== '' && bev.srm !== undefined  && bev.srm !== 'NaN') {
            bev.srm = parseInt(bev.srm);
            check(bev.srm, Number);
            if(bev.srm > 40 || bev.srm < 1) {
                throw new Meteor.Error("bev-srm-not-real", "Dude, you wrooaaaaang.");
            }
        } else {
            bev.srm = '';
        }

        if(bev.ibu !== '' && bev.ibu !== undefined  && bev.ibu !== 'NaN') {
            bev.ibu = parseInt(bev.ibu);
            check(bev.ibu, Number);
            if(bev.ibu > 500 || bev.ibu < 0) {
                throw new Meteor.Error("bev-ibu-not-real", "Dude, you wrooaaaaang.");
            }
        } else {
            bev.ibu = '';
        }

        if(bev.og !== '' && bev.og !== undefined  && bev.og !== 'NaN') {
            // check for a decimal before
            bev.og = parseFloat(bev.og).toFixed(3);
            if(bev.og > 2 || bev.og < 1) {
                throw new Meteor.Error("bev-og-not-real", "Dude, you wrooaaaaang.");
            }
        } else {
            bev.og = '';
        }

        if(bev.fg !== '' && bev.fg !== undefined  && bev.fg !== 'NaN') {
            bev.fg = parseFloat(bev.fg).toFixed(3);
            if(bev.fg > 2 || bev.fg < 1) {
                throw new Meteor.Error("bev-fg-not-real", "Dude, you wrooaaaaang.");
            }
        } else {
            bev.fg = '';
        }

        return bev;
    }

});
