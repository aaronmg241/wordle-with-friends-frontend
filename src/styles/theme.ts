import { extendTheme } from '@chakra-ui/react'
import { menuTheme } from './MenuTheme'

const theme = extendTheme({
	colors: {
		black: {
			500: '#2d3436',
		},
	},
	fonts: {
		heading: `'Poppins', sans-serif`,
		body: `'Poppins', sans-serif`,
	},
	components: {
		Menu: menuTheme,
	},
})

export default theme
