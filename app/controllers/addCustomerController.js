(function() {

    var AddCustomerController = function($scope, $log, customersFactory) {


        $scope.addCustomer = function(customer) {
            $log.log(customer);
            customersFactory.addCustomer(customer).then(function(response) {
                    var status = response.data;
                    if (status) {
                        $log.log('Customer added');
                    } else {
                        $window.alert('Unable to add customer');
                    }

                }, function(data, status, headers, config) {
                    $log.log(data.error + ' ' + status);
                }

            );
        }
    };

    AddCustomerController.$inject = ['$scope', '$log', 'customersFactory'];

    angular.module('customersApp')
        .controller('AddCustomerController', AddCustomerController);

}());