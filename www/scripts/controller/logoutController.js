'use strict';

angular.module('PPnet')
  .controller('LogoutController', function($scope, $location, ppnetUser) {
    hello().logout();
    ppnetUser.logout();
    $location.path('login');
  });