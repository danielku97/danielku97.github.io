$(".btn").mouseup(function(){
    $(this).blur();
})

$(window).on('resize', function() {
    if($(window).width() > 980) {
        console.log('small')
        $('#flipp-eq-height').addClass('row-eq-height');
    }else{
        console.log('big')
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