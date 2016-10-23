(function () {
'use strict';

angular.module('LunchCheck', [])
.controller('EatController', EatController);

EatController.$inject = ['$scope', '$filter'];
function EatController($scope, $filter) {
  $scope.food = "";
  $scope.message = "";
  $scope.style = "";

  $scope.checkIfToMuch = function () {
    console.log("inside checkIfToMuch");
    var counter = calculateMessage($scope.food); 

    if (0==counter) {
      $scope.message ='Please enter data first';
      $scope.style = "red";
    } else if (3>=counter) {
      $scope.message = "Enjoy!";
      $scope.style = "green";
    } else {
      $scope.message ="Too much!"
      $scope.style = "green";
    }
  };

  function calculateMessage(inputString) {
    var counter = 0;
    if (null!=inputString && 0<inputString.length) {
      var arrayFood = inputString.split(',');
      for (var i=0; i<arrayFood.length; i++) {
        if (null!=arrayFood[i] && 0<arrayFood[i].trim().length) {
          counter++;
        }
      }
    }
    return counter;
  };

};

})();




/*
(function () {
'use strict';

angular.module('MsgApp', [])
.controller('MsgController', MsgController);

MsgController.$inject = ['$scope', '$filter'];
function MsgController($scope, $filter) {
  $scope.name = "Yaakov";
  $scope.stateOfBeing = "hungry";
  $scope.cookieCost = .45;

  $scope.sayMessage = function () {
    var msg = "Yaakov likes to eat healthy snacks at night!";
    var output = $filter('uppercase')(msg);
    return output;
  };

  $scope.feedYaakov = function () {
    $scope.stateOfBeing = "fed";
  };
}

})();
*/