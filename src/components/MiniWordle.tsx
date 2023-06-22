import { Flex, Text } from '@chakra-ui/react'
import LetterBox from './LetterBox'
import { calcResultOfGuess } from '../lib/wordle'

type Props = {
	guesses: string[]
	word: string
	name: string
}

export default function MiniWordle({ guesses, word, name }: Props) {
	const guessesCopy = [...guesses]

	while (guessesCopy.length < 6) {
		guessesCopy.push('     ')
	}
	return (
		<Flex direction='column' gap={1}>
			<Text>{name}</Text>
			{guessesCopy.map((guess, rowIndex) => {
				const result = calcResultOfGuess(guess, word)
				return (
					<Flex key={rowIndex} gap={1}>
						<LetterBox letter={guess[0]} result={result[0]} small />
						<LetterBox letter={guess[1]} result={result[1]} small />
						<LetterBox letter={guess[2]} result={result[2]} small />
						<LetterBox letter={guess[3]} result={result[3]} small />
						<LetterBox letter={guess[4]} result={result[4]} small />
					</Flex>
				)
			})}
		</Flex>
	)
}
