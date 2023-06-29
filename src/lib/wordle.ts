// Checks if the current guess is the correct word
export function calcResultOfGuess(guess: string, correctWord: string) {
	if (!guess || guess.trim() === '') return [-1, -1, -1, -1, -1]
	let correctCopy = correctWord.slice()

	// Stores if each letter at its respective index is correct (2), semi-correct (1), or incorrect (0) so we can style the squares later
	const result = new Array(5).fill(0)

	// First, check for correct letters. If a correct letter is found, we remove it from the string so it cannot be found later
	// when checking for 'semi-correct' letters
	for (let i = 0; i < correctCopy.length; i++) {
		if (guess.charAt(i) === correctCopy.charAt(i)) {
			correctCopy = correctCopy.substring(0, i) + ' ' + correctCopy.substring(i + 1, 5) // Remove letter from string
			result[i] = 2
		}
	}

	// Checks for semi-correct or incorrect letters
	for (let i = 0; i < correctCopy.length; i++) {
		if (result[i] === 2) continue

		if (correctCopy.includes(guess.charAt(i))) {
			const letterIndex = correctCopy.indexOf(guess.charAt(i))
			result[i] = 1
			correctCopy = correctCopy.substring(0, letterIndex) + ' ' + correctCopy.substring(letterIndex + 1, 5)
		}
	}

	return result
}

// Checks whether the correct word was guessed or not
export function gameWasWon(results: number[][]): boolean {
	return (
		results.findIndex((resultRow) => {
			for (const result of resultRow) {
				if (result !== 2) return false
			}
			return true
		}) >= 0
	)
}
