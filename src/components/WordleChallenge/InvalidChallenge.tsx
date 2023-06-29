import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import OptionsMenu from '../Menu/Menu'

function InvalidChallenge() {
	return (
		<Box p={8} alignItems='center' paddingTop='20vh'>
			<VStack spacing={4}>
				<Heading color='white'>Woops! </Heading>
				<Text color='white' style={{ marginBottom: '20px' }}>
					We can't find a challenge with that ID.
				</Text>
				<OptionsMenu />
			</VStack>
		</Box>
	)
}

export default InvalidChallenge
