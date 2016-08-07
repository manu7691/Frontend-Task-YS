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
    // While scrolling, add or remove is_fixed class, to set or not sticky menu
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

// Functions are set here to avoid multiple JS files, and make easier "cache" them
// these functions are load mainly from Checkout Page on block javascript

// Function to update basket details on Checkout Page
function updateBasket(){
    var currency = 'PLN';
    var shippingCost = 20;
    var taxPercentage = 19;
    var randomPrice = 40;
    var numItemsCart = localStorage['items_cart'] || 0;
    if(numItemsCart == 0){
        $('.checkout__cart_item').remove();
        $('.checkout__cart_total').remove();
        $('.checkout__cart_empty').show();
    }else{
        var total = (numItemsCart * randomPrice) + shippingCost;
        var taxes = total * (taxPercentage/100);
        var subtotal = total - taxes;

        $("label[for='checkout__cart_item_qty'] span").html(numItemsCart);
        $("label[for='checkout__cart_item_price'] span").html(randomPrice+currency);

        $("label[for='checkout__cart_total_subtotal'] span").html(subtotal+currency);
        $("label[for='checkout__cart_total_tax'] span").html(taxes+currency);
        $("label[for='checkout__cart_total_shipping'] span").html(shippingCost+currency);
        $("label[for='checkout__cart_total_total'] span").html(total+'PLN');
    }
}

// Add method to Jquery as util
$.fn.hasAttr = function(name) {
    return this.attr(name) !== undefined;
};

// Function to validate if emails has correct format using Regex
function validateEmail(email) {
    var re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
}

// Function to verify inputs on Form Checkout
function CheckInputsCheckoutForm($elem){
    $elem.on('change focus keyup',function(){
        if(!$(this).val() && $(this).hasAttr('required')){
            $(this).parent().addClass('error');
        }else{
            if($(this).parent().hasClass('error')){
                if(($(this)[0].id === 'form_email' && !validateEmail($(this).val()))){
                    $('.error-format').show();
                }else{
                    if($(this)[0].id === 'form_email'){
                        $('.error-format').hide();
                    }
                    $(this).parent().removeClass('error');
                }
            }
        }
    });
}

// Same function as previous one but for Select
function CheckSelectCheckoutForm($elem){
    $elem.on('change focus',function(){
        if(!$(this).val()){
            $(this).parent().parent().addClass('error');
        }else if($(this).parent().parent().hasClass('error')){
            $(this).parent().parent().removeClass('error');
        }
    });
}

// Verify that form checkout is valid
function isValidCheckoutForm($elements){
    $elements[0].on('click',function(){
        $elements[1].trigger('change');
        $elements[2].trigger('change');
        setTimeout(function(){
            if(!$elements[1].parent().hasClass('error') && !$elements[2].parent().parent().hasClass('error'))
                alert('Checkout Complete! :D')
        },200);
    });
}