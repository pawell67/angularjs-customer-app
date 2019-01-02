(function() {

    var AllOrdersController = function($scope, $log, customersFactory) {
        $scope.orders = null;
        $scope.ordersTotal = 0.0;
        $scope.totalType;

        function init() {
            customersFactory.getOrders()
                .then(function(response) {
                    $scope.orders = response.data;
                    getOrdersTotal();
                }, function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });
        }

        function getOrdersTotal() {
            var total = 0;
            for (var i = 0, len = $scope.orders.length; i < len; i++) {
                total += $scope.orders[i].total;
            }
            $scope.ordersTotal = total;
            $scope.totalType = ($scope.ordersTotal > 100) ? 'success' : 'danger';
        }

        init();
    };

    AllOrdersController.$inject = ['$scope', '$log', 'customersFactory'];

    angular.module('customersApp')
        .controller('AllOrdersController', AllOrdersController);

}());