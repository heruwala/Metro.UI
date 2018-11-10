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
                $("#leader" + i).append(document.createTextNode((i + 1) + " - " + sorted[i].name));
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
    if (today >= 8 && today <= 16) {
        location.reload();
    }
}