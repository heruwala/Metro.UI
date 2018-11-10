var allData = [];
window.onload = function(){
    //var users = ["gidich", "dhaval", "nathanielm", "raymunyan", "mikecorsi", "00550000007G8A3AAK"];
    setInterval('refreshPage()', 30000);

    var tempUsers = JSON.parse(getUsers());
    var trailHeadUsers = tempUsers.user;
    /*
    var trailHeadUsers = [ 
        { "username" : "gidich" , "name" : "Patrick Gidich" } ,
        { "username" : "dhaval" , "name" : "Dhaval Heruwala" } ,
        { "username" : "nathanielm" , "name" : "Nathan Mccarthy" } ,
        { "username" : "raymunyan" , "name" : "Ray Munyan" } ,
        { "username" : "mikecorsi" , "name" : "Mike Corsi" } ,
        { "username" : "00550000007G8A3AAK" , "name" : "Valeri Gorbochov" } 
    ];
    */
    //alert(tempUsers.user);

    //alert(trailHeadUsers);

    trailHeadUsers.forEach(user => {
        GetTrailheadAchievements(user); 
    });

    setTimeout(
        function() 
        {
          //do something special
          console.log(allData);
          var sorted = allData
          // sort by value
          sorted.sort(function (b, a) {
             return a.Points - b.Points;
          });
          console.log(sorted);
          /*
          jQuery.each( sorted, function( i, val ) {
            ///alert( i + ": " + val.user );
            $( "#leader" + i ).append( document.createTextNode( (i + 1) + " - " + val.user ) );
          });
          */

          // Top 6 only
          for (i = 0; i < 6; i++) { 
            $( "#leader" + i ).append( document.createTextNode( (i + 1) + " - " + sorted[i].name ) );
        }

        }, 5000);


};

function GetTrailheadAchievements(user) {
    $.ajax({
        url: "https://wrapapi.com/use/trailhead/leaderboard/achievement/0.0.3",
        method: "POST",
        data: {
            "parameter": user.username,
            "wrapAPIKey": "BhD5I8yg68U56UQ9XIZaS3YMAwZMKj0G"
        }
    }).done(function (data) {
        data.name = user.name;
        console.log(data);
        //alert(data.Points);
        allData.push(data);       
    });
}


function getUsers() {
    return $.ajax({
        type: "GET",
        url: "https://script.google.com/macros/s/AKfycbx2Hck1djplDYpaKuF0OgonDwsaD2m43FVreLaQ8TeA6Sx1arHd/exec",
        async: false
    }).responseText;
}

function refreshPage() { 
    var today = new Date().getHours();
    if (today >= 10 && today <= 16) {
    location.reload(); 
    }
}