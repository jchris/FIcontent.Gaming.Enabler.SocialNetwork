'use strict';

angular.module('PPnet')
  .controller('NewCommentController', function($scope, ppSyncService, ppnetUser, ppnetPostHelper) {

    // Creates a new Post
    $scope.newComment = function() {
      // Create the object which should be saved
      var commentObject = ppnetPostHelper.createCommentObject(
        $scope.newComment.content,
        ppnetUser.getUserData(),
        $scope.postId
      );

      console.log(commentObject);

      // Save the object to the database
      ppSyncService.postDocument(commentObject);

      // Empty the textarea
      $scope.newComment.content = '';
    };
  });