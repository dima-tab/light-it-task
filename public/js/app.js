'use strict';

var app = angular.module('app', ['ui.router', 'ngDialog', 'ngCookies', 'ngAnimate', 'toastr']);

app.config(['$stateProvider', '$urlRouterProvider', '$locationProvider', '$httpProvider', 'ngDialogProvider', function ($stateProvider, $urlRouterProvider, $locationProvider, $httpProvider, ngDialogProvider) {
    // CORS fix
    $httpProvider.defaults.useXDomain = true;
    delete $httpProvider.defaults.headers.common['X-Requested-With'];

    // Default state
    $urlRouterProvider.otherwise('/');
    // Clearing hash prefix
    $locationProvider.hashPrefix('');

    // http://stackoverflow.com/questions/27734497/set-default-view-for-multiple-states-angularjs-ui-router
    $stateProvider
        .state('root', { // Declaring root state for header-footer states
            abstract: true,
            views: {
                '': {templateUrl: 'views/layout.html'},
                'header@root': {
                    controller: 'HeaderController', // тоже самое что и ng-controller
                    templateUrl: 'views/header.html'
                },
                'footer@root': {
                    templateUrl: 'views/footer.html'
                }
            }
        })
        .state('products', {    // Products(catalog) state
            parent: 'root',
            url: '/',
            views: {
                'content': {
                    templateUrl: 'views/products-catalog.html',
                    controller: 'CatalogController'
                }
            }
        })
        .state('productView', { // Product state
            parent: 'root',
            url: '/:id', // резервируем название(id) и расположение параметров GET запроса
            views: {
                content: {
                    templateUrl: 'views/product-page.html',
                    controller: 'ProductController'
                }
            }
        });

    ngDialogProvider.setDefaults({      // Default modal window settings
        className: 'ngdialog-theme-plain',
        plain: false,
        showClose: true,
        closeByDocument: true,
        closeByEscape: true,
        appendTo: false,
    });
}]);

app.run(['$rootScope', '$cookies', '$http', function ($rootScope, $cookies, $http) {
    $rootScope.restUrl = 'http://smktesting.herokuapp.com/api';     // Backend RestAPI url

    // Initializing auth token from the cookies if exist
    var token = $cookies.get('token');
    if (token) {
        $rootScope.token = token;
    }

}]);