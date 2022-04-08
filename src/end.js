const username = document.getElementById("username");
const saveScoreBtn = document.getElementById("saveScoreBtn");
const finalScore = document.getElementById("finalScore");
const reviewtext = document.getElementById("reviewtext");
const reviewimg = document.getElementById("reviewimg");
const lastScore = localStorage.getItem("lastScore");
const highScores = JSON.parse(localStorage.getItem("highScores")) || [];
const MAX_HIGH_SCORES = 5;

finalScore.innerText = lastScore;
incertReview()

username.addEventListener('keyup', () => {
    saveScoreBtn.disabled = !username.value;
})

function saveHighScore(e) {
    const score = {
        score: lastScore,
        name: username.value
    };
    highScores.push(score);
    highScores.sort(function compareFn(a, b) { return b.score - a.score });
    highScores.splice(MAX_HIGH_SCORES);

    localStorage.setItem("highScores", JSON.stringify(highScores));
    window.location.assign("/index.html");
    console.log(highScores);
    e.preventDefault();
}

function incertReview() {
    if (lastScore <= 200) {
        reviewtext.innerText = "You can do better, try again next time!";
        reviewimg.src = "/images/crying.png";
        reviewimg.style.width = "5rem";
    } else if (lastScore <= 350) {
        reviewtext.innerText = "Nice score, but we know you can do better!";
        reviewimg.src = "/images/smile.png";
        reviewimg.style.width = "5rem";
    } else if (lastScore <= 500) {
        reviewtext.innerText = "Great score, well done!";
        reviewimg.src = "/images/happy.png";
        reviewimg.style.width = "7rem";
    } else {
        reviewtext.innerText = "You are a pro!!";
        reviewimg.src = "/images/sunglasses.png";
        reviewimg.style.width = "5rem";
    }
}
