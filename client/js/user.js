Template.user.helpers({
    'userTapLists': function(username){
        return TapLists.find({owner: username}, {sort: {name: 1}});
    },

    'userBevs': function(username){
        return Bevs.find({owner: username}, {sort: {name: 1}});
    },
});
