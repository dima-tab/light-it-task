"use strict";

app.service('UserService', ['$http', '$rootScope', '$q', function ($http, $rootScope, $q) {

    // New user registration request
    this.register = function (user) {
        var d = $q.defer();

        $http.post($rootScope.restUrl + '/register/', user)
            .then(function (response) {
                d.resolve(response.data)
            })
            .catch(function (error) {
                d.reject(error);
            });

        return d.promise;
    };

    // Login of the exist user request
    this.login = function (user) {
        var d = $q.defer();

        $http.post($rootScope.restUrl + '/login/', user)
            .then(function (response) {
                d.resolve(response.data)
            })
            .catch(function (error) {
                d.reject(error);
            });

        return d.promise;
    };
}]);