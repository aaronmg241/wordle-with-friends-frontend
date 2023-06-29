import { Box, Heading, Text, VStack } from '@chakra-ui/react'
import OptionsMenu from '../components/Menu/Menu'

function Page404() {
	return (
		<Box p={8} alignItems='center' paddingTop='20vh'>
			<VStack spacing={4}>
				<Heading color='white'>You might be lost!</Heading>
				<Text color='white' style={{ marginBottom: '20px' }}>
					Despite our very best efforts, we can't find this page.
				</Text>
				<OptionsMenu />
			</VStack>
		</Box>
	)
}

export default Page404
