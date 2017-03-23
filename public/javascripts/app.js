var app = angular.module('commentsApp',[]);

app.controller('MainController', [
  '$scope', '$http',
  function($scope, $http) {

    $scope.comments = [];

    $scope.addComment = function() {
      console.log($scope.formContent);
      if($scope.formContent == undefined) {
        return;
      }

      $scope.create({
        title: $scope.formContent,
        upvotes: 0
      });

      $scope.formContent = '';

    };

    $scope.incrementUpvotes = function(comment) {
      $scope.upvote(comment);
    };

    $scope.getAll = function() {
      return $http.get('/comments').success(function(data) {
        angular.copy(data, $scope.comments);
      });
    };

    $scope.create = function(comment) {
      return $http.post('/comments', comment).success(function(data) {
        $scope.comments.push(data);
      });
    };

    $scope.upvote = function(comment) {
      return $http.put('/comments/' + comment._id + '/upvote')
      .success(function(data){
        comment.upvotes += 1;
      })
    };

    $scope.delete = function(comment) {
      $http.delete('/comments/' + comment._id)
      .success(function(data) {

      });
      $scope.getAll();
    }
    
    $scope.getAll();

  }
]);

