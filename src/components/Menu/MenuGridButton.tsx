import { Button } from '@chakra-ui/react'

export default function MenuGridButton({
	icon,
	onClick,
	children,
}: {
	icon: React.ReactElement
	onClick?: React.MouseEventHandler
	children: React.ReactNode
}) {
	return (
		<Button
			padding='20px'
			onClick={onClick}
			color='white'
			bg='rgb(40, 36, 33)'
			_hover={{ bg: 'rgb(256, 256, 256, 0.05)', outline: '2px solid rgb(256, 256, 256, 0.15)', boxShadow: 'none', outlineOffset: 0 }}
			fontSize={14}
			fontWeight='500'
			display='flex'
			flexDirection='row'
			gap={2}
			boxSizing='border-box'
			height='unset'
			width='100%'
		>
			{icon}
			{children}
		</Button>
	)
}
