let nickname = null;
let touchCount = 0;
let leaderboard = {};

// 닉네임 설정 로직
document.getElementById("set-nickname").addEventListener("click", () => {
    const input = document.getElementById("nickname-input").value.trim();

    if (!input) {
        document.getElementById("error-message").textContent = "닉네임을 입력하세요!";
    } else if (leaderboard[input]) {
        document.getElementById("error-message").textContent = "이미 존재하는 닉네임입니다!";
    } else {
        nickname = input;
        leaderboard[nickname] = 0;
        startGame();
    }
});

document.getElementById("skip-nickname").addEventListener("click", () => {
    nickname = "게스트";
    leaderboard[nickname] = 0;
    startGame();
});

// 게임 시작
function startGame() {
    document.getElementById("nickname-screen").style.display = "none";
    document.getElementById("game-screen").style.display = "block";
    document.getElementById("nickname-display").textContent = `닉네임: ${nickname}`;
}

// 터치 버튼 로직
document.getElementById("touch-button").addEventListener("click", () => {
    touchCount++;
    leaderboard[nickname] = touchCount;
    document.getElementById("touch-count").textContent = `터치 횟수: ${touchCount}`;
    updateLeaderboard();
});

// 순위표 업데이트
function updateLeaderboard() {
    const leaderboardElement = document.getElementById("leaderboard");
    leaderboardElement.innerHTML = "";

    const sorted = Object.entries(leaderboard).sort((a, b) => b[1] - a[1]);
    sorted.forEach(([name, count]) => {
        const li = document.createElement("li");
        li.textContent = `${name}: ${count}회`;
        leaderboardElement.appendChild(li);
    });
}