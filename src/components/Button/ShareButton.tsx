import { useToast } from '@chakra-ui/react'
import { LinkIcon } from '@chakra-ui/icons'
import GreenButton from './GreenButton'

type Props = {}

export default function ShareButton({}: Props) {
	const toast = useToast()

	return (
		<GreenButton
			size='md'
			leftIcon={<LinkIcon />}
			onClick={() => {
				try {
					navigator.clipboard.writeText(window.location.href)
					toast({
						title: 'Link copied to clipboard',
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
		>
			Share Game
		</GreenButton>
	)
}
