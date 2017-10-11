//Gets called when read

    dataPointsWins = []
    dataPointsLosses = []

$(document).ready(function() {
    alert ("Calling SC2 API");


    $.ajax({
        type: "GET",
        url : "https://us.api.battle.net/sc2/profile/504418/1/Kudralisk/?locale=en_US&apikey=pajzmdv4a6vfdkmu5t4jabxhycyjcn5j",
        dataType : "json",
        success : function(response){
            console.log(response);
            var displayName = response.displayName
            var clanName = response.clanName
            var wins = response.season.stats["0"].wins
            var seasonGames = response.season.stats["0"].games
            var winrate = (wins / seasonGames*100).toFixed(3)
            var totalGames = response.career.careerTotalGames
            document.getElementById("displayName").innerHTML = displayName
            document.getElementById("clanName").innerHTML = clanName
            document.getElementById("winsToGames").innerHTML = "Season wins/loss: " + wins + "/" + (seasonGames-wins)
            document.getElementById("winRate").innerHTML = "Win rate : " + winrate + "%"
            document.getElementById("totalGames").innerHTML = "Total Games : " + totalGames
            },
        error : function(response){
            alert("Api call failed, logged response in console")
            console.log(response);
        }
    });

    graph_data_ajax(function() {
        var chart = new CanvasJS.Chart("chartContainer", {
        animationEnabled: true,
        title:{
            text: "Wins/Losses by Map (25 Most Recent Games)"
        },  
        axisY: {
            title: "Number",
            titleFontColor: "#000",
            lineColor: "#000",
            labelFontColor: "#000",
            tickColor: "#000"
        },
        axisX: {
            title: "Map",
            titleFontColor: "#000",
            lineColor: "#000",
            labelFontColor: "#000",
            tickColor: "#000"
        },
        toolTip: {
            shared: true
        },
        legend: {
            cursor:"pointer",
            horizontalAlign: "right",
            verticalAlign: "bottom",
        },
        data: [{
            type: "column",
            color: "#0099e6",
            name: "Wins",
            legendText: "Wins",
            showInLegend: true, 
            dataPoints: dataPointsWins
        },
        {
            type: "column", 
            color: "#ff3333",
            name: "Losses",
            legendText: "Losses",
            showInLegend: true,
            dataPoints: dataPointsLosses
        }]
    });
    chart.render();
    })
});

function graph_data_ajax(callback){
        $.ajax({
        type: "GET",
        url : "https://us.api.battle.net/sc2/profile/504418/1/Kudralisk/matches?locale=en_US&apikey=pajzmdv4a6vfdkmu5t4jabxhycyjcn5j",
        dataType : "json",
        success : function(response){
            console.log(response);
            var hash = {};
            for (i = 0; i < 25; i++){
                var map = response.matches[i].map;
                var decision = response.matches[i].decision;
                hash[map] = hash[map] || {};
                if ($.isEmptyObject(hash[map])) {
                    hash[map] = {'wins' : 0, 'losses' : 0}
                }

                if (decision == "WIN") {
                    hash[map]['wins'] = hash[map]['wins'] + 1;
                } else {
                    hash[map]['losses'] = hash[map]['losses'] + 1;
                }
            }

            console.log(hash)

            for (var key in hash){
                dataPointsWins.push({label: key, y: hash[key]['wins']})
                dataPointsLosses.push({label: key, y: hash[key]['losses']})
                console.log("Key : " + key + " map :" + hash[key])
            }
            console.log(dataPointsWins);
            console.log(dataPointsLosses);
            callback();
        },
        error : function(response){
            alert("Api call failed, logged response in console")
            console.log(response);
        },
    });
};

// function sc2_api() {
//     alert ("Calling SC2 API");

//     $.ajax({
//         type: "GET",
//         url : "https://us.api.battle.net/sc2/profile/504418/1/Kudralisk/?locale=en_US&apikey=pajzmdv4a6vfdkmu5t4jabxhycyjcn5j",
//         dataType : "json",
//         success : function(response){
//             console.log(response);
//             var displayName = response.displayName
//             var clanName = response.clanName
//             var wins = response.season.stats["0"].wins
//             var seasonGames = response.season.stats["0"].games
//             var winrate = (wins / seasonGames*100).toFixed(3)
//             var totalGames = response.career.careerTotalGames
//             document.getElementById("displayName").innerHTML = displayName
//             document.getElementById("clanName").innerHTML = clanName
//             document.getElementById("winsToGames").innerHTML = "Season wins/loss: " + wins + "/" + (seasonGames-wins)
//             document.getElementById("winRate").innerHTML = "Win rate : " + winrate + "%"
//             document.getElementById("totalGames").innerHTML = "Total Career Games : " + totalGames
//         },
//         error : function(response){
//             console.log(response);
//         }
//     });

// };

