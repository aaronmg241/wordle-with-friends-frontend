import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './App.scss'

import { ChakraProvider } from '@chakra-ui/react'
import theme from './styles/theme.ts'
import axios from 'axios'

axios.defaults.baseURL = import.meta.env.VITE_SERVER_URL

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
)
