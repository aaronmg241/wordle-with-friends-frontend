import { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonProps, useToast } from '@chakra-ui/react'

import axios from 'axios'

import UserContext from '../../contexts/UserContext'
import GreenButton from './GreenButton'

import { words } from '../../wordle/words.ts'

const CreateChallengeButton = (props: ButtonProps) => {
	const { userID } = useContext(UserContext)
	const navigate = useNavigate()
	const toast = useToast()

	const createChallenge = async () => {
		axios
			.post(`/games/challenges/create/${userID}`, { creator: 'app', word: words[Math.floor(Math.random() * words.length)] })
			.then((response) => {
				navigate(`/challenges/${response.data.challenge_id}`)
				toast({
					title: 'Created new challenge',
					status: 'success',
					duration: 3000,
					isClosable: true,
				})
			})
			.catch((e) => {
				toast({
					title: 'There was an error creating the challenge.',
					status: 'error',
					isClosable: true,
					duration: 5000,
				})
				console.error(e)
			})
	}

	return (
		<GreenButton size={{ base: 'md', lg: 'lg' }} onClick={createChallenge} {...props}>
			Create Challenge
		</GreenButton>
	)
}

export default CreateChallengeButton
