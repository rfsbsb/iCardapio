carrinho = {};

cardapio = {
  calabresa: {
    nome: "Pizza de calabresa",
    preco: 12.90,
    total: 0
  },
  portuguesa: {
    nome: "Pizza portuguesa",
    preco: 15.50,
    total: 0
  },
  marguerita: {
    nome: "Pizza marguerita",
    preco: 27.50,
    total: 0
  },
  ruculatomateseco: {
    nome: "Pizza de rúcula com tomate seco",
    preco: 32.70,
    total: 0
  },
  vegetariana: {
    nome: "Pizza vegetariana",
    preco: 11.50,
    total: 0
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
        // ajuste de layout se for IOS 7
        if (parseFloat(window.device.version) >= 7.0) {
          $(".app, div.ui-header").css("margin-top", "20px");
        }

        $(document).on("change", ".item", function(event){
          var id = $(this).attr("id");
          app.calculate(id);
        });

        $(document).on("tap", "#send", function(){
          app.save();
        });
    },

    receivedEvent: function(id) {

    },

    calculate: function(elemento) {
      var items = $("#"+elemento).val();
      var total = total_items = 0;
      var item = cardapio[elemento];

      if ($.isNumeric(items) && Number(items) > 0) {
        item.total = item.preco * items;
        carrinho[elemento] = cardapio[elemento];

        $.map($(".item"), function(product, i) {
          var num = Number($(product).val());
          total_items += num;
        });

        $(".total-items").html(total_items);

        $.map(carrinho, function(product, i) {
          total += product.total;
        });
        $(".total-price").html(parseFloat(total));
      }
    },

    save: function() {
      var mesa = $("#mesa").val();
      var total = 0;
      $.map(carrinho, function(product, i) {
        total += product.total;
      });
      $.post("http://localhost/~rfsbsb/post.php", {mesa: mesa, total: total, carrinho: carrinho}, function(data){
        $("#mesa").val("");
        $(".item").val("");
        $(".total-items").html("0")
        $(".total-price").html("0.00");
        $('.ui-popup').popup('close');
        carrinho = {};
        console.log(data);
      });
    }
}