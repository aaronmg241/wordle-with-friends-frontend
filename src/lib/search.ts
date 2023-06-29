import { words } from '../wordle/words'

export function doesWordExist(guess: string) {
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
