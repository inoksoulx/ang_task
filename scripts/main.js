"use strict";

var app = angular.module("myApp", []);
//# sourceMappingURL=main.js.map

"use strict";

app.service("setLocalStorage", function () {
  this.save = function (data) {
    localStorage.setItem("DB", JSON.stringify(data));
  };
});

app.directive("localStorage", function () {
  return {
    template: "<div class=\"wrapper\"><div>\n            <form>\n                <label for=\"add\">Post</label>\n                <input type=\"text\" name=\"add\" ng-model=\"value\">\n                <button ng-click=\"postItem(); $event.preventDefault();\">POST</button>\n            </form>\n          </div>\n          <div class=\"list\">\n            <ul>\n              <li ng-repeat=\"item in list.items track by $index\" ng-click=\"deleteOrChange(this.$index); $event.preventDefault();\">\n                {{ item }}\n              </li>\n            </ul>\n          </div>\n        </div>\n      ",
    link: function link(scope, element, attrs) {
      if (!localStorage.DB) {
        localStorage.setItem("DB", JSON.stringify({
          items: []
        }));
      } else {
        scope.list = JSON.parse(localStorage.getItem("DB"));
      }
    },
    controller: function controller($scope, setLocalStorage) {
      $scope.postItem = function () {
        if ($scope.value != undefined) {
          $scope.list.items.push($scope.value);
          setLocalStorage.save($scope.list);
        } else {
          alert("Enter the data.");
        }
      };

      $scope.deleteOrChange = function (idx) {
        var choise = prompt("U want DELETE or CHANGE item?", "");
        if (choise === null) {
          alert("Enter DELETE if u want to delete item or enter new value to change item.");
          return false;
        } else if (choise.toUpperCase() === "DELETE") {
          $scope.list.items.splice(idx, 1);
          setLocalStorage.save($scope.list);
        } else {
          $scope.list.items[idx] = choise;
          setLocalStorage.save($scope.list);
        }
      };
    }
  };
});
//# sourceMappingURL=ls.directive.js.map
