// shuffle in place
function shuffle(arr) {
	for (let i = arr.length - 1; i > 0; i--) {
		// swap
		let randIndex = Math.floor(Math.random() * (i + 1));
		let tempVal = arr[i];
		arr[i] = arr[randIndex];
		arr[randIndex] = tempVal;
	}
	return arr;
}

export function createBoard(options = {}) {
	let cellGrid = [];
	let cellList = [];

	let frequencyMode = false;
	let shuffledDice;
	if (options.dice.length > 0) {
		shuffledDice = shuffle([...options.dice]);
	}
	else {
		frequencyMode = true;
	}
	
	// for testing a predictable order
	// shuffledDice = [...options.dice];
	for (let rowNum = 0; rowNum < options.size; rowNum++) {
		let cellRow = [];
		for (let colNum = 0; colNum < options.size; colNum++) {
			let letter = "?";
			if (frequencyMode) {
				let rand = Math.random();
				for (let letterOption in options.letterFreq) {
					if (rand < options.letterFreq[letterOption]) {
						letter = letterOption;
						break;
					}
					else {
						rand -= options.letterFreq[letterOption];
					}
				}
			}
			else {
				let die = shuffledDice.shift();
				letter = die[Math.floor(Math.random() * 6)];
			}
			let cell = {
				letter: letter,
				rowNum: rowNum,
				colNum: colNum,
				links: []
			};
			cellRow.push(cell);
			cellList.push(cell)
		}
		cellGrid.push(cellRow);
	}

	// set up links
	cellList.forEach(function(cell) {
		if (cell.rowNum > 0) {
			cell.links.push(cellGrid[cell.rowNum - 1][cell.colNum]);
		}
		if (cell.rowNum < options.size - 1) {
			cell.links.push(cellGrid[cell.rowNum + 1][cell.colNum]);
		}
		if (cell.colNum > 0) {
			cell.links.push(cellGrid[cell.rowNum][cell.colNum - 1]);
		}
		if (cell.colNum < options.size - 1) {
			cell.links.push(cellGrid[cell.rowNum][cell.colNum + 1]);
		}
		if (cell.rowNum > 0 && cell.colNum > 0) {
			cell.links.push(cellGrid[cell.rowNum - 1][cell.colNum - 1]);
		}
		if (cell.rowNum < options.size - 1 && cell.colNum < options.size - 1) {
			cell.links.push(cellGrid[cell.rowNum + 1][cell.colNum + 1]);
		}
		if (cell.rowNum > 0 && cell.colNum < options.size - 1) {
			cell.links.push(cellGrid[cell.rowNum - 1][cell.colNum + 1]);
		}
		if (cell.rowNum < options.size - 1 && cell.colNum > 0) {
			cell.links.push(cellGrid[cell.rowNum + 1][cell.colNum - 1]);
		}
	});

	console.log(cellGrid);

	return {
		size: options.size,
		cellGrid: cellGrid,
		cellList: cellList
	}
}

export function isWordValid(board, word) {
	if (word.length > board.cellList.length) return false;
	word = word.toUpperCase();
	let validPaths = [];
	findNextLetter([], "");

	function findNextLetter(currentCells, currentWord) {
		if (currentWord === word) {
			validPaths.push(currentCells);
		}
		else if (currentWord.length < word.length) {
			let nextLetter = word[currentWord.length];
			// special behavior: Q only appears with u
			if (nextLetter === "Q") {
				if (currentWord.length + 1 < word.length && word[currentWord.length + 1] === "U") {
					nextLetter = "QU";
				}
				else {
					return false; // not a possible Boggle word
				}
			}
			let possibleNextCells = (currentCells.length > 0) ? currentCells.slice(-1)[0].links : board.cellList;
			possibleNextCells = possibleNextCells.filter(function(cell) {
				return (currentCells.indexOf(cell) === -1);
			});
			possibleNextCells.forEach(function(nextCell) {
				if (nextCell.letter === nextLetter) {
					findNextLetter([...currentCells, nextCell], currentWord + nextLetter);
				}
			});
		}
	}

	// console.log(validPaths);
	if (validPaths.length > 0) return true;
	else return false;
}
