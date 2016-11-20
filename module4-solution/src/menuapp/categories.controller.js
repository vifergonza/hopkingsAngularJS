(function () {
'use strict';

angular.module('MenuApp')
.controller('CategoriesController', CategoriesController);


CategoriesController.$inject = ['items'];
function CategoriesController(items) {
  var mainlist = this;
  console.log("CategoriesController");
  console.log(items);
  mainlist.items = items;
}

})();