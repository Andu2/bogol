export let sizeOpts = [4, 5];

export let diceSets = {
	"boggle-1987-en": {
		id: "boggle-1987-en",
		name: "Modern Boggle",
		description: "The letter dice used in Boggle from 1987 onward.",
		dice: [
			["A", "A", "E", "E", "G", "N"],
			["A", "B", "B", "J", "O", "O"],
			["A", "C", "H", "O", "P", "S"],
			["A", "F", "F", "K", "P", "S"],
			["A", "O", "O", "T", "T", "W"],
			["C", "I", "M", "O", "T", "U"],
			["D", "E", "I", "L", "R", "X"],
			["D", "E", "L", "R", "V", "Y"],
			["D", "I", "S", "T", "T", "Y"],
			["E", "E", "G", "H", "N", "W"],
			["E", "E", "I", "N", "S", "U"],
			["E", "H", "R", "T", "V", "W"],
			["E", "I", "O", "S", "S", "T"],
			["E", "L", "R", "T", "T", "Y"],
			["H", "I", "M", "N", "U", "QU"],
			["H", "L", "N", "N", "R", "Z"]
		]
	}, 
	"boggle-1976-en": {
		id: "boggle-1976-en",
		name: "Classic Boggle",
		description: "The letter dice used in Boggle from 1976 to 1986.",
		dice: [
			["A", "A", "C", "I", "O", "T"],
			["A", "B", "I", "L", "T", "Y"],
			["A", "B", "J", "M", "O", "QU"],
			["A", "C", "D", "E", "M", "P"],
			["A", "C", "E", "L", "R", "S"],
			["A", "D", "E", "N", "V", "Z"],
			["A", "H", "M", "O", "R", "S"],
			["B", "I", "F", "O", "R", "X"],
			["D", "E", "N", "O", "S", "W"],
			["D", "K", "N", "O", "T", "U"],
			["E", "E", "F", "H", "I", "Y"],
			["E", "G", "K", "L", "U", "Y"],
			["E", "G", "I", "N", "T", "V"],
			["E", "H", "I", "N", "P", "S"],
			["E", "L", "P", "S", "T", "U"],
			["G", "I", "L", "R", "U", "W"]
		]
	}, 
	"bigboggle-en": {
		id: "bigboggle-en",
		name: "Big Boggle",
		description: "The letter dice used in Big Boggle.",
		dice: [
			["A", "A", "A", "F", "R", "S"],
			["A", "A", "E", "E", "E", "E"],
			["A", "A", "F", "I", "R", "S"],
			["A", "D", "E", "N", "N", "N"],
			["A", "E", "E", "E", "E", "M"],
			["A", "E", "E", "G", "M", "U"],
			["A", "E", "G", "M", "N", "N"],
			["A", "F", "I", "R", "S", "Y"],
			["B", "J", "K", "QU", "X", "Z"],
			["C", "C", "E", "N", "S", "T"],
			["C", "E", "I", "I", "L", "T"],
			["C", "E", "I", "L", "P", "T"],
			["C", "E", "I", "P", "S", "T"],
			["D", "D", "H", "N", "O", "T"],
			["D", "H", "H", "L", "O", "R"],
			["D", "H", "L", "N", "O", "R"],
			["D", "H", "L", "N", "O", "R"],
			["E", "I", "I", "I", "T", "T"],
			["E", "M", "O", "T", "T", "T"],
			["E", "N", "S", "S", "S", "U"],
			["F", "I", "P", "R", "S", "Y"],
			["G", "O", "R", "R", "V", "W"],
			["I", "P", "R", "R", "R", "Y"],
			["N", "O", "O", "T", "U", "W"],
			["O", "O", "O", "T", "T", "U"]
		]
	}, 
	"letter-freq": {
		id: "letter-freq",
		name: "No Dice - Letter Frequency",
		description: "Don't simulate six-sided dice and instead choose letters based on the frequency they appear in the word list.",
		dice: []
	}
};

// challenge cube: i k l m qu u

export let wordLists = {
	"scrabble-2019": {
		id: "scrabble-2019",
		fileName: "scrabble-2019.txt",
		name: "Collins Scrabble Word Dictionary 2019",
		description: "Officially accepted Scrabble words in 2019.",
		skipLines: 2,
		commentLines: "N/A"
	},
	"wiki-100k": {
		id: "wiki-100k",
		fileName: "wiki-100k.txt",
		name: "Wiktionary Top 100k",
		description: "Top 100,000 used English words according to Wiktionary, pulled in 2012. Differences in capitalization, etc. are counted as different words, so the number of distinct Boggle words is lower than 100k.",
		skipLines: 0,
		commentLines: "#"
	}
};
