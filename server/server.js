Meteor.publish("taplists", function() {
    return TapLists.find();
});

Meteor.publish("taps", function() {
    return Taps.find();
});

Meteor.publish("bevs", function() {
    return Bevs.find();
});

Meteor.publish("userData", function() {
    // just return username and ID
    return Meteor.users.find({fields: {username: 1, _id: 1}});
});
