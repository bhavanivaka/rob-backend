'use strict';
 
angular.module('myApp.cashbacks', ['ngRoute', 'firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/cashbacks', {
        templateUrl: 'cashbacks/cashbacks.html',
        controller: 'CashbacksCtrl'
    });
}])

// Home controller
.controller('CashbacksCtrl', function($scope, $location, $firebaseObject ,$firebaseArray) { 
  firebase.auth().onAuthStateChanged(user => {
  if(user == null ) {
    window.location = 'login.html'; //After successful login, user will be redirected to home.html
  }
    var cashbacksRef = firebase.database().ref().child('cashbacks'); 
    $scope.cashbacks = $firebaseArray(cashbacksRef);

    $scope.approve = function(data){
        var ref = firebase.database().ref('cashbacks/' + data.$id);
        ref.update({
            state: 'INITIATED'
        })
    }

    $scope.success = function(data){
        var ref = firebase.database().ref('cashbacks/' + data.$id);
        ref.update({
            state: 'SUCCESS'
        })
    }

    $scope.error = function(data){
        var ref = firebase.database().ref('cashbacks/' + data.$id);
        ref.update({
            state: 'ERROR'
        })
    }

    $scope.goToBills = function(){
        $location.path('/bills');
    }

    $scope.goToOutlets = function(){
        $location.path('/outlets');
    }

    $scope.goToOffers = function(){
        $location.path('/offers');
    }
});
});
