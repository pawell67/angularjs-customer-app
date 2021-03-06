(function() {

    var app = angular.module('customersApp', ['ngRoute', 'ngAnimate']);


    app.config(function($routeProvider) {
        $routeProvider
            .when('/', {
                controller: 'CustomersController',
                templateUrl: 'app/views/customers.html'
            })
            .when('/orders/:customerId', {
                controller: 'OrdersController',
                templateUrl: 'app/views/orders.html'
            })
            .when('/orders', {
                controller: 'OrdersController',
                templateUrl: 'app/views/allorders.html'
            })
            .when('/addCustomer', {
                controller: 'CustomersController',
                templateUrl: 'app/views/addcustomer.html'
            })
            .when('/customer/:customerId', {
                controller: 'OrdersController',
                templateUrl: 'app/views/customer.html'
            })
            .when('/customer/:customerId/addOrder', {
                controller: 'OrdersController',
                templateUrl: 'app/views/addorder.html'
            })
            .otherwise({ redirectTo: '/' });
    })

}());