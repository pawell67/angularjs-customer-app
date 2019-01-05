var express = require('express'),
    app = express();

app.use(express.static(__dirname + '/'));

app.get('/customers/:id', function(req, res) {
    var customerId = parseInt(req.params.id);
    var data = {};
    for (var i = 0, len = customers.length; i < len; i++) {
        if (customers[i].id === customerId) {
            data = customers[i];
            break;
        }
    }
    res.json(data);
});

app.get('/customers', function(req, res) {
    res.json(customers);
});

app.get('/orders', function(req, res) {
    var orders = [];
    for (var i = 0, len = customers.length; i < len; i++) {
        if (customers[i].orders) {
            for (var j = 0, ordersLen = customers[i].orders.length; j < ordersLen; j++) {
                orders.push(customers[i].orders[j]);
            }
        }
    }
    res.json(orders);
});

app.delete('/customers/:id', function(req, res) {
    var customerId = parseInt(req.params.id);
    var data = { status: true };
    for (var i = 0, len = customers.length; i < len; i++) {
        if (customers[i].id === customerId) {
            customers.splice(i, 1);
            data = { status: true };
            break;
        }
    }
    res.json(data);
});

app.post('/addCustomer', function(req, res) {
    var request = req.query;
    var customerName = request.name;
    var customerCity = request.city;
    var id = customers.length + 1;
    var date = new Date();
    var year = date.getFullYear();
    var month = date.getMonth() + 1;
    if (month < 10) {
        month = '0' + month;
    }
    var day = date.getDate();
    if (day < 10) {
        day = '0' + day;
    }
    customers.push({
        id: id,
        joined: `${year}-${month}-${day}`,
        name: customerName,
        city: customerCity,
        orderTotal: 0,
        orders: []

    })
    res.json(customers);
});

app.post('/customer/:customerId/addOrder', function(req, res) {
    var request = req.query;
    var product = request.product;
    var total = parseFloat(request.price);
    var customerId = parseInt(req.params.customerId);
    for (var i = 0; i < customers.length; i++) {
        if (customerId === customers[i].id) {
            customers[i].orders.push({
                id: getNewId(customers),
                product: product,
                total: total
            })
        }
    }
    res.json(customers);
});

app.put('/customers/:id', function(req, res) {
    var customer = JSON.parse(req.query.customer);
    for (var i = 0; i < customers.length; i++) {
        if (customer.id === customers[i].id) {
            customers[i].name = customer.name;
            customers[i].city = customer.city;
        }
    }
    res.json(customers)
});

app.listen(8080);

console.log('Express listening on port 8080');

function getNewId(customers) {
    var id = 0;
    for (var i = 0; i < customers.length; i++) {
        var orders = customers[i].orders;
        for (var j = 0; j < orders.length; j++) {
            if (orders[j].id > id) {
                id = orders[j].id;
            }
        }
    }
    return ++id;
}
var customers = [{
        id: 1,
        joined: '2000-12-02',
        name: 'John',
        city: 'Chandler',
        orderTotal: 9.9956,
        orders: [{
            id: 1,
            product: 'Shoes',
            total: 9.9956
        }]
    },
    {
        id: 2,
        joined: '1965-01-25',
        name: 'Zed',
        city: 'Las Vegas',
        orderTotal: 19.99,
        orders: [{
                id: 2,
                product: 'Baseball',
                total: 9.995
            },
            {
                id: 3,
                product: 'Bat',
                total: 9.995
            }
        ]
    },
    {
        id: 3,
        joined: '1944-06-15',
        name: 'Tina',
        city: 'New York',
        orderTotal: 44.99,
        orders: [{
            id: 4,
            product: 'Headphones',
            total: 44.99
        }]
    },
    {
        id: 4,
        joined: '1995-03-28',
        name: 'Dave',
        city: 'Seattle',
        orderTotal: 101.50,
        orders: [{
            id: 5,
            product: 'Kindle',
            total: 101.50
        }]
    }
];