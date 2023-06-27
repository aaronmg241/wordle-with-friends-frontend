import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './App.scss'

import { ChakraProvider } from '@chakra-ui/react'
import theme from './styles/theme.ts'
import axios from 'axios'
import { DatabaseURL } from './Server.ts'

axios.defaults.baseURL = DatabaseURL

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
)
