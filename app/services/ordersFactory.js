(function() {
    var ordersFactory = function($http) {

        var factory = {};

        factory.addOrder = function(order, customerId) {
            return $http({ url: 'customer/' + customerId + '/addOrder', params: { product: order.product, price: order.total }, method: 'POST' });
        }

        factory.deleteOrder = function(orderId) {
            return $http.delete('/orders/' + orderId);
        }

        return factory;
    };

    ordersFactory.$inject = ['$http'];

    angular.module('customersApp').factory('ordersFactory',
        ordersFactory);

}());