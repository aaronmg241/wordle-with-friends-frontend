import { Flex } from '@chakra-ui/react'
import GreenButton from './Button/GreenButton'
import { useState } from 'react'
import ChangeNicknameModal from './ChangeNicknameModal'
import CreateChallengeButton from './Button/CreateChallengeButton'

type Props = {}

export default function Menu({}: Props) {
	const [showModal, setShowModal] = useState(false)
	return (
		<>
			<Flex gap='20px' maxWidth='100vw' boxSizing='border-box' flexWrap='wrap' alignSelf='center'>
				<GreenButton size='md' onClick={() => setShowModal(true)}>
					Edit Nickname
				</GreenButton>
				<CreateChallengeButton size='md' />
			</Flex>
			{showModal && <ChangeNicknameModal onClose={() => setShowModal(false)} />}
		</>
	)
}
