(function() {

    var CustomersController = function($scope, $log, $window, customersFactory, appSettings) {
        $scope.sortBy = 'name';
        $scope.reverse = false;
        $scope.customers = [];
        $scope.appSettings = appSettings;

        function init() {
            customersFactory.getCustomers()
                .then(function(response) {
                    $scope.customers = response.data;
                }, function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });
            $("#success-alert-addCustomer").hide();
        }

        init();

        $scope.doSort = function(propName) {
            $scope.sortBy = propName;
            $scope.reverse = !$scope.reverse;
        };

        $scope.deleteCustomer = function(customerId) {
            customersFactory.deleteCustomer(customerId)
                .then(function(response) {
                    var status = response.data;
                    if (status) {
                        for (var i = 0, len = $scope.customers.length; i < len; i++) {
                            if ($scope.customers[i].id === customerId) {
                                $scope.customers.splice(i, 1);
                                break;
                            }
                        }
                    } else {
                        $window.alert('Unable to delete customer');
                    }

                }, function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                });
        };

        $scope.addCustomer = function(customer) {
            customersFactory.addCustomer(customer).then(function(response) {
                    var status = response.data;
                    if (status) {
                        $("#success-alert-addCustomer").fadeTo(2000, 500).fadeIn(500, function() {
                            $("#success-alert-addCustomer").slideUp(500);
                        });
                    } else {
                        $window.alert('Unable to add customer');
                    }
                    customer.name = '';
                    customer.city = '';
                }, function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                }

            );

        };
    };

    CustomersController.$inject = ['$scope', '$log', '$window', 'customersFactory',
        'appSettings'
    ];

    angular.module('customersApp')
        .controller('CustomersController', CustomersController);

}());