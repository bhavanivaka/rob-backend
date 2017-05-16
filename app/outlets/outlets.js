'use strict';
 
angular.module('myApp.outlets', ['ngRoute', 'firebase'])
 
// Declared route 
.config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/outlets', {
        templateUrl: 'outlets/outlets.html',
        controller: 'OutletsCtrl'
    });
}])

// Home controller
.controller('OutletsCtrl', function($scope, $location, $firebaseObject ,$firebaseArray) { 
    $scope.outlet = {
        "address" : "",
        "cashback" : 0,
        "description" : "",
        "face" : "",
        "id" : 0,
        "locality" : "",
        "name" : "",
        "offer" : "",
        "trending" : false
    }
    var outletsRef = firebase.database().ref().child('stores'); 
     $scope.outlets = $firebaseArray(outletsRef);

     $scope.goToCashback = function(){
        $location.path('/cashbacks');
     }

     $scope.goToBills = function(){
        $location.path('/bills');
    }
    
    $scope.goToOffers = function(){
        $location.path('/offers');
    }

    $scope.submit = function(form){
        if(form.$valid) {
            var key = firebase.database().ref().child('stores').push().key
            //console.log("WORKING")
            var newOutletRef = firebase.database().ref().child('stores/'+ key)
            newOutletRef.set($scope.outlet);
            newOutletRef.update({
                id: key
            });
        }
        else{
            console.log('ERROR');
        }
    }    
});