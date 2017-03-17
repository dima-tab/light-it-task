"use strict";

app.service('ReviewService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {

    // Reviews list request
    this.list = function (id) {
        var d = $q.defer();

        $http.get($rootScope.restUrl + '/reviews/' + id)
            .then(function (response) {
                d.resolve(response.data)
            })
            .catch(function (error) {
                d.reject(error);
            });

        return d.promise;
    };

    // New request method
    this.add = function (id, review) {
        var d = $q.defer();

        if (!id || !review || !$rootScope.token) { return; }

        $http.post($rootScope.restUrl + '/reviews/' + id, review, {headers: {'Authorization': 'Token ' + $rootScope.token }})
            .then(function (response) {
                console.log(JSON.stringify(response,  null, 4));
                d.resolve(response.data)
            })
            .catch(function (error) {
                d.reject(error);
            });

        return d.promise;
    }
}]);