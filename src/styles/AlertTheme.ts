import { alertAnatomy } from '@chakra-ui/anatomy'
import { createMultiStyleConfigHelpers } from '@chakra-ui/react'

const { definePartsStyle, defineMultiStyleConfig } = createMultiStyleConfigHelpers(alertAnatomy.keys)

const baseStyle = definePartsStyle({
	// define the part you're going to style
	title: {
		fontWeight: 'regular',
	},
})

export const alertTheme = defineMultiStyleConfig({ baseStyle })
