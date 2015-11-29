Template.user.helpers({
    'userTapLists': function(username){
        var user = Meteor.users.findOne({ "username" : username });
        return TapLists.find({owner: user._id}, {sort: {name: 1}});
    },

    'userBevs': function(username){
        var user = Meteor.users.findOne({ "username" : username });
        return Bevs.find({owner: user._id}, {sort: {name: 1}});
    },
});
