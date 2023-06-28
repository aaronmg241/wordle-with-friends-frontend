import { Button, MenuItemProps, useToast } from '@chakra-ui/react'

export default function ShareButton(props: MenuItemProps) {
	const toast = useToast()

	return (
		<Button
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
			{...props}
		>
			Share Game
		</Button>
	)
}
