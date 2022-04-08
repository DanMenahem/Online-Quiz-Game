const difficultys = Array.from(document.getElementsByName('switch'));
const difficultytext = document.getElementById("difficultytext")

checkDifficulty()

difficultys.forEach(difficulty => {
    difficulty.addEventListener('click', (e) => {
        checkDifficulty();
    })
});

function play() {
    checkDifficulty();
    location.href = "/src/game.html";
}

function checkDifficulty() {
    if (difficultys[0].checked) {
        localStorage.setItem("difficulty", "easy");
        difficultytext.innerHTML = "In this mode you will have 30 second per question and a total of 5 attempts";
    } else if (difficultys[1].checked) {
        localStorage.setItem("difficulty", "normal");
        difficultytext.innerHTML = "In this mode you will have 20 second per question and a total of 3 attempts";
    } else {
        localStorage.setItem("difficulty", "hard");
        difficultytext.innerHTML = "In this mode you will have 12 second per question and a total of 3 attempts";
    }
};

