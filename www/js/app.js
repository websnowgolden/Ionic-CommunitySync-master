// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', [
  'ionic', 
  'starter.controllers',
  'app.eventmap',
  'app.explore',
  'app.follow',
  'app.event'
  ])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.hide();
    }
  });
})

.config(function($stateProvider, $urlRouterProvider, $ionicConfigProvider) {
  $ionicConfigProvider.tabs.position('bottom');
  $stateProvider

  .state('start', {
    url: '/home',
    templateUrl: 'templates/home.html'
  })

  .state('app', {
    url: '/app',
    abstract: true,
    templateUrl: 'templates/menu.html',
    controller: 'AppCtrl'
  })

  .state('app.explore', {
    url: '/explore',
    views: {
      'tab-explore': {
        templateUrl: 'templates/explore.html',
        controller: 'ExploreController',
        controllerAs: 'exploreCtrl'
      }
    }
  })

  .state('app.follow', {
    url: '/follow',
    views: {
      'tab-follow': {
        templateUrl: 'templates/follow.html',
        controller: 'FollowController',
        controllerAs: 'followCtrl'
      }
    }
  })

  .state('app.eventmap', {
    url: '/eventmap',
    views: {
      'tab-eventmap': {
        templateUrl: 'templates/eventmap.html',
        controller: 'EventMapCtrl',
        controllerAs: 'eventCtrl'
      }
    }
    ,
    resolve: {
      getEvents: function (EventMapService) {
        var params = "all";
        return EventMapService.getEvents(params);
      }
    }
  })
  .state('app.follow-event-detail', {
    url: '/event/:id',
    views: {
      'tab-follow': {
        templateUrl: 'templates/event-detail.html',
        controller: 'EventDetailController',
        controllerAs: 'eventDetail'
      }
    },
    params: {
      id: null
    }
  })
  .state('app.explore-event-detail', {
    url: '/event/:id',
    views: {
      'tab-explore': {
        templateUrl: 'templates/event-detail.html',
        controller: 'EventDetailController',
        controllerAs: 'eventDetail'
      }
    },
    params: {
      id: null
    }
  })
  // .state('event-detail', {
  //   url: '/events/:id',
  //   templateUrl: 'templates/event-detail.html'
  // })
    ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/home');
});
