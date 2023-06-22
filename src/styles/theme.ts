import { extendTheme } from '@chakra-ui/react'

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
})

export default theme
