(function () {
'use strict';

angular.module('BoughtApp', [])
  .controller('ToBuyController', ToBuyController)
  .controller('AlreadyBoughtController', AlreadyBoughtController)
  .service('ShoppingListCheckOffService', ShoppingListCheckOffService)
;

ToBuyController.$inject = ['ShoppingListCheckOffService'];
function ToBuyController(ShoppingListCheckOffService) {
  var toBuy = this;

  toBuy.list = ShoppingListCheckOffService.getToBuyItems();

  toBuy.buyItem = function(itemIdex) {
    console.log("ToBuyController.buyItem: "+itemIdex);
    ShoppingListCheckOffService.buyItem(itemIdex);
  };
};

AlreadyBoughtController.$inject = ['ShoppingListCheckOffService'];
function AlreadyBoughtController(ShoppingListCheckOffService) {
  var bought= this;

  bought.list = ShoppingListCheckOffService.getBoughtItems();
};


function ShoppingListCheckOffService() {
  var service = this;

  // List of shopping items
  var toBuyList = [
    { name: "Cookies", quantity: 10 }
    , { name: "Booble gum", quantity: 5 }
    , { name: "Nougat", quantity: 2 }
    , { name: "Jellybeans", quantity: 15 }
    , { name: "Mazapan", quantity: 20 }
    , { name: "Frixuelos", quantity: 10 }
    , { name: "Empanadillas", quantity: 7 }
  ];
  var boughtList = [];

  service.getToBuyItems = function () {
    return toBuyList;
  };

  service.getBoughtItems = function () {
    return boughtList;
  };

  service.buyItem = function (itemIdex) {
     console.log("ShoppingListCheckOffService.buyItem: "+itemIdex);

     var item = toBuyList.splice(itemIdex, 1);
     console.log(item[0]);

     boughtList.push(item[0]);
  }
}

})();