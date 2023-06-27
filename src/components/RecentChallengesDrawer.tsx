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
} from '@chakra-ui/react'
import { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import axios from 'axios'
import GreenButton from './Button/GreenButton'

import dayjs from 'dayjs'
import relativeTime from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeTime)

type Challenge = {
	challenge_id: string
	created_at: string
	creator: string
	num_attempts: number
	word: string
}

export default function RecentChallengesDrawer() {
	const { isOpen, onOpen, onClose } = useDisclosure()
	const navigate = useNavigate()
	const toast = useToast()
	const [recentChallenges, setRecentChallenges] = useState<Challenge[]>([])

	useEffect(() => {
		const fetchData = async () => {
			try {
				const response = await axios.get(`games/challenges/recent/0`)
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
			<GreenButton onClick={onOpen} size='md'>
				Find A Challenge
			</GreenButton>
			<Drawer isOpen={isOpen} placement='right' onClose={onClose}>
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

							return (
								<Button
									key={challenge.challenge_id}
									variant='ghost'
									display='flex'
									flexDirection='column'
									alignItems='start'
									borderRadius='4px'
									bg='rgb(40, 36, 33)'
									_hover={{ bg: 'rgb(256, 256, 256, 0.05)' }}
									padding='20px'
									height='fit-content'
									width='100%'
									fontWeight='regular'
									mb={2}
									onClick={() => {
										navigate(`/challenges/${challenge.challenge_id}`)
									}}
								>
									<Text mb={4} textAlign='start' whiteSpace='pre-wrap' lineHeight='25px'>
										<b style={{ fontSize: 16 }}>{formattedDate}</b> by{' '}
										<b style={{ fontSize: 16, color: '#4cd137' }}>{challenge.creator}</b>
									</Text>
									<Text color='#4cd137' fontSize='16px' fontWeight='bold'></Text>
									<Text fontSize='sm'>
										<b style={{ fontSize: 16 }}>{challenge.num_attempts}</b> other player
										{challenge.num_attempts !== 1 && 's'}
									</Text>
								</Button>
							)
						})}
						{recentChallenges.length < 25 && recentChallenges.length % 5 === 0 && (
							<GreenButton
								size='md'
								margin='20px auto 0 auto'
								onClick={async () => {
									try {
										const response = await axios.get(`games/challenges/recent/${recentChallenges.length}`)
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
