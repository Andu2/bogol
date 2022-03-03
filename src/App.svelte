<script>
	import { sizeOpts, diceSets, wordLists } from "./config";
	import { createBoard, isWordValid } from "./bogol";
	import Board from "./Board.svelte";

	let size = 4;
	let time = 180;
	let selDiceSetId = "boggle-1987-en";
	let selWordListId = "scrabble-2019";

	$: validDiceSets = getValidDiceSets(size);

	let wordList = null;
	$: letterFreq = getLetterFreq(wordList);
	$: loadWordList(selWordListId);

	let board = null;
	let timeLeft = 0;
	let timer = null;
	let showSolutions = false;

	$: solutions = getSolutions(board, wordList);

	function loadWordList(selWordListId) {
		fetch("wordlists/" + wordLists[selWordListId].fileName)
			.then(function(res) {
				return res.text();
			})
			.then(function(words) {
				wordList = words.split(/\r?\n/)
					.slice(wordLists[selWordListId].skipLines)
				// .filter(function(word) {
				// 	return (word.indexOf(wordLists[selWordListId].commentLines) !== 0);
				// }).map(function(word) {
				// 	return word.replace(/'/g, "").toUpperCase();
				// });
				//remove dupes
				// let wordsUsed = {};
				// wordList = wordList.filter(function(word) {
				// 	let newWord = false;
				// 	if (!wordsUsed[word]) {
				// 		newWord = true;
				// 	}
				// 	wordsUsed[word] = true;
				// 	return newWord;
				// });
				// console.log(wordList)
			});
	}

	function getLetterFreq(wordList) {
		if (!wordList) return null;
		let letterCounts = {
			"A": 0, "B": 0, "C": 0, "D": 0, "E": 0, "F": 0, "G": 0, "H": 0, "I": 0, "J": 0, "K": 0, "L": 0, "M": 0, 
			"N": 0, "O": 0, "P": 0, "QU": 0, "R": 0, "S": 0, "T": 0, "U": 0, "V": 0, "W": 0, "X": 0, "Y": 0, "Z": 0
		};
		let total = 0;
		wordList.forEach(function(word) {
			for (let i = 0; i < word.length; i++) {
				let letter = word[i];
				if (letter === "Q") {
					if (i + 1 < word.length && word[i + 1] === "U") {
						letter = "QU";
						i++;
					}
					else {
						continue;
					}
				}
				letterCounts[letter]++;
				total++;
			}
		});
		let letterFreq = {};
		for (let letter in letterCounts) {
			letterFreq[letter] = letterCounts[letter] / total;
		}
		console.log(letterFreq);
		return letterFreq;
	}

	function getValidDiceSets(size) {
		let sets = [];
		let currentSelectionIsValid = false;
		for (let diceSetId in diceSets) {
			let isCorrectNumber = (diceSets[diceSetId].dice.length === size * size);
			let isSpecialSet = (diceSets[diceSetId].dice.length === 0);
			if (isCorrectNumber || isSpecialSet) {
				sets.push(diceSets[diceSetId]);
				if (diceSetId === selDiceSetId) {
					currentSelectionIsValid = true;
				}
			}
		}
		if (!currentSelectionIsValid && sets.length > 0) {
			selDiceSetId = sets[0].id;
		}
		return sets;
	}

	function generateGame() {
		board = createBoard({
			size: size,
			dice: diceSets[selDiceSetId].dice,
			letterFreq: letterFreq
		});
		showSolutions = false;
		timeLeft = time;
		clearInterval(timer);
		timer = setInterval(function() {
				timeLeft--;
				if (timeLeft <= 0) {
					clearInterval(timer);
				}
			}, 1000);
	}

	function getSolutions(board, wordList) {
		if (!board || !wordList) return null;

		const MIN_LENGTH = board.size - 1;

		let validWords = wordList.filter(function(word) {
			return (word.length >= MIN_LENGTH && isWordValid(board, word));
		});

		let validWordsByLength = {};
		validWords.forEach(function(word) {
			if (validWordsByLength[word.length] === undefined) {
				validWordsByLength[word.length] = [];
			}
			validWordsByLength[word.length].push(word);
		});

		let wordSets = Object.keys(validWordsByLength).sort().reverse().map(function(length) {
			return {
				length: length,
				validWords: validWordsByLength[length]
			}
		});

		console.log(validWords)

		return {
			validWords: validWords,
			validWordsByLength: wordSets
		}
	}

	function toggleShowSolutions() {
		showSolutions = !showSolutions;
	}

	// if (typeof window !== "undefined") {
	// 	window.isWordValid = function(word) {
	// 		return isWordValid(board, word);
	// 	}
	// }
