'use strict';

app.controller('CatalogController', ['$scope', '$location', 'CatalogService', function ($scope, $location, CatalogService) {
    console.log('CatalogController');

    $scope.productsList = [];

    // Creating more products from 2 exists
    CatalogService.list()
        .then(function (list) {
            var _list = list.concat(list);
            var __list = _list.concat(_list);
            $scope.productsList = __list.concat(list);
        })
        .catch(function (error) {
            console.log(error);
        });
}]);