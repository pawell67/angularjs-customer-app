(function() {

    var AddCustomerController = function($scope, $log, $window, customersFactory) {
        $("#success-alert-addCustomer").hide();
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
        }
    };

    AddCustomerController.$inject = ['$scope', '$log', '$window', 'customersFactory'];

    angular.module('customersApp')
        .controller('AddCustomerController', AddCustomerController);

}());