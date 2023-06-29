import { Flex } from '@chakra-ui/react'

export default function LetterBox({
	letter,
	result,
	small,
	index,
	isGameOver,
}: {
	letter: string
	result: number
	small?: boolean
	index?: number
	isGameOver?: boolean
}) {
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

	const delay = index ? 0.1 + index * 0.4 + 's' : ''

	return (
		<Flex
			height={small ? '20px' : { base: '45px', md: '60px' }}
			width={small ? '20px' : { base: '45px', md: '60px' }}
			maxWidth='12vw'
			maxHeight='12vw'
			justifyContent='center'
			alignItems='center'
			fontSize={small ? '14px' : { base: '16px', md: '150%' }}
			fontWeight='bold'
			textTransform='uppercase'
			className={resultClassName}
			outline={small ? 'none' : undefined}
			style={{ animationDelay: delay, transitionDelay: delay }}
		>
			{small && !isGameOver ? '' : letter}
		</Flex>
	)
}
