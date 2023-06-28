import { extendTheme } from '@chakra-ui/react'
import { menuTheme } from './MenuTheme'
import '@fontsource-variable/inter'
import { alertTheme } from './AlertTheme'

const theme = extendTheme({
	colors: {
		black: {
			500: '#2d3436',
		},
	},
	fonts: {
		heading: `'Inter Variable', sans-serif`,
		body: `'Inter Variable', sans-serif`,
	},
	components: {
		Menu: menuTheme,
		Alert: alertTheme,
	},
})

export default theme
