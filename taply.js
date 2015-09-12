// Collections
// Individual tap info
Taps = new Meteor.Collection('taps');

// Each account can have multiple taplists with taps
TapLists = new Meteor.Collection('taplists');


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


if (Meteor.isServer) {
    // This code only runs on the server
      Meteor.publish("taplists", function() {
        return TapLists.find();
      });
}


if (Meteor.isClient) {

    // subscribe to the published tasks function
    Meteor.subscribe("taplists");

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

            // Insert a task into the collection
            Meteor.call("addNewTapList", tapListName);

            $('[name=name]').val('');
        }
    });

}


Meteor.methods({
  addNewTapList: function(tapListName) {
    // Make sure the user is logged in before inserting a task
    if(! Meteor.userId()) {
      throw new Meteor.Error("not-authorized");
    }

    TapLists.insert({
        name: tapListName,
        createdAt: new Date(),
        owner: Meteor.userId(),
    }, function(error, results){
        Router.go('home', { _id: results });
    });

  },
});
