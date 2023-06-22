import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './index.scss'
import './App.scss'

import { ChakraProvider } from '@chakra-ui/react'
import theme from './styles/theme.ts'
import axios from 'axios'

axios.defaults.baseURL = 'http://192.168.2.18:8000'

ReactDOM.createRoot(document.getElementById('root') as HTMLElement).render(
	<React.StrictMode>
		<ChakraProvider theme={theme}>
			<App />
		</ChakraProvider>
	</React.StrictMode>
)
