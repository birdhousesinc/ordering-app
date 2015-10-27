document.getElementById('say_hello').onclick = function () {
  document.getElementById('cloudResponse').innerHTML = "<p>Calling Cloud.....</p>";
  $fh.cloud(
      {
        path: 'orders',
        data: {
          product : $('#product').val(),
          account : $('#account').val(),
          quantity : $('#quantity').val()
        }
      },
      function (res) {
        document.getElementById('cloudResponse').innerHTML = "<p>" + res.msg + "</p>";
      },
      function (code, errorprops, params) {
        alert('An error occured: ' + code + ' : ' + errorprops);
      }
  );
};


$fh.cloud(
    {
      path: 'orders',
      method : 'GET'
    },
    function (orders) {
      
      //document.getElementById('cloudResponse').innerHTML = "<p>" + JSON.stringify(orders) + "</p>";
    },
    function (code, errorprops, params) {
      console.error('An error occured: ' + code + ' : ' + errorprops);
    }
);

$fh.cloud(
    {
      path: 'accounts',
      method : 'GET'
    },
    function (accounts) {
      accounts.forEach(function(account){
        $('#account').append('<option value="' + account.Id + '">' + account.name + '</option>')
      });
    },
    function (code, errorprops, params) {
      console.error('An error occured: ' + code + ' : ' + errorprops);
    }
);

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
