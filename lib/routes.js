// ROUTES
Router.configure({
  layoutTemplate: 'main',
  template: 'main',
  loadingTemplate: 'loading'
});

/*Router.onBeforeAction(function (pause) {
  if (!this.ready()) {
    this.subscribe('userData').wait();
    //this.render('loading');
    //pause(); // otherwise the action will just render the main template.
  }
});*/


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

Router.route('/taplist/:username/edit-tap/:_id', {
  name: 'editTap',
  template: 'editTap',
  data: function(){
        var currentTap = this.params._id;
        return Taps.findOne({ _id: currentTap });
    }
});

Router.route('/taplist/:username/:tapListName/add-tap/', {
  name: 'addTap',
  template: 'addTap',
  data: function(){
        return TapLists.findOne({ name: this.params.tapListName, owner: this.params.username });
    }
});

Router.route('/add-bev', {
  name: 'addBev',
  template: 'addBev',
  data: function(){
        /*var currentTap = this.params._id;
        return Taps.findOne({ _id: currentTap });
        // also need current taplist
        var currentTapList = this.params._id;
        return TapLists.findOne({ _id: currentTap });*/
    }
});

Router.route('/taplist/:username/:tapListName', {
    template: 'tapListPage',
    waitOn: function() {
        return Meteor.subscribe("taplists", this.params.tapListName);
    },
    data: function(){
        return TapLists.findOne({name: this.params.tapListName, owner: this.params.username});
    }
});

Router.route('/taplists', {
    name: 'tapLists',
    template: 'tapLists',
});

Router.route('/user/:username', {
    name: 'user',
    template: 'user',
    waitOn: function() {
        return Meteor.subscribe("userData", this.params.username);
    },
    data: function (){
      return Meteor.users.findOne({username: this.params.username});
    },
    action: function () {
      this.render();
    }

});
