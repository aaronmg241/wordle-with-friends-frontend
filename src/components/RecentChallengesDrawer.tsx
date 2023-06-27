import { useDisclosure, Drawer, DrawerOverlay, DrawerContent, DrawerCloseButton, DrawerHeader, DrawerBody } from '@chakra-ui/react'
import GreenButton from './Button/GreenButton'

export default function RecentChallengesDrawer() {
	const { isOpen, onOpen, onClose } = useDisclosure()

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

					<DrawerBody></DrawerBody>
				</DrawerContent>
			</Drawer>
		</>
	)
}
