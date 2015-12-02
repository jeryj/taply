// ROUTES
Router.configure({
  layoutTemplate: 'main',
  template: 'main',
  loadingTemplate: 'loading'
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

Router.route('/taplist/:username/:slug', {
    template: 'tapListPage',
    waitOn: function() {
        return Meteor.subscribe("taplists", this.params.slug);
    },
    data: function(){
        return TapLists.findOne({slug: this.params.slug, owner: this.params.username});
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
