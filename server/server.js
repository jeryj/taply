Meteor.publish("taplists", function() {
    return TapLists.find();
});

Meteor.publish("taps", function() {
    return Taps.find();
});

Meteor.publish("bevs", function() {
    return Bevs.find();
});
