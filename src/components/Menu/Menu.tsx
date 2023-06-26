import { Menu, MenuButton, MenuItem, MenuList } from '@chakra-ui/react'
import { useState } from 'react'
import ChangeNicknameModal from '../ChangeNicknameModal'
import GreenButton from '../Button/GreenButton'
import ShareMenuItem from './ShareMenuItem'
// import RecentChallengesDrawer from '../RecentChallengesDrawer'
import { AddIcon, ChevronDownIcon, EditIcon, LinkIcon, SearchIcon } from '@chakra-ui/icons'
import CreateChallengeButton from '../Button/CreateChallengeButton'

type Props = {}

export default function OptionsMenu({}: Props) {
	const [showModal, setShowModal] = useState(false)

	return (
		<>
			<Menu>
				<MenuButton as={GreenButton} rightIcon={<ChevronDownIcon />} size='md' _active={{ opacity: 0.6 }}>
					Actions
				</MenuButton>
				<MenuList bg='rgb(35, 32, 29)' color='white'>
					<MenuItem bg='inherit' onClick={() => setShowModal(true)} icon={<EditIcon boxSize='1.25em' />}>
						Edit Nickname
					</MenuItem>
					<ShareMenuItem bg='inherit' icon={<LinkIcon boxSize='1.25em' />} />
					<CreateChallengeButton as={MenuItem} bg='inherit' icon={<AddIcon boxSize='1.25em' />} />
					<MenuItem bg='inherit' icon={<SearchIcon boxSize='1.25em' />}>
						Find Recent Challenge
					</MenuItem>
				</MenuList>
			</Menu>
			{showModal && <ChangeNicknameModal onClose={() => setShowModal(false)} />}
		</>
	)
	// return (
	// 	<>
	// 		<Flex gap='20px' maxWidth='100vw' boxSizing='border-box' flexWrap='wrap' padding='5vw'>
	// 			<GreenButton size='md' onClick={() => setShowModal(true)}>
	// 				Edit Nickname
	// 			</GreenButton>
	// 			<CreateChallengeButton size='md' />
	// 			<RecentChallengesDrawer small />
	// 		</Flex>
	// 		{showModal && <ChangeNicknameModal onClose={() => setShowModal(false)} />}
	// 	</>
	// )
}
