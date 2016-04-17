Template.display.helpers({
    'flexBasis': function(tapListId){
        var howManyTaps = Taps.find({tapList: tapListId}).count();
        var flexBasis = (100/howManyTaps) - 2;
        return flexBasis;
    },
});

Template.display.events({
    'click .display__name a': function(e) {
        e.preventDefault();
        $('.bev-details__bev').removeClass('bev-details__bev--active');
        $('#bev--'+this._id).addClass('bev-details__bev--active');
    },
    'click .bev-details__close': function(e) {
        e.preventDefault();
        $('#bev--'+this._id).removeClass('bev-details__bev--active');
    },
});
