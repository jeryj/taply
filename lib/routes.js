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

Router.route('/taplist/edit-tap/:_id', {
  name: 'editTap',
  template: 'editTap',
  data: function(){
        var currentTap = this.params._id;
        return Taps.findOne({ _id: currentTap });
    }
});

Router.route('/taplist/:_id/add-tap/', {
  name: 'addTap',
  template: 'addTap',
  data: function(){
        var currentTapList = this.params._id;
        return TapLists.findOne({ _id: currentTapList });
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

Router.route('/taplist/:_id', {
    template: 'tapListPage',
    data: function(){
        var currentTapList = this.params._id;
        return TapLists.findOne({ _id: currentTapList });
    }
});

Router.route('/taplists', {
    name: 'tapLists',
    template: 'tapLists',
});

Router.route('/user/:username', {
    name: 'user',
    template: 'user',
    data: function (){
      username  = this.params.username;
      templateData = {
        username: username,
      };
      return templateData;
    }
});
