import {
	useDisclosure,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	Text,
	Button,
	useToast,
	Divider,
	SimpleGrid,
} from '@chakra-ui/react'
import { useEffect, useState, cloneElement, useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import GreenButton from './Button/GreenButton'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'
import UserContext from '../contexts/UserContext'

dayjs.extend(relativeTime)

type Challenge = {
	challenge_id: string
	created_at: string
	creator: string
	num_attempts: number
	word: string
	completed_status: 'won' | 'lost' | 'inprogress' | 'noattempt'
	num_guesses: number
}

export default function RecentChallengesDrawer({ DrawerButtonComponent }: { DrawerButtonComponent: React.ReactElement }) {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const navigate = useNavigate()
	const toast = useToast()
	const [recentChallenges, setRecentChallenges] = useState<Challenge[]>([])
	const { userID } = useContext(UserContext)

	useEffect(() => {
		const fetchData = async () => {
			try {
				console.log(userID)
				const response = await axios.get(`games/challenges/recent/0`, { params: { user_id: userID } })
				const data = response.data
				setRecentChallenges([...data])
				// Handle the retrieved data
				console.log(data)
			} catch (error) {
				// Handle the error
				console.error(error)
			}
		}

		if (isOpen === true) fetchData()
	}, [isOpen])

	return (
		<>
			{/* Adds the open drawer functionality to whatever button we want to use as the button to open the drawer */}
			{cloneElement(DrawerButtonComponent, {
				onClick: onOpen,
			})}
			<Drawer isOpen={isOpen} placement='right' onClose={onClose} size={{ base: 'xs', md: 'sm' }}>
				<DrawerOverlay />
				<DrawerContent color='white' bg='rgb(49, 46, 43)'>
					<DrawerCloseButton />
					<DrawerHeader>Recent Challenges</DrawerHeader>

					<DrawerBody
						mt={4}
						paddingLeft='20px'
						mr={2}
						maxHeight='85vh'
						pb={8}
						css={{
							'&::-webkit-scrollbar': {
								width: '8px',
								marginRight: 12,
							},
							'&::-webkit-scrollbar-track': {
								backgroundColor: 'transparent',
								borderRadius: '3px',
							},

							'&::-webkit-scrollbar-thumb': {
								backgroundColor: 'rgb(30, 25, 22)',
								borderRadius: '3px',
							},

							'&::-webkit-scrollbar-thumb:hover': {
								backgroundColor: 'rgba(0, 0, 0, 0.3)',
							},
						}}
					>
						{recentChallenges.map((challenge: Challenge, index: number) => {
							const formattedDate = dayjs(challenge.created_at).fromNow()
							const status = challenge.completed_status
							const numGuesses = challenge.num_guesses

							return (
								<Button
									key={challenge.challenge_id}
									variant='ghost'
									display='flex'
									flexDirection='column'
									alignItems='start'
									borderRadius='4px'
									bg='rgb(40, 36, 33)'
									_hover={{
										bg: 'rgb(256, 256, 256, 0.05)',
										outline: '2px solid rgb(256, 256, 256, 0.15)',
										boxShadow: 'none',
										outlineOffset: 0,
									}}
									padding='20px'
									height='fit-content'
									width='100%'
									fontWeight='regular'
									mb={2}
									onClick={() => {
										onClose()
										navigate(`/challenges/${challenge.challenge_id}`)
									}}
								>
									<Text mb={4} textAlign='start' whiteSpace='pre-wrap' lineHeight='25px'>
										{formattedDate} by <b style={{ fontSize: 16 }}>{challenge.creator}</b>
									</Text>
									<Text fontSize='sm' mb={4}>
										<b style={{ fontSize: 16 }}>{challenge.num_attempts}</b> other player
										{challenge.num_attempts !== 1 && 's'}
									</Text>

									{status !== 'noattempt' && <Divider mb={2} borderColor='whiteAlpha.400' />}

									{/* WON GAME MESSAGE */}
									{status === 'won' && (
										<Text fontSize='14px' fontWeight='bold'>
											<span style={{ color: '#4cd137', fontSize: '16px', marginRight: 4 }}>WON</span> in {numGuesses}
										</Text>
									)}

									{/* IN PROGRESS MESSAGE */}
									{status === 'inprogress' && (
										<Text fontSize='14px' fontWeight='bold'>
											<span style={{ color: '#ECC94B', fontSize: '16px', marginRight: 4 }}>IN PROGRESS </span>
											{6 - numGuesses} guess
											{6 - numGuesses !== 1 && 'es'} left
										</Text>
									)}

									{/* LOST GAME MESSAGE */}
									{status === 'lost' && (
										<Text fontSize='16px' fontWeight='bold' color='#F56565'>
											LOST
										</Text>
									)}
								</Button>
							)
						})}
						{recentChallenges.length < 25 && recentChallenges.length % 5 === 0 && (
							<GreenButton
								size='md'
								margin='20px auto 0 auto'
								onClick={async () => {
									try {
										const response = await axios.get(`games/challenges/recent/${recentChallenges.length}`, {
											params: { user_id: userID },
										})
										const data = response.data
										setRecentChallenges([...recentChallenges, ...data])
									} catch (e) {
										console.error(e)
										toast({
											title: 'Error loading challenges.',
											status: 'error',
											duration: 3000,
											isClosable: true,
										})
									}
								}}
							>
								Load more
							</GreenButton>
						)}
					</DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}
