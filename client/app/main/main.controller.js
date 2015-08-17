'use strict';

angular.module('basej4booksApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;
    $scope.isLoggedIn = Auth.isLoggedIn;

    $scope.books = [];

    $http.get('/api/books').success(function(books) {
      $scope.books = books;
      socket.syncUpdates('book', $scope.books);
    });

 
    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('book');
    });
  });
