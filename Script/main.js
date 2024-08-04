// Selected DOM elements
const counterInput = document.querySelector("#input-counter");
const startbtn = document.querySelector("#start-counter");
const errorMsg = document.querySelector("#error-msg");
const progressCircle = document.querySelector(".c100");
const timerNum = document.querySelector(".c100 > span");
const successMsg = document.querySelector(".success");
const loadingMsg = document.querySelector(".loading");
const refresh = document.querySelector(".refresh");

// Default Styles
successMsg.style.display = "none";
errorMsg.style.display = "none";
loadingMsg.style.display = "none";
refresh.style.display = "none";

// Start the Timer
startbtn.addEventListener("click", function () {
  if (startbtn.innerHTML === "Cancel") {
    window.location.reload();
  }

  const seconds = parseInt(counterInput.value);
  if (isNaN(seconds)) {
    errorMsg.style.display = "block";
    counterInput.value = "";
  } else {
    startCounter(seconds);
  }
});

// Start the Counter
function startCounter(seconds) {
  console.log(seconds);
  applyStyles();

  timerNum.innerHTML = "Wait ...";
  const originalSecond = seconds;

  const timerId = setInterval(() => {
    if (seconds <= 0) {
      clearInterval(timerId);
      endCounter();
    } else {
      updateProgressBar(seconds, originalSecond);
      seconds -= 1;
    }
  }, 1000);
}

// Apply Styles after Starting the Counter
function applyStyles() {
  errorMsg.style.display = "none";
  counterInput.style.display = "none";
  startbtn.style.borderRadius = "10px";
  startbtn.innerHTML = "Cancel";
}

// Update the Progress Bar
function updateProgressBar(seconds, originalSecond) {
  timerNum.textContent = seconds;
  const percent = Math.floor(
    ((originalSecond - seconds) / originalSecond) * 100
  );
  progressCircle.classList.remove(...progressCircle.classList);
  progressCircle.classList.add("c100", `p${percent}`);
  loadingMsg.style.display = "inline-block";
  successMsg.style.display = "none";
}

// Show Message after completing the Timer
function endCounter() {
  timerNum.textContent = 0;
  successMsg.style.display = "inline-block";
  loadingMsg.style.display = "none";
  startbtn.innerHTML = "Start Again";
  refresh.style.display = "inline-block";
}

// Refresh Button
refresh.addEventListener("click", function () {
  window.location.reload();
});