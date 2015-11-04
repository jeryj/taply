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
            return TapLists.find({}, {sort: {name: 1}});
        },

        'tapListCount': function() {
            return TapLists.find().count();
        }
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

    Template.tapListPage.events({
        'submit .add-tap': function(e) {
            console.log('click');
            e.preventDefault();
            var beerName = $('#beer-name').val();
            var parentID = $('#taplist-id').val();

            // insert a tap into the collection
            Meteor.call("addNewTap", beerName, function(error, results) {
                if(error) {
                    console.log(error.reason);
                } else {
                    // success! Add the tap to the taplist
                    var id = results; // returns the id of the page created
                    console.log('uhh... success? '+results);
                }
            });

        }
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
            if(! Meteor.userId()) {
              throw new Meteor.Error("not-logged-in", "You're not logged-in.");
            }

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
                        }

            // using return statement so it'll pass back to the function that called this
            return TapLists.insert(data);
        },

        addNewTap: function(beerName) {
            // Make sure the user is logged in before inserting a tap
            if(! Meteor.userId()) {
              throw new Meteor.Error("not-logged-in", "You're not logged-in.");
            }

            // check to make sure the value is a string
            check(beerName, String);

            if(beerName == "") {
                throw new Meteor.Error("no-beer-name", "Yo! Enter a name for your beer.");
            }

            /*// check to make sure the value is a string
            check(parentID, String);

            if(parentID == "") {
                throw new Meteor.Error("no-parent-ID", "Yo! Don't delete our parentID vals. Not cool.");
            }*/

            var data = {
                        name: beerName,
                        createdAt: new Date(),
                        //tapList: parentID,
                        owner: Meteor.userId(),
                        }

            console.log('it ran');
        }
    });

    function defaultName(currentUser) {
        var nextLetter = 'A'
        var nextName = 'TapList ' + nextLetter;
        while (TapLists.findOne({ name: nextName, createdBy: currentUser })) {
            nextLetter = String.fromCharCode(nextLetter.charCodeAt(0) + 1);
            nextName = 'TapList ' + nextLetter;
        }
        return nextName;
    }
}
