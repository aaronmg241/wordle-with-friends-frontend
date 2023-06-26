import {
	useDisclosure,
	Button,
	Drawer,
	DrawerOverlay,
	DrawerContent,
	DrawerCloseButton,
	DrawerHeader,
	DrawerBody,
	DrawerFooter,
	Input,
} from '@chakra-ui/react'
import GreenButton from './Button/GreenButton'

export default function RecentChallengesDrawer({ small }: { small?: boolean }) {
	const { isOpen, onOpen, onClose } = useDisclosure()

	return (
		<>
			<GreenButton onClick={onOpen} size={small ? 'md' : 'lg'}>
				Find Recent Challenges
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
