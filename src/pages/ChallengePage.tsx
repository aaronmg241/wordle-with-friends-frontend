import { Flex } from '@chakra-ui/react'
import { useState, useEffect, useRef, useContext } from 'react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'

import OtherAttempts from '../components/OtherAttempts'
import LetterBox from '../components/LetterBox'

import { calcResultOfGuess } from '../lib/wordle'
import UserContext from '../contexts/UserContext'
import Keyboard from '../components/Keyboard'
import { SocketContext } from '../contexts/SocketContext'
import ChangeNicknameModal from '../components/ChangeNicknameModal'
import Menu from '../components/Menu'

export default function ChallengePage() {
	const challenge = useLoaderData() as any
	const [guesses, setGuesses] = useState<string[][]>(Array.from(Array(6), () => new Array(5)))
	const [results, setResults] = useState<number[][]>(Array.from(Array(6), () => new Array(5)))
	const position = useRef({ row: 0, column: 0 })
	const { userID, isNewUser, setIsNewUser } = useContext(UserContext)
	const { setChallengeID, sendMessage } = useContext(SocketContext)

	if (!challenge) {
		return <div>Invalid challenge ID.</div>
	}

	const isGameOver = guesses.findIndex((guess) => guess === challenge.data.word) >= 0

	// It is a obviously a bit unusual to add and remove an event listener on every key press. This is done so that onKeyPress has access to the updated
	// state such as 'guesses'. The alternative is to useRefs to reference the required state in these functions. I chose this approach because the performance
	// does not matter and it results in cleaner code with regards to the state.
	useEffect(() => {
		// Don't add the event listener while we are still editing the nickname,
		// as this would type in a word while we change nicknames
		window.addEventListener('keydown', onKeyPress)

		return () => {
			window.removeEventListener('keydown', onKeyPress)
		}
	}, [guesses])

	// Sets the ChallengeID for the websocket connection
	useEffect(() => {
		setChallengeID(challenge.data.challenge_id)
	}, [challenge])

	// Loads existing guesses from server
	useEffect(() => {
		const getGuesses = async () => {
			if (!userID) return

			axios
				.get(`/games/attempts/${challenge.data.challenge_id}/${userID}`)
				.then((response) => {
					// Makes sure guesses has length 6
					const updatedGuesses = [...response.data.guesses]
					const existingResults = []

					for (const guess of updatedGuesses) {
						existingResults.push(calcResultOfGuess(guess, challenge.data.word))
					}

					// Fill rest of arrays, they are both the same length
					while (existingResults.length < 6) {
						existingResults.push(['0', '0', '0', '0', '0'])
						updatedGuesses.push(new Array(5))
					}

					setGuesses(updatedGuesses)
					setResults(existingResults)
					position.current = { row: response.data.guesses.length, column: 0 }
				})
				.catch(() => {})
		}
		position.current = { row: 0, column: 0 }
		setGuesses(Array.from(Array(6), () => new Array(5)))
		setResults(Array.from(Array(6), () => new Array(5)))
		getGuesses()
	}, [challenge])

	function onKeyPress(e: KeyboardEvent) {
		if (isGameOver) return

		const activeElement = document.activeElement

		// Ignore key presses if an input element is focused
		if (activeElement && activeElement.tagName.toLowerCase() === 'input') {
			return
		}

		if (e.key === 'Enter') {
			handleEnterPressed(e)
		} else if (e.key === 'Backspace') {
			handleDeletePressed(e)
		} else if (
			e.key.length === 1 &&
			((e.key.charCodeAt(0) >= 97 && e.key.charCodeAt(0) <= 122) || (e.key.charCodeAt(0) >= 65 && e.key.charCodeAt(0) <= 90))
		) {
			if (guesses[position.current.row][4]) return // We don't want to overwrite the last character

			const newGuesses = [...guesses]
			newGuesses[position.current.row][position.current.column] = e.key.toLowerCase()
			position.current.column = Math.min(4, position.current.column + 1)
			setGuesses(newGuesses)
		}
	}

	function handleDeletePressed(e: KeyboardEvent) {
		e.preventDefault()

		const newGuesses = [...guesses]

		// If we are not at the end of the word then the current position will not have any character in it yet
		// (Once a user types a key they position moves to the next spot)
		// So, we must go back to the previous column to delete the character in that position.
		if (
			!newGuesses[position.current.row][position.current.column] ||
			newGuesses[position.current.row][position.current.column] === ''
		) {
			position.current.column = Math.max(0, position.current.column - 1)
		}
		newGuesses[position.current.row][position.current.column] = ''
		setGuesses(newGuesses)
	}

	function handleEnterPressed(e: KeyboardEvent) {
		e.preventDefault()

		// If the word has a letter in the last spot then it must be 5 letters long
		if (!guesses[position.current.row][4] || guesses[position.current.row][4] === '') return

		const guess = guesses[position.current.row].join('')

		const newResults = [...results]
		newResults[position.current.row] = calcResultOfGuess(guess, challenge.data.word)
		setResults(newResults)
		position.current = { row: Math.min(5, position.current.row + 1), column: 0 }

		sendMessage({ challengeID: challenge.data.challenge_id, guess, userID })
	}

	return (
		<Flex
			justifyContent={{ base: 'start', lg: 'center' }}
			gap='5vw'
			alignItems='center'
			direction={{ base: 'column', lg: 'row' }}
			minHeight='100vh'
			padding='5vh 0'
		>
			<Flex direction='column' alignItems='center' gap={4}>
				{guesses.map((guess, rowIndex) => {
					return (
						<Flex key={rowIndex} gap={3}>
							<LetterBox letter={guess[0]} result={results[rowIndex][0]} />
							<LetterBox letter={guess[1]} result={results[rowIndex][1]} />
							<LetterBox letter={guess[2]} result={results[rowIndex][2]} />
							<LetterBox letter={guess[3]} result={results[rowIndex][3]} />
							<LetterBox letter={guess[4]} result={results[rowIndex][4]} />
						</Flex>
					)
				})}
				<Keyboard results={results} guesses={guesses} />
			</Flex>
			<Flex direction='column' gap='30px'>
				<Menu />
				<OtherAttempts word={challenge.data.word} />
			</Flex>
			{isNewUser && <ChangeNicknameModal onClose={() => setIsNewUser(false)} />}
		</Flex>
	)
}
