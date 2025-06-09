if (typeof whoKnowsCards === 'undefined') {
  alert("❗️ לא נטענו קלפי המשחק. ודא ש־cardsWhoKnows.js נטען לפני הקובץ הזה.");
}

let questions = [];
let currentTurn = 0;
let currentIndex = 0;
var whoKnowsPlayerNames = [];
var whoKnowsScores = [0, 0];

function normalize(str) {
  return str.replace(/[^\w\sא-ת]/g, '').replace(/\s+/g, ' ').trim().toLowerCase();
}

function startWhoKnowsGame() {
  const player1 = document.getElementById("whoKnowsPlayer1").value || "שחקן 1";
  const player2 = document.getElementById("whoKnowsPlayer2").value || "שחקן 2";
  const numQuestions = parseInt(document.getElementById("whoKnowsNumQuestions").value) || 10;

  whoKnowsPlayerNames = [player1, player2];
  questions = shuffle([...whoKnowsCards]).slice(0, numQuestions);
  whoKnowsScores = [0, 0];
  updateScoreUI();

  document.getElementById("whoKnowsStart").style.display = "none";
  document.getElementById("whoKnowsScreen").style.display = "block";

  showCurrentQuestion();
  fillCardsIndex();
}

function showCurrentQuestion() {
  const q = questions[currentIndex];
  if (!q) {
    const [score1, score2] = whoKnowsScores;
    let resultText = `התוצאה: ${whoKnowsPlayerNames[0]} - ${score1} | ${whoKnowsPlayerNames[1]} - ${score2}<br><br>`;

    if (score1 > score2) resultText += `🏆 המנצח הוא ${whoKnowsPlayerNames[0]}!`;
    else if (score2 > score1) resultText += `🏆 המנצח הוא ${whoKnowsPlayerNames[1]}!`;
    else resultText += `🤝 המשחק הסתיים בתיקו!`;

    document.getElementById("whoKnowsTurn").innerText = "🎉 המשחק הסתיים!";
    document.getElementById("whoKnowsQuestion").innerHTML = resultText;
    document.getElementById("whoKnowsActions").innerHTML = `
      <button onclick="location.reload()">🔁 התחל מחדש</button>
    `;
    return;
  }

  document.getElementById("whoKnowsTurn").innerText = `תור של ${whoKnowsPlayerNames[currentTurn]}`;
  document.getElementById("whoKnowsQuestion").innerText = q.text;
}

function completeWhoKnows() {
  currentIndex++;
  currentTurn = (currentTurn + 1) % 2;
  showCurrentQuestion();
}

function addPointAndNext() {
  whoKnowsScores[currentTurn]++;
  updateScoreUI();

  const currentText = normalize(questions[currentIndex].text);
  const allItems = document.querySelectorAll("#cardIndexList .card-index-item");

  let matched = false;
  allItems.forEach(item => {
    if (item.dataset.text === currentText) {
      item.classList.add("card-played");
      matched = true;
    }
  });

  if (!matched) console.warn("❗️ לא נמצא קלף תואם לסימון:", currentText);
  completeWhoKnows();
}

function skipWhoKnows() {
  questions.push(questions.splice(currentIndex, 1)[0]);
  currentTurn = (currentTurn + 1) % 2;
  showCurrentQuestion();
}

function updateScoreUI() {
  document.getElementById("scorePlayer1").innerText = whoKnowsScores[0];
  document.getElementById("scorePlayer2").innerText = whoKnowsScores[1];
}

function fillCardsIndex() {
  const container = document.getElementById("cardIndexList");
  if (!container || questions.length === 0) return;

  container.innerHTML = "<b>📋 רשימת השאלות במשחק:</b><br><br>";
  questions.forEach((q, i) => {
      console.log(`שאלה ${i + 1}:`, q);  // ← הוסף שורה זו לבדיקה

    const item = document.createElement("div");
    item.className = "card-index-item";
    item.dataset.text = normalize(q.text);

    const span = document.createElement("span");
    span.textContent = `${i + 1}. ${q.text}`;
    item.appendChild(span);
    container.appendChild(item);
  });
}

// חובה:
window.startWhoKnowsGame = startWhoKnowsGame;
