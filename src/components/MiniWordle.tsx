import { Flex, Text } from '@chakra-ui/react'
import LetterBox from './LetterBox'
import { calcResultOfGuess } from '../lib/wordle'

type Props = {
	guesses: string[]
	word: string
	name: string
	isGameOver: boolean
}

export default function MiniWordle({ guesses, word, name, isGameOver }: Props) {
	const guessesCopy = [...guesses]

	while (guessesCopy.length < 6) {
		guessesCopy.push('     ')
	}
	return (
		<Flex direction='column' gap={1}>
			<Text noOfLines={1} color='white'>
				{name}
			</Text>
			{guessesCopy.map((guess, rowIndex) => {
				const result = calcResultOfGuess(guess, word)
				return (
					<Flex key={rowIndex} gap={1}>
						<LetterBox letter={guess[0]} result={result[0]} small index={0} isGameOver={isGameOver} />
						<LetterBox letter={guess[1]} result={result[1]} small index={1} isGameOver={isGameOver} />
						<LetterBox letter={guess[2]} result={result[2]} small index={2} isGameOver={isGameOver} />
						<LetterBox letter={guess[3]} result={result[3]} small index={3} isGameOver={isGameOver} />
						<LetterBox letter={guess[4]} result={result[4]} small index={4} isGameOver={isGameOver} />
					</Flex>
				)
			})}
		</Flex>
	)
}
