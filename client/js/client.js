// global template helper
Template.registerHelper('isOwner', function(owner) {
    var isOwner = false;
    if(Meteor.userId() === owner) {
        isOwner = true;
    }

    return isOwner;
});

Template.registerHelper('ownerBevs', function(owner){
    return Bevs.find({owner: owner}, {sort: {name: 1}});
});

