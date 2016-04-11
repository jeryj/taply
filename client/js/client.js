// global template helper
Template.registerHelper('isOwner', function(ownerId) {
    var isOwner = false;
    if(Meteor.userId() === ownerId) {
        isOwner = true;
    }

    return isOwner;
});

Template.registerHelper('ownerBevs', function(ownerId){
    return Bevs.find({ownerId: ownerId}, {sort: {name: 1}});
});

Template.registerHelper('taps', function(tapListId){
    // return taps of the current tapListId
    var tappy = Taps.find({tapList: tapListId}, {sort: {createdAt: 1}});
    console.log(tappy);
    return Taps.find({tapList: tapListId}, {sort: {createdAt: 1}});
});

Template.registerHelper('whatsOnTap', function(bevId) {

  var whatsOnTap = Bevs.findOne({_id: bevId});
  console.log(whatsOnTap);
  if(whatsOnTap !== null) {
      return whatsOnTap;
  }

  return false;
});

Template.registerHelper('tapCount', function(i) { // index starts with 0, we want it to start with 1
    return i + 1;
});

Template.registerHelper('howManyTaps', function(tapListId){
    console.log(Taps.find({tapList: tapListId}).count());
    return Taps.find({tapList: tapListId}).count();
});
