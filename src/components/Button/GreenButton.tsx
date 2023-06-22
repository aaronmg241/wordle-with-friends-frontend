import { Button, ButtonProps } from '@chakra-ui/react'

export default function GreenButton(props: ButtonProps) {
	return (
		<Button
			size={{ base: 'md', lg: 'lg' }}
			background='#4cd137aa'
			color='whiteAlpha.900'
			fontWeight='600'
			_hover={{ opacity: 0.7 }}
			_focus={{ opacity: 0.8 }}
			{...props}
		>
			{props.children}
		</Button>
	)
}
