import { menuAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(menuAnatomy.keys)

// define the base component styles
const baseStyle = definePartsStyle({
	// define the part you're going to style
	list: {
		// this will style the MenuList component
		py: '4',
		// borderRadius: 'xl',
		border: 'none',
	},
	item: {
		// this will style the MenuItem and MenuItemOption components
		fontWeight: 'bold',
		color: 'white',
		_hover: {
			bg: '#4cd137aa',
		},
		_focus: {
			bg: '#4cd137aa',
		},
	},
})
// export the base styles in the component theme
export const menuTheme = defineMultiStyleConfig({ baseStyle })
