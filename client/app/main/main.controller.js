'use strict';

angular.module('basej4booksApp')
  .controller('MainCtrl', function ($scope, $http, socket, Auth) {
    $scope.getCurrentUser = Auth.getCurrentUser;

    $scope.books = [];
    $scope.newBook = '';

    $http.get('/api/books').success(function(books) {
      $scope.books = books;
      socket.syncUpdates('book', $scope.books);
    });

    $scope.addBook = function() {
      var book = $scope.newBook.trim();
      if(book === '') {
        return;
      }
      book = encodeURIComponent(book);;

      /*
      owner: { type:Schema.ObjectId, ref:"User"},
  image: String,
  isbn: String,
    name: String,
    tradeable: Boolean,
      */

      // https://www.googleapis.com/books/v1/volumes?q=q
      // search similarly name on google books info, pick first one
      var booksAPIURI = "https://www.googleapis.com/books/v1/volumes?q=" + book + "&callback=JSON_CALLBACK";
    //  console.log("user",$scope.getCurrentUser());

//
      $http.jsonp( booksAPIURI  ).success(function(books) {
    //    console.log(books);
        var bookInfo = books.items[0].volumeInfo;
        var bookData = { 
          owner: $scope.getCurrentUser()._id,
          image : bookInfo.imageLinks.thumbnail,
          isbn : bookInfo.industryIdentifiers[0].identifier,
          name : bookInfo.title,
          tradeable: false
        };
        console.log("bookdata",bookData);

        $http.post('/api/books', bookData).success(function(bookSaved){
          console.log("saved",bookSaved);
        });
        
        $scope.newBook = '';
      });

    };

    $scope.deleteBook = function(book) {
      $http.delete('/api/books/' + book._id);
    };

    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('book');
    });
  });
