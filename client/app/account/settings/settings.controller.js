'use strict';

angular.module('basej4booksApp')
  .controller('SettingsCtrl', function ($scope, User, Auth) {
    $scope.user = Auth.getCurrentUser();

    $scope.errors = {};

    $scope.changePassword = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.changePassword( $scope.user.oldPassword, $scope.user.newPassword )
        .then( function() {
          $scope.message = 'Password successfully changed.';
        })
        .catch( function() {
          form.password.$setValidity('mongoose', false);
          $scope.errors.other = 'Incorrect password';
          $scope.message = '';
        });
      }
		};

    $scope.changeUserData = function(form) {
      $scope.submitted = true;
      if(form.$valid) {
        Auth.saveUserData( $scope.user )
        .then( function() {
          $scope.message2 = 'User Data successfully changed.';
        })
        .catch( function() {
          $scope.message2 = '';
        });
      }
    };

  });
