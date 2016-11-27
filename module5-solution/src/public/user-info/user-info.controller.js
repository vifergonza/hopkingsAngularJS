(function () {
"use strict";

angular.module('public')
.controller('UserInfoController', UserInfoController);

UserInfoController.$inject = ['UserInfoService', 'MenuService'];
function UserInfoController(UserInfoService, MenuService) {
  var $ctrl = this;
  $ctrl.userInfo = null;
  $ctrl.favoriteDishShortName = null;
  $ctrl.favoriteDishError = null;
  $ctrl.registerSuccess = null;

  $ctrl.$onInit = function () {
  	console.log("UserInfoController onInit");
  	$ctrl.userInfo = UserInfoService.getUserInfo();
  }

  $ctrl.register = function () {
  	if ($ctrl.favoriteDishShortName!=null) {
	  	MenuService.getMenuItem($ctrl.favoriteDishShortName).then(
  			function (data) {
  				console.log('UserInfoController register item found', data);
  				$ctrl.userInfo.favoriteDish=data;
  				$ctrl.userInfo.favoriteDishShortName=data.short_name;
  				UserInfoService.setUserInfo($ctrl.userInfo);
				$ctrl.favoriteDishError=null;
				$ctrl.registerSuccess='Your information has been saved.';
  			}, 
  			function (data) {
  				$ctrl.favoriteDishError="Favorite dish not found.";
				$ctrl.registerSuccess=null;
  			}
	  	);
	} else {
		$ctrl.favoriteDishError="Favorite dish not found.";
	}
  };

  $ctrl.valid = function () {
  	console.log("valid function");
  	return true;
  }
}

})();
