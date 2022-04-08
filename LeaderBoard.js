const highScoresList = document.getElementById("highScoresList");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];

highScoresList.innerHTML =
    highScores.map(score => {
        return '<li><mark>' + score.name + '</mark><small>' + score.score + '</small></li>';
    }).join("");