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
				const response = await axios.get(
					`https://wordle-with-friends-backend-production.up.railway.app/games/challenges/${params.challengeID}`
				)
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
