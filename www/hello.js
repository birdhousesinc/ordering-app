document.getElementById('say_hello').onclick = function () {
  document.getElementById('cloudResponse').innerHTML = "<p>Getting location.....</p>";
  navigator.geolocation.getCurrentPosition(function(coordinates){
    document.getElementById('cloudResponse').innerHTML = "<p>Calling Cloud.....</p>";
    $fh.cloud(
        {
          path: 'orders',
          data: {
            product : $('#product').val(),
            account : $('#account').val(),
            quantity : $('#quantity').val(),
            latitude : coordinates.coords.latitude,
            longitude : coordinates.coords.longitude
          }
        },
        function (res) {
          document.getElementById('cloudResponse').innerHTML = "<p>Order Created</p>";
        },
        function (code, errorprops, params) {
          alert('An error occured: ' + code + ' : ' + errorprops);
        }
    );  
  });  
};

// Retrieve historic orders
$fh.cloud(
    {
      path: 'orders',
      method : 'GET'
    },
    function (orders) {
      orders.forEach(function(order){
        $('#orders tbody').append('<tr><td>' + order.product.name + '</td><td>' + order.account.Name +  '</td><td>' +order.account.Phone + '</td><td>' + order.quantity +  '</td></tr>')
      });
    },
    function (code, errorprops, params) {
      console.error('An error occured: ' + code + ' : ' + errorprops);
    }
);

// Get our list of accounts to append into our select box
$fh.cloud(
    {
      path: 'accounts',
      method : 'GET'
    },
    function (accounts) {
      accounts.forEach(function(account){
        $('#account').append('<option value="' + account.Id + '">' + account.Name + '</option>')
      });
    },
    function (code, errorprops, params) {
      console.error('An error occured: ' + code + ' : ' + errorprops);
    }
);

// Get our list of potential products to put into our product selector
$fh.cloud(
    {
      path: 'products',
      method : 'GET'
    },
    function (products) {
      products.forEach(function(product){
        $('#product').append('<option value="' + product.id + '">' + product.name + ' ($' + product.price + ')</option>')
      });
    },
    function (code, errorprops, params) {
      console.error('An error occured: ' + code + ' : ' + errorprops);
    }
);
