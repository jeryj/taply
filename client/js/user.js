Template.user.helpers({
    'userHasTaps': function(username){
        var hasTaps = TapLists.findOne({owner: username});
        if(hasTaps) {
            return true;
        } else {
            return false;
        }
    },

    'userTapLists': function(username){
        return TapLists.find({owner: username}, {sort: {name: 1}});
    },

    'userBevs': function(username){
        return Bevs.find({owner: username}, {sort: {name: 1}});
    },
});
