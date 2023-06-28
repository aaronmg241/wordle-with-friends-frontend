import { SimpleGrid, useToast } from '@chakra-ui/react'
import { AddIcon, EditIcon, LinkIcon, SearchIcon } from '@chakra-ui/icons'
import { useState } from 'react'

import MenuGridButton from './MenuGridButton'
import ChangeNicknameModal from '../ChangeNicknameModal'
import useCreateChallenge from '../../hooks/useCreateChallenge'
import RecentChallengesDrawer from '../RecentChallengesDrawer'

type Props = {
	includeShareButton?: boolean
}

export default function OptionsMenu({ includeShareButton }: Props) {
	const [showModal, setShowModal] = useState(false)
	const { createChallenge } = useCreateChallenge()

	const toast = useToast()

	return (
		<>
			<SimpleGrid bg='transparent' color='white' as={SimpleGrid} columns={2} gridRowGap={4} gridColumnGap={4} p={2}>
				<MenuGridButton onClick={createChallenge} icon={<AddIcon boxSize={4} />}>
					Create Challenge
				</MenuGridButton>

				{includeShareButton && (
					<MenuGridButton
						onClick={() => {
							try {
								navigator.clipboard.writeText(window.location.href)
								toast({
									title: 'Link copied!',
									status: 'success',
									duration: 3000,
								})
							} catch (e) {
								toast({
									title: 'Could not copy link. You can manually copy the link from the browser URL.',
									status: 'error',
									duration: 6000,
									isClosable: true,
								})
							}
						}}
						icon={<LinkIcon boxSize={4} />}
					>
						Share Game
					</MenuGridButton>
				)}

				<RecentChallengesDrawer
					DrawerButtonComponent={<MenuGridButton icon={<SearchIcon boxSize={4} />}>Find Challenge</MenuGridButton>}
				/>

				<MenuGridButton
					onClick={() => {
						setShowModal(true)
					}}
					icon={<EditIcon boxSize={4} />}
				>
					Edit Nickname
				</MenuGridButton>
			</SimpleGrid>
			{showModal && <ChangeNicknameModal onClose={() => setShowModal(false)} />}
		</>
	)
}
