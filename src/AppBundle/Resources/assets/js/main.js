// On document loaded, considering js is loaded before body elements
$(function(){
    // selector notify button
    $notificationButton = $('#notify');

    // Notify button on click event
    $notificationButton.click(function(){
        // Disable button to avoid multiple notifications
        $(this).css('pointer-events', 'none');
        // same random id for the "message"
        randomId = 'rewrwe21';
        // Create a div with static text and with id (random id) and set it as hidden
        $randomElement = $('<div>')
            .attr('id',randomId)
            .text('You\'ll receive a message once we get this product in stock')
            .hide();
        // append this new div with the message to the div messages
        $('#messages').append($randomElement);
        // Show message for a while and later hide it , after be hidden, remove it
        $randomElement
            .fadeIn(1000)
            .fadeOut(6000,function(){
                $(this).remove();
                //Enable button to allow notifications
                $notificationButton.css('pointer-events', 'auto');
            });
    });


    //Sticky menu
    $menu = $('.menu--subcontainer');
    $header = $('header');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $menu.addClass("menu--fixed");
        } else {
            $menu.removeClass("menu--fixed");
        }
    });

    // Value of the cart loaded/stored on LocalStorage
    // considering there is not backend built to update values via AJAX POST
    var numItemsCart = localStorage['items-cart'] || 0; /* for integers */
    $itemsCart = $('.menu--shopping-cart--items-cart');
    $itemsCart.html(numItemsCart);
    $itemsCart.show();
    $('#addtocart').click(function(){
        numItemsCart = parseInt(numItemsCart) + 1;
        $itemsCart.html(numItemsCart);
        localStorage.setItem('items-cart',numItemsCart);
    })
});