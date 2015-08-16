'use strict';

angular.module('basej4booksApp')
  .controller('MainCtrl', function ($scope, $http, socket) {
    $scope.books = [];
    $scope.newBook = '';

    $http.get('/api/books').success(function(books) {
      $scope.books = books;
      socket.syncUpdates('book', $scope.books);
    });

    $scope.addBook = function() {
      if($scope.newBook === '') {
        return;
      }
      $http.post('/api/books', { name: $scope.newBook });
      $scope.newBook = '';
    };

    $scope.deleteBook = function(book) {
      $http.delete('/api/books/' + book._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('book');
    });
  });
