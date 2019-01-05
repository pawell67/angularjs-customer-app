(function() {
    var customersFactory = function($http) {

        var factory = {};

        factory.getCustomers = function() {
            return $http.get('/customers');
        };

        factory.getCustomer = function(customerId) {
            return $http.get('/customers/' + customerId);
        };

        factory.getOrders = function() {
            return $http.get('/orders');
        };

        factory.deleteCustomer = function(customerId) {
            return $http.delete('/customers/' + customerId);
        };

        factory.addCustomer = function(customer) {
            return $http({ url: '/addCustomer', params: { name: customer.name, city: customer.city }, method: 'POST' });
        };

        factory.updateCustomer = function(customer) {
            return $http({ url: '/customers/' + customer.id, params: { customer: customer }, method: 'PUT' });
        }

        factory.addOrder = function(order, customerId) {
            return $http({ url: 'customer/' + customerId + '/addOrder', params: { product: order.product, price: order.total }, method: 'POST' });
        }

        factory.deleteOrder = function(orderId) {
            return $http.delete('/orders/' + orderId);
        }

        return factory;
    };

    customersFactory.$inject = ['$http'];

    angular.module('customersApp').factory('customersFactory',
        customersFactory);

}());