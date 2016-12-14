$(".btn").mouseup(function(){
    $(this).blur();
})

$(window).on('resize', function() {
    if($(window).width() > 980) {
        $('#flipp-eq-height').addClass('row-eq-height');
    }else{
        $('#flipp-eq-height').removeClass('row-eq-height');
    }
})

$(window).on('resize', function() {
    if($(window).width() > 980) {
        $('#dh-eq-height').addClass('row-eq-height');
    }else{
        $('#dh-eq-height').removeClass('row-eq-height');
    }
})