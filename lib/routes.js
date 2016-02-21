// ROUTES
Router.configure({
  layoutTemplate: 'main',
  template: 'main',
  loadingTemplate: 'loading'
});

Router.route('/', {
  name: 'home',
  template: 'tapLists'
});

Router.route('/register', {
  name: 'register',
  template: 'register'
});

Router.route('/login', {
  name: 'login',
  template: 'login'
});

Router.route('/bev/add', {
  name: 'addBev',
  template: 'addBev',
});

Router.route('/bev/:_id/update', {
  name: 'editBev',
  template: 'editBev',
  waitOn: function() {
      return Meteor.subscribe("bevs", this.params._id);
  },
  data: function(){
      return Bevs.findOne({_id: this.params._id});
  }
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

Router.route('/taplist/:username/:slug/', {
    template: 'tapListPage',
    waitOn: function() {
        return Meteor.subscribe("taplists", this.params.slug);
    },
    data: function(){
        return TapLists.findOne({slug: this.params.slug, owner: this.params.username});
    }
});

Router.route('/taplist/:username/:slug/display', {
    layoutTemplate: 'display',
    template: 'display',
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
