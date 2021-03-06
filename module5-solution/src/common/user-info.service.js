(function () {
"use strict";

angular.module('common')
.service('UserInfoService', UserInfoService);


function UserInfoService() {
  var service = this;

  service.userInfo = null;

  service.getUserInfo = function () {
  	return service.userInfo;
  }

  service.setUserInfo = function (data) {
    console.log('UserInfoService.setUserInfo', data);
    service.userInfo = data;
  }

}

})();