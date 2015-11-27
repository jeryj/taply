// global template helper
Template.registerHelper('isOwner', function(owner) {
    var isOwner = false;
    if(Meteor.userId() === owner) {
        isOwner = true;
    }

    return isOwner;
});
