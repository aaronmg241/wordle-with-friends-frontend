import { Button, Flex } from '@chakra-ui/react'

type Props = {
	results: number[][]
	guesses: string[][]
}

const keyboard = [
	['Q', 'W', 'E', 'R', 'T', 'Y', 'U', 'I', 'O', 'P'],
	['A', 'S', 'D', 'F', 'G', 'H', 'J', 'K', 'L'],
	['Enter', 'Z', 'X', 'C', 'V', 'B', 'N', 'M', 'Delete'],
]

function getRelKey(key: string): string {
	if (key === 'Delete') return 'Backspace'
	if (key === 'Enter') return 'Enter'
	return key.toLowerCase()
}

function getColors(results: number[][], guesses: string[][]): { [key: string]: string } {
	const keyColors: { [key: string]: string } = {
		enter: 'rgb(22,20,17)',
		del: 'rgb(22,20,17)',
	}

	for (let i = 0; i < results.length; i++) {
		if (!results[i]) break
		for (let j = 0; j < results[i].length; j++) {
			const key = guesses[i][j]
			const result = results[i][j]
			if (result === 2) keyColors[key] = '#4cd137'
			else if (result === 0) keyColors[key] = 'grey'
			else if (result === 1 && !keyColors[key]) keyColors[key] = '#f39c12'
		}
	}

	return keyColors
}

export default function Keyboard({ results, guesses }: Props) {
	const colorsByKey = getColors(results, guesses)

	return (
		<Flex direction='column' gap='10px' alignItems='center' mt={4}>
			{keyboard.map((line, i) => {
				return (
					<Flex className='keyboard-line' key={'keyline' + i} gap={1}>
						{line.map((key) => {
							const color = colorsByKey[key.toLowerCase()]
							return (
								<Button
									minWidth={{ base: '30px', sm: '40px' }}
									minHeight={{ base: '50px', sm: '60px' }}
									padding={key === 'Enter' || key === 'Delete' ? '0 6px' : 0}
									borderRadius='4px'
									background={color ? color : 'rgb(22,20,17)'}
									color='white'
									_hover={color ? {} : { opacity: 0.5 }}
									onClick={() => {
										dispatchEvent(new KeyboardEvent('keydown', { key: getRelKey(key) }))
									}}
									key={key}
								>
									{key}
								</Button>
							)
						})}
					</Flex>
				)
			})}
		</Flex>
	)
}
