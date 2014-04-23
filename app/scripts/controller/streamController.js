'use strict';
angular.module('PPnet')
  .controller('StreamController', function($scope, ppSyncService, ppnetPostHelper, ppnetUser) {

    $scope.posts = [];
    $scope.comments = [];
    $scope.likes = [];

    // Gets all Documents, including Posts, Comments and Likes
    ppSyncService.getDocuments(['POST', 'COMMENT', 'LIKE']).then(function(response) {
      // Loop through the response and assign the elements to the specific temporary arrays
      for (var i = response.length - 1; i > 0; i--) {
        switch (response[i].doc.type) {
          case 'POST':
            $scope.posts.push(response[i]);
            break;
          case 'LIKE':
            ppnetPostHelper.loadLike($scope.likes, response[i]);
            break;
          case 'COMMENT':
            ppnetPostHelper.loadComment($scope.comments, response[i]);
            break;
        }
      }
    });

    ppSyncService.fetchChanges().then(function(response) {
      console.log(response);
    }, function(error) {
      console.log(error);
    }, function(change) {
      console.log(change);
      switch (change.doc.type) {
        case 'POST':
          $scope.posts.push(change);
          break;
        case 'LIKE':
          ppnetPostHelper.loadLike($scope.likes, change);
          break;
        case 'COMMENT':
          ppnetPostHelper.loadComment($scope.comments, change);
          break;
      }
    });
  });