<script>
	export let board = null;

	function getDisplayString(letter) {
		if (letter === "QU") return "Qu";
		return letter;
	}
</script>

<div id="board">
	{#if board && board.cellGrid}
		{#each board.cellGrid as row, rowNum}
		<div class="cell-row">
			{#each row as cell, colNum}
			<div class="cell" row={rowNum} col={colNum}>
				{getDisplayString(cell.letter)}
			</div>
			{/each}
		</div>
		{/each}
	{/if}
</div>

<style>
	div#board {
		margin: 20px;
	}

	div.cell {
		display: inline-block;
		width: 120px;
		height: 120px;
		line-height: 120px;
		font-size: 28pt;
		font-weight: bold;
		text-align: center;
		background-color: #ffffff;
		border-radius: 10px;
		margin: 4px;
	}
</style>
