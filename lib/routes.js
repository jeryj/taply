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
});

Router.route('/taplist/add', {
  name: 'addTapList',
  template: 'addTapList',
});

Router.route('/taplist/:username/:slug/update', {
  name: 'editTapList',
  template: 'editTapList',
  waitOn: function() {
      return Meteor.subscribe("taplists", this.params.slug);
  },
  data: function(){
      return TapLists.findOne({slug: this.params.slug, owner: this.params.username});
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
