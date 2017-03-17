'use strict';

app.controller('HeaderController', ['$scope', '$rootScope', '$location', 'UserService', '$cookies', 'ngDialog', 'toastr', function ($scope, $rootScope, $location, UserService, $cookies, ngDialog, toastr) {
    console.log('HeaderController');

    // Sign up button click handler
    $scope.userRegistrationBtnClick = function () {
        console.log('user register');
        ngDialog.open({
            template: 'views/registration-modal-window.html',
            scope: $scope,
            cache: false,
            className: 'ngdialog-theme-plain',
            controller: 'ModalController'
        }).closePromise
            .then(function (dialogResult) {$scope.registerUser(dialogResult.value)})
            .catch(function (error) { console.log(error); })
    };

    // Sign in button click handler
    $scope.userLoginBtnClick = function () {
        console.log('user login');
        ngDialog.open({
            template: 'views/login-modal-window.html',
            scope: $scope,
            cache: false,
            className: 'ngdialog-theme-plain',
            controller: 'ModalController'
        })
            .closePromise
            .then(function (dialogResult) {$scope.loginUser(dialogResult.value)})
            .catch(function (error) { console.log(error); })
    };

    // Log out button click handler
    $scope.userLogoutBtnClick = function () {
        $cookies.remove('token');
        delete $rootScope.token;
    };

    // User registration
    $scope.registerUser = function (user) {
        UserService.register(user)
            .then(function (data) {
                if (data.success) {
                    $cookies.put('token', data.token);
                    $rootScope.token = data.token;
                    toastr.success('New user '  + user.username + ' registered!');
                } else {
                    toastr.error(data.message, 'Registration failed');
                }
                console.log(data);
            })
            .catch(function (error) {
                toastr.error(error.message, 'Registration failed');
                console.log(error);
            })
    };

    // User login
    $scope.loginUser = function (user) {
        UserService.login(user)
            .then(function (data) {
                if (data.success) {
                    $cookies.put('token', data.token);
                    $rootScope.token = data.token;
                    toastr.success('User: ' +  user.username, 'Login success');
                } else {
                    toastr.error('Login failed');
                }
            })
            .catch(function () {
                toastr.error('Login failed');
            })
    };

}]);