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

Template.registerHelper('beerJSON', function(){
    // THIS is how you access Beer JSON on client
    return Session.get('beerJSON');
});

Template.registerHelper('getBJCPSubcategory', function(subcategoryID){
    beerJSON = Session.get('beerJSON');
    for (i = 0; i < beerJSON.length; i++) {
        for(j = 0; j < beerJSON[i].subcategory.length; j++) {
            if(beerJSON[i].subcategory[j].id === subcategoryID) {
                console.log(beerJSON[i].subcategory[j]);
                return beerJSON[i].subcategory[j];
            }
        }
    }
    return false;
});

HTTP.get(Meteor.absoluteUrl("beer.json"), {}, function(error,response) {
    if(error) {
        console.log( error );
     } else {
       // set a session so we can access the data
       Session.set('beerJSON', response.data);
      // console.log(response.data);
    }
});

UI.registerHelper('selectedIf', function(selected, val) {
  if(val === selected) {
      return 'selected';
  } else {
      return '';
  }
});
