import { useContext, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { ButtonProps, useToast, MenuItemProps } from '@chakra-ui/react'

import axios from 'axios'

import UserContext from '../../contexts/UserContext'
import GreenButton from './GreenButton'

import { words } from '../../wordle/words.ts'

// Can be rendered as either a Button or MenuItem
const CreateChallengeButton = (props: ButtonProps | MenuItemProps) => {
	const { userID } = useContext(UserContext)
	const navigate = useNavigate()
	const toast = useToast()

	const [isCreatingChallenge, setIsCreatingChallenge] = useState(false)
	const [lastExecutionTime, setLastExecutionTime] = useState(0)

	const createChallenge = async () => {
		// Check if it's been less than 5 seconds since the last execution
		if (Date.now() - lastExecutionTime < 5000) {
			toast({
				title: `Please wait another ${Math.ceil(
					(5000 - (Date.now() - lastExecutionTime)) / 1000
				)}s before creating another challenge.`,
				status: 'warning',
				isClosable: true,
				duration: 4000,
			})
			return
		}

		setIsCreatingChallenge(true)
		setLastExecutionTime(Date.now())

		axios
			.post(`/games/challenges/create/${userID}`, {
				creator: 'app',
				word: words[Math.floor(Math.random() * words.length)],
			})
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
			.finally(() => {
				setIsCreatingChallenge(false)
			})
	}

	const ButtonComponent = props.as || GreenButton

	return (
		<ButtonComponent
			size={{ base: 'md', lg: 'lg' }}
			onClick={createChallenge}
			isLoading={isCreatingChallenge}
			isDisabled={isCreatingChallenge}
			{...props}
		>
			Create Challenge
		</ButtonComponent>
	)
}

export default CreateChallengeButton
