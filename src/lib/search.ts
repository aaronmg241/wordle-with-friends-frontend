import { validGuesses, validWords } from '../wordle/words'

// Checks if it the guess is in validGuesses or validWords
export function doesWordExist(guess: string): boolean {
	return binarySearch(guess, validWords) || binarySearch(guess, validGuesses)
}

export function binarySearch(guess: string, words: string[]): boolean {
	let start = 0
	let end = words.length - 1

	while (start <= end) {
		let mid = Math.floor((start + end) / 2)
		if (words[mid] === guess) {
			return true
		}

		if (guess < words[mid]) {
			end = mid - 1
		} else {
			start = mid + 1
		}
	}
	return false
}
