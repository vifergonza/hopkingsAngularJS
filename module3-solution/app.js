(function() {
    'use strict';

    angular.module('NarrowItDownApp', [])
        .controller('NarrowItDownController', NarrowItDownController)
        .service('MenuItemsService', MenuItemsService)
        .constant('ApiBasePath', "http://davids-restaurant.herokuapp.com")
        .directive('foundItems', FoundItems)

    NarrowItDownController.inject = [MenuItemsService]

    function NarrowItDownController(MenuItemsService) {
        var narrowItDown = this;

        narrowItDown.searchKey;
        narrowItDown.found;

        narrowItDown.getMenuItems = function() {
            console.log("NarrowItDownController.getMenuItems(" + narrowItDown.searchKey + ")");

            if (undefined === narrowItDown.searchKey || narrowItDown.searchKey.length<=0) {
              narrowItDown.found = [];
              return;
            }

            var promise = MenuItemsService.getMenuItems();

            promise.then(function(response) {
                    console.log(response.data);
                    narrowItDown.found = filterData(response.data.menu_items, narrowItDown.searchKey);
                    console.log("Found items: " + narrowItDown.found.length);
                })
                .catch(function(error) {
                    console.log(error);
                })

        };

        narrowItDown.removeItem = function(itemIndex) {
            console.log("Removing index at: " + itemIndex)
            narrowItDown.found.splice(itemIndex, 1);
        };

    };

    MenuItemsService.$inject = ['$http', 'ApiBasePath'];

    function MenuItemsService($http, ApiBasePath) {
        var service = this;

        service.getMenuItems = function() {
            var response = $http({
                method: "GET",
                url: (ApiBasePath + "/menu_items.json")
            });

            return response;
        };

    }

    function FoundItems() {
        var ddo = {
            templateUrl: 'loader/itemsloaderindicator.template.html',
            restrict: 'E',
            scope: {
                list: '=foundItems',
                onRemove: '&'
            },
            controller: FoundItemsDirectiveController,
            controllerAs: 'foundItemsController',
            bindToController: true
        };

        return ddo;
    };

    function FoundItemsDirectiveController() {
        var foundItemsController = this;

        foundItemsController.showEmptyMessage = function() {
            if (undefined === foundItemsController.list) {
                return false;
            } else {
                return foundItemsController.list.length <= 0;
            }
        };

        foundItemsController.itemsLoaded = function() {
            if (undefined === foundItemsController.list) {
                return false;
            } else {
                return foundItemsController.list.length > 0;
            }
        }
    };

    function filterData(responseData, searchKey) {
        var found = [];
        for (var i = 0; i < responseData.length; i++) {
            if (responseData[i].description.toUpperCase().indexOf(searchKey.toUpperCase()) >= 0) {
                found.push(responseData[i]);
            }
        }
        return found;
    }

})();
