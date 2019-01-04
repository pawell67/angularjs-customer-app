(function() {

    var OrdersController = function($scope, $log, $routeParams, customersFactory) {
        var customerId = $routeParams.customerId;
        $scope.customer = null;
        $scope.order = {
            product: null,
            total: null
        };

        function init() {
            $("#success-alert").hide();
            $("#success-alert-addOrder").hide();
            customersFactory.getCustomer(customerId)
                .success(function(customer) {
                    $scope.customer = customer;
                })
                .error(function(data, status, header, config) {
                    $log.log(data.error + ' ' + status);
                });
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
            customersFactory.addOrder(order, customerId)
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
                    }

                );

        }
        init();
    };

    OrdersController.$inject = ['$scope', '$log', '$routeParams', 'customersFactory'];

    angular.module('customersApp')
        .controller('OrdersController', OrdersController);

}());