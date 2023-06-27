import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'

import ChallengePage from './pages/ChallengePage'
import HomePage from './pages/Home'
import { UserProvider } from './contexts/UserContext'
import SocketProvider from './contexts/SocketContext'

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: '/challenges/:challengeID',
		element: (
			<SocketProvider>
				<ChallengePage />
			</SocketProvider>
		),
		loader: async ({ params }) => {
			try {
				return await axios.get(`${import.meta.env.VITE_SERVER_URL}/games/challenges/${params.challengeID}`)
			} catch (error) {
				console.error('ERROR', error)
				return null
			}
		},
	},
])

function App() {
	console.log(import.meta.env.VITE_SERVER_URL)
	return (
		<>
			<UserProvider>
				<RouterProvider router={router} />
			</UserProvider>
		</>
	)
}

export default App
