//Gets called when read

    dataPointsWins = []
    dataPointsLosses = []
    dataPointsWins2 = []
    dataPointsLosses2 = []

$(document).ready(function() {

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
            document.getElementById("winsToGames").innerHTML = wins + "/" + (seasonGames-wins)
            document.getElementById("winRate").innerHTML = winrate + "%"
            document.getElementById("totalGames").innerHTML = totalGames
            },
        error : function(response){
            alert("Api call failed, logged response in console")
            console.log(response);
        }
    });

    $.ajax({
        type: "GET",
        url : "https://us.api.battle.net/sc2/profile/10243470/1/SedraSmith/?locale=en_US&apikey=pajzmdv4a6vfdkmu5t4jabxhycyjcn5j",
        dataType : "json",
        success : function(response){
            console.log(response);
            var displayName2 = response.displayName
            var clanName2 = response.clanName
            var wins2 = response.season.stats["0"].wins
            var seasonGames2 = response.season.stats["0"].games
            var winrate2 = (wins2 / seasonGames2*100).toFixed(3)
            var totalGames2 = response.career.careerTotalGames
            document.getElementById("displayName2").innerHTML = displayName2
            document.getElementById("winsToGames2").innerHTML = wins2 + "/" + (seasonGames2-wins2)
            document.getElementById("winRate2").innerHTML = winrate2 + "%"
            document.getElementById("totalGames2").innerHTML = totalGames2
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
            name: "Kudralisk Wins",
            legendText: "Kudralisk Wins",
            showInLegend: true, 
            dataPoints: dataPointsWins
        },
        {
            type: "column", 
            color: "#ff3333",
            name: "Kudralisk Losses",
            legendText: "Kudralisk Losses",
            showInLegend: true,
            dataPoints: dataPointsLosses
        },
        {
            type: "column",
            color: "#005580",
            name: "Sedra Wins",
            legendText: "Sedra Wins",
            showInLegend: true, 
            dataPoints: dataPointsWins2
        },
        {
            type: "column", 
            color: "#c00",
            name: "Sedra Losses",
            legendText: "Sedra Losses",
            showInLegend: true,
            dataPoints: dataPointsLosses2
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

    $.ajax({
        type: "GET",
        url : "https://us.api.battle.net/sc2/profile/10243470/1/SedraSmith/matches?locale=en_US&apikey=pajzmdv4a6vfdkmu5t4jabxhycyjcn5j",
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
                dataPointsWins2.push({label: key, y: hash[key]['wins']})
                dataPointsLosses2.push({label: key, y: hash[key]['losses']})
                console.log("Key : " + key + " map :" + hash[key])
            }
            console.log(dataPointsWins2);
            console.log(dataPointsLosses2);
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

