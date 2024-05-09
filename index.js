// DOM Elements Variables
const listOfAllDice = document.querySelectorAll('.die');
const scoreInputs = document.querySelectorAll('#score-options input');
const scoreSpans = document.querySelectorAll('#score-options span');
const currentRoundText = document.getElementById('current-round');
const currentRoundRollsText = document.getElementById('current-round-rolls');
const totalScoreText = document.getElementById('total-score');
const scoreHistory = document.getElementById('score-history');
const rollDiceBtn = document.getElementById('roll-dice-btn');
const keepScoreBtn = document.getElementById('keep-score-btn');
const rulesContainer = document.querySelector('.rules-container');
const rulesBtn = document.getElementById('rules-btn');

// Game Variables
let diceValuesArr = [];
let isModalShowing = false;
let score = 0;
let totalScore = 0;
let round = 1;
let rolls = 0;

// Roll Dice
const rollDice = () => {
	diceValuesArr = [];

	for (let i = 0; i < 5; i++) {
		const randomDice = Math.floor(Math.random() * 6) + 1;
		diceValuesArr.push(randomDice);
	}

	listOfAllDice.forEach((dice, index) => {
		dice.textContent = diceValuesArr[index];
	});
};

// Update Stats
const updateStats = () => {
	currentRoundRollsText.textContent = rolls;
	currentRoundText.textContent = round;
};

// Update Radio Option
const updateRadioOption = (optionNode, score) => {
	scoreInputs[optionNode].disabled = false;
	scoreInputs[optionNode].value = score;
	scoreSpans[optionNode].textContent = `, score = ${score}`;
};

// Reset Game
const resetGame = () => {};

// Update Score
const updateScore = (selectedValue, achieved) => {
	totalScore += parseInt(selectedValue);
	totalScoreText.textContent = totalScore;

	scoreHistory.innerHTML += `<li>${achieved} : ${selectedValue}</li>`;
};

// Get Highest Duplicates
const getHighestDuplicates = (arr) => {
	const counts = {};

	for (const num of arr) {
		if (counts[num]) {
			counts[num]++;
		} else {
			counts[num] = 1;
		}
	}

	let highestCount = 0;

	for (const num of arr) {
		const count = counts[num];
		if (count >= 3 && count > highestCount) {
			highestCount = count;
		}
		if (count >= 4 && count > highestCount) {
			highestCount = count;
		}
	}

	const sumOfAllDice = diceValuesArr.reduce((a, b) => a + b, 0);

	if (highestCount >= 4) {
		updateRadioOption(1, sumOfAllDice);
	}

	if (highestCount >= 3) {
		updateRadioOption(0, sumOfAllDice);
	}

	updateRadioOption(5, 0);
};

// Reset Radio Option
const resetRadioOption = () => {
	scoreInputs.forEach((input) => {
		input.disabled = true;
		input.checked = false;
	});

	scoreSpans.forEach((span) => {
		span.textContent = '';
	});
};

// Roll Dice Button Event Listener
rollDiceBtn.addEventListener('click', () => {
	if (rolls === 3) {
		alert('You have made three rolls this round. Please select a score.');
	} else {
		rolls++;
		rollDice();
		updateStats();
	}
});

// Rules Button Event Listener
rulesBtn.addEventListener('click', () => {
	isModalShowing = !isModalShowing;

	if (isModalShowing) {
		rulesBtn.textContent = 'Hide Rules';
		rulesContainer.style.display = 'block';
	} else {
		rulesBtn.textContent = 'Show Rules';
		rulesContainer.style.display = 'none';
	}
});

// Keep Score Button Event Listener
keepScoreBtn.addEventListener('click', () => {
	let selectedValue;
	let achieved;

	for (const radioButton of scoreInputs) {
		if (radioButton.checked) {
			selectedValue = radioButton.value;
			achieved = radioButton.id;
			break;
		}
	}

	if (selectedValue) {
		rolls = 0;
		round++;
		updateStats();
		resetRadioOption();
		updateScore(selectedValue, achieved);
		if (round > 6) {
			setTimeout(() => {
				alert(`Game Over! Your total score is ${totalScore}`);
			}, 500);
		}
	} else {
		alert('Please select an option or roll the dice');
	}
});
