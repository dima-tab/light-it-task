app.controller('ModalController', ['$scope', 'ngDialog', function ($scope, ngDialog) {
    $scope.btnClick = function () {
        $scope.closeThisDialog({
            username: $scope.username,
            password: $scope.password
        })
    }
}]);