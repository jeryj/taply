Template.display.helpers({
    'flexBasis': function(tapListId){
        var howManyTaps = Taps.find({tapList: tapListId}).count();
        var flexBasis = (100/howManyTaps) - 2;
        return flexBasis;
    },
});
