import { Flex } from '@chakra-ui/react'

export default function LetterBox({ letter, result, small }: { letter: string; result: number; small?: boolean }) {
	let resultClassName

	switch (result) {
		case 2:
			resultClassName = 'correct'
			break
		case 1:
			resultClassName = 'semi-correct'
			break
		case 0:
			resultClassName = 'wrong'
			break
		default:
			resultClassName = 'unfinished'
	}

	return (
		<Flex
			height={small ? '20px' : '60px'}
			width={small ? '20px' : '60px'}
			maxWidth='12vw'
			maxHeight='12vw'
			justifyContent='center'
			alignItems='center'
			fontSize='150%'
			fontWeight='bold'
			textTransform='uppercase'
			className={'letter-box ' + resultClassName}
			outline={small ? 'none' : undefined}
		>
			{small ? '' : letter}
		</Flex>
	)
}
