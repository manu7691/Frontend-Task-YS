// On document loaded, considering js is loaded before body elements
$(function(){
    // selector notify button
    $notificationButton = $('.btn_notify');
    //responsive menu
    $menuMobile = $('.menu__items_mobile');

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
        $('.messages').append($randomElement);
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
    $menu = $('.menu__subcontainer');
    $header = $('header');
    $(window).scroll(function () {
        if ($(this).scrollTop() > 0) {
            $menu.addClass('is--fixed');
            $menuMobile.addClass('is--fixed');

        } else {
            $menu.removeClass('is--fixed');
            $menuMobile.removeClass('is--fixed');
        }
    });

    // Value of the cart loaded/stored on LocalStorage
    // considering there is not backend built to update values via AJAX POST
    var numItemsCart = localStorage['items_cart'] || 0; /* for integers */
    $itemsCart = $('.menu__shopping_cart__items_cart');
    $itemsCart.html(numItemsCart);
    $itemsCart.show();
    $('#addtocart').click(function(){
        numItemsCart = parseInt(numItemsCart) + 1;
        $itemsCart.html(numItemsCart);
        localStorage.setItem('items_cart',numItemsCart);
    })

    // Menu expanded

    $('.menu__hamburger').click(function(){
        $article = $('article');
        $iconHamburger = $('.menu__hamburger__icon');
        $iconClose = $('.menu__hamburger_close__icon');
        if($menuMobile.hasClass('is--expanded')){
            $menuMobile.removeClass('is--expanded');
            $article.removeClass('menu--expanded');
            $iconHamburger.show();
            $iconClose.hide();
        }else{
            $menuMobile.addClass('is--expanded');
            $article.addClass('menu--expanded');
            $iconHamburger.hide();
            $iconClose.show();
        }
    });
});