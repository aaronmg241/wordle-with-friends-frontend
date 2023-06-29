import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'

import ChallengePage from './pages/ChallengePage'
import HomePage from './pages/Home'
import { UserProvider } from './contexts/UserContext'
import SocketProvider from './contexts/SocketContext'
import InvalidChallenge from './components/WordleChallenge/InvalidChallenge'
import Page404 from './pages/404Page'

const router = createBrowserRouter([
	{
		path: '*',
		element: <Page404 />,
		errorElement: <div>hi</div>,
	},
	{
		path: '/',
		element: <HomePage />,
		errorElement: <div>hi</div>,
	},
	{
		path: '/challenges/:challengeID',
		element: (
			<SocketProvider>
				<ChallengePage />
			</SocketProvider>
		),
		errorElement: <InvalidChallenge />,
		loader: async ({ params }) => {
			try {
				return await axios.get(`${import.meta.env.VITE_SERVER_URL}/games/challenges/${params.challengeID}`)
			} catch (error) {
				throw new Response('Not Found', { status: 404 })
			}
		},
	},
])

function App() {
	return (
		<>
			<UserProvider>
				<RouterProvider router={router} />
			</UserProvider>
		</>
	)
}

export default App
