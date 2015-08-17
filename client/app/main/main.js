'use strict';

angular.module('basej4booksApp')
  .config(function ($routeProvider) {
    $routeProvider
      .when('/', {
        templateUrl: 'app/main/main.html',
        controller: 'MainCtrl'
      })
      .when('/mybooks', {
        templateUrl: 'app/main/mybooks.html',
        controller: 'MyBooksCtrl',
        authenticate:true
      });
  });