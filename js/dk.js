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
            document.getElementById("displayName").innerHTML = response.displayName
            document.getElementById("clanName").innerHTML = response.clanName
        },
        error : function(response){
            console.log(response);
        }
    });

}