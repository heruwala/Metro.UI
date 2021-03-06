var allData = [];
window.onload = function () {

    // refresh every 30 seconds during working hours
    setInterval('refreshPage()', 30000);

    var tempUsers = JSON.parse(getUsers());
    var trailHeadUsers = tempUsers.user;

    // Get each user's Trailhead achievement
    trailHeadUsers.forEach(user => {
        GetTrailheadAchievements(user);
    });

    setTimeout(
        
        function () {
            var sorted = allData
            // sort by Points Descending
            sorted.sort(function (b, a) {
                return a.Points - b.Points;
            });

            // Display Top 6 only
            for (i = 0; i < 6; i++) {
                 var span = document.createElement("span")
                 span.innerHTML = "<span style='font-size:0.5em;line-height:15px;'>Trails: " + sorted[i].Trails + "<br>Badges: " + sorted[i].Badges + "<br>Points: " + sorted[i].Points + "</span><br><br><br><br>" + (i + 1) + ". " + sorted[i].name;
                $("#leader" + i).append(span);
            }

        }, 5000);
};

function getUsers() {
    return $.ajax({
        type: "GET",
        url: "https://script.google.com/macros/s/AKfycbx2Hck1djplDYpaKuF0OgonDwsaD2m43FVreLaQ8TeA6Sx1arHd/exec",
        async: false
    }).responseText;
}

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
        allData.push(data);
    });
}

function refreshPage() {
    var today = new Date().getHours();
    var day = today.getDay();
    var isWeekend = (day === 6) || (day === 0);    // 6 = Saturday, 0 = Sunday
    if ((today >= 8 && today <= 16) && !isWeekend ) {
        location.reload();
    }
}