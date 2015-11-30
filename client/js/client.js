// global template helper
Template.registerHelper('isOwner', function(ownerId) {
    var isOwner = false;
    if(Meteor.userId() === ownerId) {
        isOwner = true;
    }

    return isOwner;
});

Template.registerHelper('ownerBevs', function(ownerId){
    return Bevs.find({ownerId: ownerId}, {sort: {name: 1}});
});
