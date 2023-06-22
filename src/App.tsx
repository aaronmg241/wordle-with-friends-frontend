import { createBrowserRouter, RouterProvider } from 'react-router-dom'
import axios from 'axios'

import ChallengePage from './pages/ChallengePage'
import HomePage from './pages/Home'
import { UserProvider } from './contexts/UserContext'

const router = createBrowserRouter([
	{
		path: '/',
		element: <HomePage />,
	},
	{
		path: 'challenges/:challengeID',
		element: <ChallengePage />,
		loader: async ({ params }) => {
			try {
				const response = await axios.get(`http://192.168.2.18:8000/games/challenges/${params.challengeID}`)
				return response
			} catch (error) {
				console.error(error)
				return null
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
