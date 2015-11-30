// global template helper
Template.registerHelper('isOwner', function(ownerId) {
    var isOwner = false;
    if(Meteor.userId() === ownerId) {
        isOwner = true;
    }

    return isOwner;
});

Template.registerHelper('ownerBevs', function(owner){
    return Bevs.find({owner: owner}, {sort: {name: 1}});
});
