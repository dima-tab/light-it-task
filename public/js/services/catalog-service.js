"use strict";
// http://stackoverflow.com/questions/13760070/angularjs-passing-data-to-http-get-request

app.service('CatalogService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {

    // Products list request
    this.list = function () {
        var d = $q.defer();

        $http.get($rootScope.restUrl + '/products')
            .then(function (response) {
                d.resolve(response.data);
            })
            .catch(function (error) {
                d.reject(error);
            });

        return d.promise;
    };

    // Get product by id
    this.getById = function (id) {
        var d = $q.defer();

        $http.get($rootScope.restUrl + '/products')
            .then(function (response) {
                if (!!response.data && response.data.length > 0 && Array.isArray(response.data)) {
                    var products = response.data.filter(function (p) {
                        if (p.id === id) { return true; }
                    });

                    d.resolve((products.length > 0) ? products[0] : []);
                } else {
                    d.resolve([]);
                }
            })
            .catch(function (error) {
                d.reject(error);
            });

        return d.promise;
    }

}]);