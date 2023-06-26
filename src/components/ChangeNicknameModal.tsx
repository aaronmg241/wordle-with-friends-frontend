import { useState, useContext, useRef } from 'react'
import {
	Modal,
	ModalOverlay,
	ModalContent,
	ModalHeader,
	ModalBody,
	ModalFooter,
	ModalCloseButton,
	Button,
	Input,
	Text,
} from '@chakra-ui/react'
import UserContext from '../contexts/UserContext'
import GreenButton from './Button/GreenButton'

const ChangeNicknameModal = ({ firstTime, onClose }: { firstTime?: boolean; onClose: Function }) => {
	const { nickname, changeNickname } = useContext(UserContext)
	const [newNickname, setNewNickname] = useState(nickname)

	const initialRef = useRef(null)

	const handleNicknameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
		setNewNickname(event.target.value)
	}

	const handleSubmit = () => {
		changeNickname(newNickname)
		onClose()
	}

	const handleClose = () => {
		onClose()
	}

	return (
		<Modal isOpen={true} onClose={handleClose} initialFocusRef={initialRef}>
			<ModalOverlay />
			<ModalContent bg='rgb(49, 46, 43)' color='white'>
				<ModalHeader>Edit Nickname</ModalHeader>
				<ModalCloseButton />
				<ModalBody>
					{firstTime && (
						<Text mb={4}>
							It looks like this is your first time visiting Wordle with Friends! We have assigned you a default nickname that
							other players can see, but feel free to change it here.
						</Text>
					)}
					<Input value={newNickname} onChange={handleNicknameChange} placeholder='Enter new nickname' ref={initialRef} />
				</ModalBody>
				<ModalFooter gap={4}>
					<Button variant='ghost' onClick={handleClose} colorScheme='gray' _hover={{ opacity: 0.4 }}>
						{firstTime ? 'Keep Default' : 'Cancel'}
					</Button>
					<GreenButton colorScheme='blue' mr={3} onClick={handleSubmit} size='md'>
						Update Nickname
					</GreenButton>
				</ModalFooter>
			</ModalContent>
		</Modal>
	)
}

export default ChangeNicknameModal
