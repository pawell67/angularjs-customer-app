(function() {
    var customersService = function() {

        this.getCustomers = function() {
            return customers;
        };

        this.getCustomer = function(customerId) {
            for (var i = 0, len = customers.length; i < len; i++) {
                if (customers[i].id === parseInt(customerId)) {
                    return customers[i];
                }
            }
            return {};
        };

    };

    angular.module('customersApp').service('customersService', customersService);

}());