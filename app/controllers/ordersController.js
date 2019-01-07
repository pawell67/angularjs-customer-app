(function() {

    var OrdersController = function($scope, $log, $location, $routeParams, customersFactory, ordersFactory) {
        var customerId = $routeParams.customerId;
        $scope.customer = null;
        $scope.order = {
            id: null,
            product: null,
            total: null
        };
        $scope.orders = null;
        $scope.ordersTotal = 0.0;
        $scope.totalType;

        function init() {
            $("#success-alert").hide();
            $("#success-alert-addOrder").hide();
            if (!isNaN($location.url()[$location.url().length - 1])) {
                customersFactory.getCustomer(customerId)
                    .success(function(customer) {
                        $scope.customer = customer;
                    })
                    .error(function(data, status, header, config) {
                        $log.log(data.error + ' ' + status);
                    });
            }

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

        $scope.updateCustomer = function(customer) {
            customersFactory.updateCustomer(customer).then(function(response) {
                    var status = response.data;
                    if (status) {
                        $("#success-alert").fadeTo(2000, 500).fadeIn(500, function() {
                            $("#success-alert").slideUp(500);
                        });
                    } else {
                        $window.alert('Unable to update customer');
                    }
                }, function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                }

            );
        }

        $scope.addOrder = function(order) {
            ordersFactory.addOrder(order, customerId)
                .then(function(response) {
                    var status = response.data;
                    if (status) {
                        $("#success-alert-addOrder").fadeTo(2000, 500).fadeIn(500, function() {
                            $("#success-alert-addOrder").slideUp(500);
                        });
                    } else {
                        $window.alert('Unable to add order');
                    }
                }, function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });
        }

        $scope.deleteOrder = function(orderId) {
            ordersFactory.deleteOrder(orderId)
                .then(function(response) {
                        var status = response.data;
                        if (status) {
                            for (var i = 0; i < $scope.customer.orders.length; i++) {
                                if ($scope.customer.orders[i].id === orderId) {
                                    $scope.customer.orders.splice(i, 1);
                                    break;
                                }
                            }
                            for (var i = 0; i < $scope.orders.length; i++) {
                                if ($scope.orders[i].id === orderId) {
                                    $scope.orders.splice(i, 1);
                                    break;
                                }
                            }
                        } else {
                            $window.alert('Unable to delete order');
                        }
                    },
                    function(data, status, headers, config) {
                        $log.log(data.error + ' ' + status);
                    }

                );
        }
        init();
    };

    OrdersController.$inject = ['$scope', '$log', '$location', '$routeParams', 'customersFactory', 'ordersFactory'];

    angular.module('customersApp')
        .controller('OrdersController', OrdersController);

}());