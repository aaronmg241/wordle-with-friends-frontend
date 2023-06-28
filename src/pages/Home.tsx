import { Heading, Text, Flex, Image } from '@chakra-ui/react'
import { useContext } from 'react'
import '../App.scss'

import wordleImage from '../images/wordle.jpg'
import UserContext from '../contexts/UserContext.tsx'
import OptionsMenu from '../components/Menu/Menu.tsx'

const HomePage = () => {
	const { nickname } = useContext(UserContext)

	return (
		<Flex
			boxSizing='border-box'
			width='100%'
			minHeight='100%'
			justifyContent='center'
			alignItems='center'
			gap={{ base: '5vh', lg: '5vw' }}
			padding={{ base: '5vh 5vw', lg: '0 5vw' }}
			direction={{ base: 'column-reverse', lg: 'row' }}
		>
			<Image src={wordleImage} height={{ base: '25vh', lg: '450px' }} mr='5vw' />
			<Flex textAlign='center' width='min(90vw, 500px)' flexDirection='column' justifyContent='center' alignItems='start'>
				<Heading as='h1' fontSize={{ base: '4xl', lg: '5xl' }} color='white' textAlign='left' mb={4}>
					Play Wordle Against Your Friends.
				</Heading>
				<Text fontSize='sm' color='rgb(240, 240, 240, 0.6)' mb={0}>
					Your nickname
				</Text>
				<Text fontSize='xl' color='#4cd137' mb={4} fontWeight={500}>
					{nickname}
				</Text>
				<Text fontSize={{ base: 'md', lg: 'xl' }} textAlign='left' color='white' mb={8}>
					Create or find a challenge below and share the link to play wordle against your friends!
				</Text>
				<OptionsMenu />
			</Flex>
		</Flex>
	)
}

export default HomePage
