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

//Gets called when read
// $(document).ready(function() {
 
//     alert( "welcome" );
 
// });

function sc2_api() {
    alert ("Calling SC2 API");

    $.ajax({
        type: "GET",
        url : "https://us.api.battle.net/sc2/profile/504418/1/Kudralisk/?locale=en_US&apikey=pajzmdv4a6vfdkmu5t4jabxhycyjcn5j",
        dataType : "json",
        success : function(response){
            console.log(response);
            document.getElementById("api-results").innerHTML = response.displayName
        },
        error : function(response){
            console.log(response);
        }
    });

}