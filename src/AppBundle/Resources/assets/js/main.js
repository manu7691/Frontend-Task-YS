// On document loaded, considering js is loaded before body elements
$(function(){
    // selector notify button
    $notificationButton = $('#notify');
    // Remove button from paragraph and append to the div of notifications
    $('#notifications').append($notificationButton);

    // Notify button on click event
    $notificationButton.click(function(){
        // same random id for the "message"
        randomId = 'rewrwe21';
        // Create a div with static text and with id (random id) and set it as hidden
        $randomElement = $('<div>')
            .attr('id',randomId)
            .text('test notification')
            .hide();
        // append this new div with the message to the div messages
        $('#messages').append($randomElement);
        // Show message for a while and later hide it , after be hidden, remove it
        $randomElement
            .fadeIn(1000)
            .fadeOut(1000,function(){
                $(this).remove();
            });
    });
});