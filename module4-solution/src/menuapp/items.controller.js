(function () {
'use strict';

angular.module('MenuApp')
.controller('ItemsController', ItemsController);


ItemsController.$inject = ['data'];
function ItemsController(data) {
  var itemsDetail = this;
  console.log("ItemsController");
  console.log(data);
  itemsDetail.data = data;
}

})();