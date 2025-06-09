if (typeof whoKnowsCards === 'undefined') {
  alert("❗️ לא נטענו קלפי המשחק. ודא ש־cardsWhoKnows.js נטען לפני הקובץ הזה.");
}

let questions = [];
let currentTurn = 0;
let currentIndex = 0;
var playerNames = [];
var scores = [0, 0]; // שמירה על הניקוד של כל שחקן

function normalize(str) {
  return str
    .replace(/[^\w\sא-ת]/g, '') // הסר סימני פיסוק
    .replace(/\s+/g, ' ')       // אחידות רווחים
    .trim()
    .toLowerCase();             // אותיות קטנות
}

function startWhoKnowsGame() {
  const player1 = document.getElementById("whoKnowsPlayer1").value || "שחקן 1";
  const player2 = document.getElementById("whoKnowsPlayer2").value || "שחקן 2";
  const numQuestions = parseInt(document.getElementById("whoKnowsNumQuestions").value) || 10;

  playerNames = [player1, player2];
  questions = shuffle([...whoKnowsCards]).slice(0, numQuestions);
  scores = [0, 0]; // אפס ניקוד בתחילת משחק
  updateScoreUI(); // עדכון תצוגה
  
  document.getElementById("whoKnowsStart").style.display = "none";
  document.getElementById("whoKnowsScreen").style.display = "block";

  showCurrentQuestion();
  fillCardsIndex();
}

function showCurrentQuestion() {
  const q = questions[currentIndex];
if (!q) {
  document.getElementById("whoKnowsTurn").innerText = "🎉 המשחק הסתיים!";
  
  const [score1, score2] = scores;
  let resultText = `התוצאה: ${playerNames[0]} - ${score1} | ${playerNames[1]} - ${score2}<br><br>`;

  if (score1 > score2) {
    resultText += `🏆 המנצח הוא ${playerNames[0]}!`;
  } else if (score2 > score1) {
    resultText += `🏆 המנצח הוא ${playerNames[1]}!`;
  } else {
    resultText += `🤝 המשחק הסתיים בתיקו!`;
  }

  document.getElementById("whoKnowsQuestion").innerHTML = resultText;
  document.getElementById("whoKnowsActions").innerHTML = `
    <button onclick="location.reload()">🔁 התחל מחדש</button>
  `;
  return;
}

  document.getElementById("whoKnowsTurn").innerText = `תור של ${playerNames[currentTurn]}`;
  document.getElementById("whoKnowsQuestion").innerText = q.text;
}

function completeWhoKnows() {
  currentIndex++;
  currentTurn = (currentTurn + 1) % 2;
  showCurrentQuestion();
}

function addPointAndNext() {
  scores[currentTurn]++;
  updateScoreUI();

  const currentText = normalize(questions[currentIndex].text);

  const allItems = document.querySelectorAll("#cardIndexList .card-index-item");
  let matched = false;

  allItems.forEach(item => {
  const itemText = item.dataset.text;
    if (itemText === currentText) {
      item.classList.add("card-played");
      matched = true;
    }
  });

  if (!matched) {
    console.warn("❗️ לא נמצא קלף תואם לסימון:", currentText);
  }

  completeWhoKnows();
}

function skipWhoKnows() {
  questions.push(questions.splice(currentIndex, 1)[0]); // דחייה לסוף
  currentTurn = (currentTurn + 1) % 2;
  showCurrentQuestion();
}

function shuffle(arr) {
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function updateScoreUI() {
  document.getElementById("scorePlayer1").innerText = scores[0];
  document.getElementById("scorePlayer2").innerText = scores[1];

}
function fillCardsIndex() {
  const container = document.getElementById("cardIndexList");
  if (!container || questions.length === 0) return;

  container.innerHTML = "<b>📋 רשימת השאלות במשחק:</b><br><br>";

  questions.forEach((q, i) => {
  const item = document.createElement("div");
  item.className = "card-index-item";
  item.dataset.text = normalize(q.text);  // שורת מפתח חדשה


    const span = document.createElement("span");
    span.textContent = `${i + 1}. ${q.text}`;
    item.appendChild(span);
    container.appendChild(item);                        // מוסיף את ה־div לרשימה בצד
  });
}
window.startWhoKnowsGame = startWhoKnowsGame; // ✅ פתרון הבעיה