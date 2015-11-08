// Collections
// Each account can have multiple taplists with taps
TapLists = new Meteor.Collection('taplists');

// Individual tap info
Taps = new Meteor.Collection('taps');


function slugify(text){
  return text.toString().toLowerCase()
    .replace(/\s+/g, '-')           // Replace spaces with -
    .replace(/[^\w\-]+/g, '')       // Remove all non-word chars
    .replace(/\-\-+/g, '-')         // Replace multiple - with single -
    .replace(/^-+/, '')             // Trim - from start of text
    .replace(/-+$/, '');            // Trim - from end of text
}

// ROUTES
Router.configure({
  layoutTemplate: 'main',
  template: 'main'
});

Router.route('/', {
  name: 'home',
  template: 'home'
});

Router.route('/about', {
  name: 'about',
  template: 'about'
});

Router.route('/register', {
  name: 'register',
  template: 'register'
});

Router.route('/login', {
  name: 'login',
  template: 'login'
});

Router.route('/taplist/:_id', {
    template: 'tapListPage',
    data: function(){
        var currentTapList = this.params._id;
        return TapLists.findOne({ _id: currentTapList });
    }
});



if (Meteor.isClient) {

    // subscribe to the published taplists function
    Meteor.subscribe("taplists");
     // subscribe to the published taps
    Meteor.subscribe("taps");
    //
    Meteor.subscribe("tapsOwnedByUser");

    Template.register.events({
        'submit form': function(e) {
            e.preventDefault();

            // Get the values
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();

            // Create the user
            Accounts.createUser({
                email: email,
                password: password
            }, function(error){
                if(error){
                    console.log(error.reason); // Output error if registration fails
                } else {
                    Router.go("home"); // Redirect user if registration succeeds
                }
            });

        }
    });


    Template.login.events({
        'submit form': function(e) {
            e.preventDefault();
            var email = $('[name=email]').val();
            var password = $('[name=password]').val();
            // Meteor premade function, just pass it the values
            Meteor.loginWithPassword(email, password, function(error){
                if(error){
                    console.log(error.reason);
                } else {
                    Router.go("home");
                }
            });
        }

      });

    Template.navigation.events({
        'click .logout': function(e) {
            e.preventDefault();
            // Meteor Logout function
            Meteor.logout();
            // Where to send the user after logout
            Router.go('home');
        }
    });

    Template.tapLists.helpers({
        'tapList': function(){
            return TapLists.find({archived: false}, {sort: {name: 1}});
        },

    });

    Template.archivedTapLists.helpers({
        'archivedTapList': function(){
            return TapLists.find({archived: true}, {sort: {name: 1}});
        },
    });

    Template.tapLists.events({
        'click .delete-taplist': function(e) {
            e.preventDefault();
            var tapListId = this._id;

            // TODO: Give some kind of warning message

            Meteor.call("deleteTapList", tapListId, function(error, results) {
                if(error) {
                    console.log(error.reason);
                } else {
                    // success!
                    console.log('Deleted '+tapListId);
                }
            });
        },

        'click .archive-taplist': function(e) {
            e.preventDefault();
            var tapListId = this._id;

            Meteor.call("archiveTapList", tapListId, function(error, results) {
                if(error) {
                    console.log(error.reason);
                } else {
                    // success!
                    console.log('Archived '+tapListId);
                }
            });
        },

        'click .unarchive-taplist': function(e) {
            e.preventDefault();
            var tapListId = this._id;

            Meteor.call("unarchiveTapList", tapListId, function(error, results) {
                if(error) {
                    console.log(error.reason);
                } else {
                    // success!
                    console.log('UnArchived '+tapListId);
                }
            });
        },
    });

    Template.addTapList.events({
        'submit form': function(e) {
            e.preventDefault();
            var tapListName = $('[name=name]').val();

            // Insert a taplist into the collection
            Meteor.call("addNewTapList", tapListName, function(error, results) {
                if(error) {
                    console.log(error.reason);
                } else {
                    // send them to the page they created
                    var id = results; // returns the id of the page created
                    var taplistURL = '/taplist/'+id;
                    Router.go(taplistURL);
                }
            });

            // clear the name value
            $('[name=name]').val('');
        }

    });

    Template.addTapForm.events({
        'submit .add-tap': function(e) {
            e.preventDefault();
            var tapListId = this._id;

            var beerName = $('#beer-name').val();
            var beerType = $('#beer-type').val();

            tap = {
                        'name' : beerName,
                        'type' : beerType,
                    };


            // insert a tap into the collection
            Meteor.call("addNewTap", tap, tapListId, function(error, results) {
                if(error) {
                    console.log(error.reason);
                } else {
                    // success! Add the tap to the taplist
                    var id = results; // returns the id of the tap created
                    // clear the input
                    $('#beer-name').val('');
                    $('#beer-type').val('');
                }
            });

        },
    });

    Template.taps.helpers({
        'taps': function(tapListId){
            // return taps of the current tapListId
            return Taps.find({tapList: tapListId, archived: false}, {sort: {name: 1}});
        }
    });

    Template.archivedTaps.helpers({
        'archivedTaps': function(tapListId){
            // return taps of the current tapListId
            return Taps.find({tapList: tapListId, archived: true}, {sort: {name: 1}});
        }
    });

    Template.taps.events({
        'click .delete-tap': function(e) {
            e.preventDefault();
            var tapId = this._id;

            // TODO: Give some kind of warning message

            Meteor.call("deleteTap", tapId, function(error, results) {
                if(error) {
                    console.log(error.reason);
                } else {
                    // success!
                    console.log('Deleted '+tapId);
                }
            });
        },

        'click .archive-tap': function(e) {
            e.preventDefault();
            var tapId = this._id;

            Meteor.call("archiveTap", tapId, function(error, results) {
                if(error) {
                    console.log(error.reason);
                } else {
                    // success!
                    console.log('Archived '+tapId);
                }
            });
        },

    });

    Template.archivedTaps.events({
        'click .unarchive-tap': function(e) {
            e.preventDefault();
            var tapId = this._id;

            // TODO: Give some kind of warning message
            Meteor.call("unarchiveTap", tapId, function(error, results) {
                if(error) {
                    console.log(error.reason);
                } else {
                    // success!
                    console.log('Unarchived '+tapId);
                }
            });
        }
    });

    // global template helper
    Template.registerHelper('isOwner', function(owner) {
        var isOwner = false;
        if(Meteor.userId() === owner) {
            isOwner = true;
        }

        return isOwner;
    });

}

