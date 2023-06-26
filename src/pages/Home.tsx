import { Heading, Text, Flex, Image, Input } from '@chakra-ui/react'
import { useContext } from 'react'
import '../App.scss'

import wordleImage from '../images/wordle.jpg'
import UserContext from '../contexts/UserContext.tsx'
import CreateChallengeButton from '../components/Button/CreateChallengeButton.tsx'

const HomePage = () => {
	const { nickname, changeNickname } = useContext(UserContext)

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
				<Heading as='h1' fontSize={{ base: '4xl', lg: '5xl' }} color='white' mb={5} textAlign='left'>
					Play Wordle Against Your Friends.
				</Heading>
				<Text fontSize={{ base: 'md', lg: 'xl' }} textAlign='left' color='rgb(240, 240, 240, 0.7)'>
					Create a challenge below and share the link to play wordle against your friends!
				</Text>
				<CreateChallengeButton mt={12} />

				<Flex mt={12} alignItems='start' direction='column' gap={2}>
					<Text fontSize='sm' color='rgb(240, 240, 240, 0.7)'>
						Your nickname
					</Text>
					<Input
						color='white'
						variant='flushed'
						fontSize='xl'
						width={220}
						maxLength={20}
						defaultValue={nickname}
						onBlur={(e) => changeNickname(e.target.value)}
					/>
				</Flex>
			</Flex>
		</Flex>
	)
}

export default HomePage
