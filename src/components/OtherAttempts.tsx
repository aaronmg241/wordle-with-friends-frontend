import { useEffect, useState, useContext } from 'react'
import { Box, Card, CardBody, CardHeader, Flex, Heading, SimpleGrid, Text } from '@chakra-ui/react'
import { useLoaderData } from 'react-router-dom'
import axios from 'axios'

import MiniWordle from './MiniWordle'
import UserContext from '../contexts/UserContext'
import { SocketContext } from '../contexts/SocketContext'
import OptionsMenu from './Menu/Menu'

type Props = {
	word: string
}

type Attempt = {
	guesses: string[]
	user: { user_id: string; nickname: string }
}

export default function OtherAttempts({ word }: Props) {
	const challenge = useLoaderData() as any
	const challengeID = challenge.data.challenge_id
	const [attempts, setAttempts] = useState<{ [userId: string]: Attempt }>({})
	const { userID, nickname } = useContext(UserContext)
	const { newMessage } = useContext(SocketContext)

	// Loads all other attempts for this challenge
	useEffect(() => {
		const loadOtherAttempts = async () => {
			axios
				.get(`/games/other-attempts/${challengeID}/${userID}`)
				.then((response) => {
					const otherAttempts = response.data

					const updatedAttempts: { [userId: string]: Attempt } = {}
					otherAttempts.forEach((attempt: Attempt) => {
						updatedAttempts[attempt.user.user_id] = {
							guesses: attempt.guesses,
							user: attempt.user,
						}
					})

					setAttempts(updatedAttempts)
				})
				.catch((e) => {
					console.error(e)
					setAttempts({})
				})
		}

		loadOtherAttempts()
	}, [challenge])

	useEffect(() => {
		// Don't need to update your own guesses
		if (!newMessage || newMessage.user_id === nickname + userID.substring(0, 10)) return

		setAttempts((prevAttempts) => ({
			...prevAttempts,
			[newMessage.user_id]: {
				guesses: newMessage.guesses,
				user: { user_id: newMessage.user_id, nickname: newMessage.nickname },
			},
		}))
	}, [newMessage])

	return (
		<Card bg='inherit' minWidth='min(400px, 80vw)' boxShadow='none'>
			<CardHeader display='flex' justifyContent='space-between' gap='30px' flexDirection={{ base: 'column', md: 'row' }}>
				<Box>
					<Heading size='lg' color='white'>
						Other Attempts
					</Heading>
					<Text fontSize={14} color='whiteAlpha.700'>
						Challenge ID: {challenge.data.challenge_id}
					</Text>
				</Box>
			</CardHeader>
			<CardBody maxH='80vh' overflowY={'auto'}>
				<Flex
					direction='column'
					maxHeight='80vh'
					overflowY='auto'
					padding='0'
					paddingBottom='20px'
					pr={8}
					boxSizing='border-box'
					alignItems='center'
				>
					<SimpleGrid columns={{ base: 1, sm: 2, md: 3 }} columnGap={10} rowGap={5}>
						{Object.entries(attempts).map(([userID, attempt]) => {
							return (
								<Box key={userID}>
									<Text color='white'>{attempt.user.nickname}</Text>
									<MiniWordle guesses={attempt.guesses} word={word} name='' />
								</Box>
							)
						})}
					</SimpleGrid>
				</Flex>
			</CardBody>
		</Card>
	)
}