</script>

<main>
	<div id="control">
		<h1>Bogol</h1>
		<div class="control-section" id="control-size">
			<label for="size-id">Size</label>
			<select id="size-id" bind:value={size}>
				{#each sizeOpts as sizeOpt}
				<option value={sizeOpt}>{sizeOpt}x{sizeOpt}</option>
				{/each}
			</select>
		</div>
		<div class="control-section" id="control-dice">
			<label for="dice-id">Dice</label>
			<select id="dice-id" bind:value={selDiceSetId}>
				{#each validDiceSets as diceSetConfig, i}
				<option value={diceSetConfig.id}>{diceSetConfig.name}</option>
				{/each}
			</select>
			<p class="option-description" id="dice-description">
				{#if diceSets[selDiceSetId]}
				{diceSets[selDiceSetId].description}
				{/if}
			</p>
		</div>
<!-- 		<div class="control-section" id="control-word-list">
			<label for="word-list-id">Word List</label>
			<select id="word-list-id" bind:value={selWordListId}>
				{#each Object.keys(wordLists) as selWordListId}
				<option value={wordLists[selWordListId].id}>{wordLists[selWordListId].name}</option>
				{/each}
			</select>
			<p class="option-description" id="word-list-description">
				{#if wordLists[selWordListId]}
				{wordLists[selWordListId].description}
				{/if}
			</p>
		</div> -->
		<div class="control-section" id="control-time">
			<label for="time-id">Time</label>
			<input id="time" type="number" bind:value={time} />
		</div>
		<div class="button" on:click={generateGame}>Start!</div>
	</div>
	<div id="game">
		{#if board}
		<div id="timer">
			{#if timeLeft}{timeLeft}
			{:else}Time up!{/if}
		</div>
		<Board board={board} />
		<div id="guess-input">

		</div>
		{/if}
	</div>
	<div id="valid-words">
		{#if solutions}
		<p>Valid solutions: {solutions.validWords.length}</p>
		<div class="button" on:click={toggleShowSolutions}>
			{#if showSolutions}Hide solutions
			{:else}Show solutions{/if}
		</div>
		<div id="solutions">
			{#if showSolutions}
			{#each solutions.validWordsByLength as subSolutions}
			<h3>{subSolutions.length}: {subSolutions.validWords.length} words</h3>
			<p>{subSolutions.validWords.join(", ")}</p>
			{/each}
			{/if}
		</div>
		{/if}
	</div>
</main>

<style>
	main {
		display: flex;
		gap: 10px;
		height: 100%;
	}

	h1 {
		color: black;
		text-transform: uppercase;
		font-size: 42pt;
		text-align: center;
	}

	div#control {
		flex-shrink: 0;
		max-width: 250px;
		padding: 0 10px;
		background-color: #edf0ff;
	}

	div.control-section {
		padding: 10px;
	}

	div.control-section label {
		font-size: 16pt;
		font-weight: bold;
		margin-bottom: 4px;
	}

	div.button {
		background-color: #45eae3;
		padding: 5px;
		margin: 0 5px;
		border-radius: 6px;
		text-align: center;
		cursor: pointer;
		border-bottom: 3px solid #55899c;
		user-select: none;
	}

	div.button:active {
		margin-top: 3px;
		border-bottom: 0px;
	}

	div#valid-words .button {
		width: 200px;
		display: inline-block;
	}

	div#game {
		padding: 10px;
		flex-shrink: 0;
		background-color: #223a5f;
	}

	div#timer {
		font-size: 44pt;
		text-align: center;
		color: #ff88be;
	}

	div#valid-words {
		padding: 10px;
		background-color: #edf0ff;
	}
</style>