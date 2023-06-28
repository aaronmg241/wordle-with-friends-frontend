import { Button, ButtonProps, forwardRef } from '@chakra-ui/react'

const GreenButton = forwardRef<ButtonProps, 'button'>((props: ButtonProps, ref) => {
	return (
		<Button
			size={{ base: 'md', lg: 'lg' }}
			background='#4cd137aa'
			color='whiteAlpha.900'
			fontWeight='500'
			_hover={{ opacity: 0.7 }}
			_focus={{ opacity: 0.8 }}
			ref={ref}
			{...props}
		>
			{props.children}
		</Button>
	)
})

export default GreenButton
