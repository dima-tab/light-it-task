'use strict';

app.controller('ProductController', ['$scope', '$stateParams', '$location', 'CatalogService', 'ReviewService', 'toastr', function($scope, $stateParams, $location, CatalogService, ReviewService, toastr) {
    console.log('ProductController');

    $scope.product = {};
    $scope.reviews = [];

    $scope.review = {
        rate: 0,
        text: ''
    };
    $scope.reviewHover = 0;

    var productId = parseInt($stateParams.id, 10);
    console.log('product id', productId);
    
    if (!productId) { $location.path('/'); }

    CatalogService.getById(productId)
        .then(function (product) {
            console.log('product - ', product);
            $scope.product = product;
        })
        .catch(function (error) {
            console.log(error);
        });

    $scope.loadReviews = function () {
        ReviewService.list(productId)
            .then(function (list) {
                console.log(JSON.stringify(list,  null, 4));
                $scope.reviews = list;
            })
            .catch(function (error) {
                console.log(error);
            });
    };

    // http://stackoverflow.com/a/25144785
    $scope.reviewDate = function(review) {
        return new Date(review.created_at);
    };

    $scope.addReviewBtnClick = function () {
        if ($scope.review.rate && $scope.review.text.length > 0) {
            ReviewService.add(productId, $scope.review)
                .then(function (data) {
                    if (data.success) {
                        console.log('new review added');
                        $scope.loadReviews();
                        $scope.review = {rate: 0, text: ''};
                        toastr.success('Thank you for your response!');
                    }
                })
                .catch(function (error) {
                    toastr.error(error.toString(), 'Error');
                });
        } else {
            toastr.error('Please add your review and select rate');
        }
    };

    $scope.loadReviews();
}]);
