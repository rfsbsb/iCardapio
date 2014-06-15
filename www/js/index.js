carrinho = {};

cardapio = {
  calabresa: {
    nome: "Pizza de calabresa",
    preco: 12.90
  },
  portuguesa: {
    nome: "Pizza portuguesa",
    preco: 15.50
  },
  marguerita: {
    nome: "Pizza marguerita",
    preco: 27.50
  },
  ruculatomateseco: {
    nome: "Pizza de rúcula com tomate seco",
    preco: 32.70
  },
  vegetariana: {
    nome: "Pizza vegetariana",
    preco: 11.50
  },
};

var app = {
    initialize: function() {
      this.bindEvents();
    },
    bindEvents: function() {
      document.addEventListener('deviceready', this.onDeviceReady, false);
    },
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        if (parseFloat(window.device.version) >= 7.0) {
          $(".app, div.ui-header").css("margin-top", "20px");
        }
        $(document).on("tap", ".item", function(event){
          $(this).toggleClass("ui-icon-plus ui-icon-minus");
          var id = $(this).attr("id");
          app.calculate(id);
        });

        $(document).on("tap", "#send", function(){
          app.save();
        });
    },
    receivedEvent: function(id) {

    },
    calculate: function(item) {
      if (carrinho[item] != undefined) {
        delete carrinho[item];
      } else {
        carrinho[item] = cardapio[item];
      }
      $(".total-items").html(Object.keys(carrinho).length);
      var preco = 0;
      $.map(carrinho, function(product, i) {
        preco += product.preco;
      });
      $(".total-price").html(parseFloat(preco));
    },
    save: function() {
      var mesa = $("#mesa").val();
      $.post("http://localhost/~rfsbsb/post.php", {mesa: mesa, carrinho: carrinho}, function(data){
        $("#mesa").val("");
        $(".total-items").html("0")
        $(".total-price").html("0.00");
        $('.ui-popup').popup('close');
        $(".ui-icon-minus").addClass("ui-icon-plus").removeClass("ui-icon-minus");
        carrinho = {};
        console.log(data)
      });
    }
}