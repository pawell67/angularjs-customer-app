(function() {

    var AddCustomerController = function($scope, $log, customersFactory) {


        $scope.addCustomer = function(customer) {
            $log.log(customer);
            customersFactory.addCustomer(customer).then(function(response) {
                    var status = response.data;
                    if (status) {
                        // for (var i=0,len=$scope.customers.length;i<len;i++) {
                        //     if ($scope.customers[i].id === customerId) {
                        //        $scope.customers.splice(i,1);
                        //        break;
                        //     }
                        // }  
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