if (Meteor.isServer) {
    // This code only runs on the server
    Meteor.publish("taplists", function() {
        return TapLists.find();
    });

    Meteor.publish("taps", function() {
        return Taps.find();
    });

    Meteor.methods({

        // TAPLIST METHODS
        addNewTapList: function(tapListName) {
            // Make sure the user is logged in before inserting a taplist
            isLoggedIn(Meteor.userId());

            // check to make sure the value is a string
            check(tapListName, String);

            // if they submitted an empty form (via console), create a new name for them
            if(tapListName == ""){
                tapListName = defaultName(currentUser);
            }

            // create the slug
            var data = {
                        name: tapListName,
                        createdAt: new Date(),
                        owner: Meteor.userId(),
                        archived: false,
                        }

            // using return statement so it'll pass back to the function that called this
            return TapLists.insert(data);
        },


        deleteTapList: function(tapListId) {
            // Make sure the user has permissions to be here
            isTapListOwner(Meteor.userId(), tapListId);

            // they own it, so... it's gone!
            // TODO: Soft delete, probably.

            // delete the taps associated with that tapList
            Taps.remove({tapList: tapListId});
            // delete the taplist
            TapLists.remove(tapListId);

        },

        archiveTapList: function(tapListId) {
            isTapListOwner(Meteor.userId(), tapListId);

            TapLists.update(tapListId, {
                $set : {archived: true}
            });
        },

        unarchiveTapList: function(tapListId) {
            isTapListOwner(Meteor.userId(), tapListId);

            TapLists.update(tapListId, {
                $set : {archived: false}
            });
        },

        addNewTap: function(tap, parentID) {
            isLoggedIn(Meteor.userId());


            // check to make sure the value is a string
            check(tap.name, String);

            if(tap.name == "") {
                throw new Meteor.Error("no-beer-name", "Yo! Enter a name for your beer.");
            }

            // check to make sure the value is a string
            check(parentID, String);

            if(parentID == "") {
                throw new Meteor.Error("no-parent-ID", "Yo! Don't delete our parentID vals. Not cool.");
            }

            var data = {
                        name: tap.name,
                        type: tap.type,
                        createdAt: new Date(),
                        tapList: parentID,
                        owner: Meteor.userId(),
                        archived: false,
                        }

            return Taps.insert(data);
        },

        deleteTap: function(tapId) {
            // check permissions
            isTapOwner(Meteor.userId(), tapId);

            // they own it, so... it's gone!
            // TODO: Soft delete, probably.
            Taps.remove(tapId);
        },

        archiveTap: function(tapId) {
            isTapOwner(Meteor.userId(), tapId);

            Taps.update(tapId, {
                $set : {archived: true}
            });
        },

        unarchiveTap: function(tapId) {
            isTapOwner(Meteor.userId(), tapId);

            Taps.update(tapId, {
                $set : {archived: false}
            });
        },

    });

    function defaultName(currentUser) {
        var nextLetter = 'A'
        var nextName = 'TapList ' + nextLetter;
        while (TapLists.findOne({ name: nextName, owner: currentUser })) {
            nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
            nextName = 'TapList ' + nextLetter;
        }
        return nextName;
    }
}

// Some reusable functions to help us out
var isTapOwner = function(userId, tapId) {
    isLoggedIn(userId);

    // check to make sure that the taplist is owned by the current user
    theTap = Taps.findOne({ _id: tapId });
    // if they don't own the tap, throw an error
    if(theTap.owner !== userId) {
        throw new Meteor.Error("tap-not-owned-by-user", "You don't own this Tap. What do you think you're doin', bud?.");
    }

    return true;
}

var isTapListOwner = function(userId, tapListId) {
    isLoggedIn(userId);

    // check to make sure that the taplist is owned by the current user
    theTapList = TapLists.findOne({ _id: tapListId });
    // if they don't own the tap, throw an error
    if(theTapList.owner !== userId) {
        throw new Meteor.Error("taplist-not-owned-by-user", "You don't own this TapList. What do you think you're doin', bud?.");
    }

    return true;
}

var isLoggedIn = function(userId) {
    // Make sure the user is logged in before inserting a tap
    if(! userId) {
      throw new Meteor.Error("not-logged-in", "You're not logged-in.");
    }

    return true;
}
