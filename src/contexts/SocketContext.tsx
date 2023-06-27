import { useToast } from '@chakra-ui/react'
import React, { createContext, useEffect, useRef, useState } from 'react'

type SocketContextType = {
	gameSocket: WebSocket | null
	setChallengeID: Function
	sendMessage: Function
	newMessage: { guesses: string[]; user_id: string; nickname: string } | null
}

export const SocketContext = createContext<SocketContextType>({
	gameSocket: null,
	setChallengeID: () => {},
	sendMessage: async () => {},
	newMessage: null,
})

type SocketProviderProps = {
	children: React.ReactNode
}

const SocketProvider = ({ children }: SocketProviderProps) => {
	const toast = useToast()
	const gameSocketRef = useRef<WebSocket | null>(null)
	const [challengeID, setChallengeID] = useState(null)
	const [newMessage, setNewMessage] = useState(null)

	// Create the WebSocket connection when the component mounts
	useEffect(() => {
		if (!challengeID) return

		establishConnection()

		// Close the websocket connection when the component unmounts
		return () => {
			if (gameSocketRef.current) {
				gameSocketRef.current.close()
			}
		}
	}, [challengeID])

	const establishConnection = () => {
		console.log(import.meta.env.VITE_WEBSOCKET_URL)
		try {
			gameSocketRef.current = new WebSocket(`${import.meta.env.VITE_WEBSOCKET_URL}${challengeID}`)
			gameSocketRef.current.onmessage = function (event) {
				const response = JSON.parse(event.data)
				setNewMessage(response)
			}
		} catch (e) {
			toast({
				status: 'error',
				title: 'There was an error connecting to the game. You can play locally but the changes will not be uploaded to the server.',
				duration: 7000,
				isClosable: true,
			})
		}
	}

	// Attempts to send a message to the websocket
	// Reestablishes the connection before sending the message if the connection is closing or closed
	const sendMessage = async (messageObject: Object) => {
		try {
			const gameSocket = gameSocketRef.current
			if (!gameSocket) return

			if (gameSocket.readyState === 2 || gameSocket.readyState === 3) {
				establishConnection()
			}
			const result = await waitForConnection(() => {
				gameSocket.send(JSON.stringify(messageObject))
			}, 0)

			if (result === false) {
				throw new Error()
			}
		} catch (e) {
			console.error('error sending message to websocket', e)

			toast({
				status: 'error',
				title: 'There was an error sending the message. You can play locally but the changes will not be uploaded to the server.',
				duration: 7000,
				isClosable: true,
			})
		}
	}

	// If the socket is still in connecting state, then it waits up to 500ms for the socket to connect before sending the message
	const waitForConnection = async (callback: Function, timesChecked: number): Promise<boolean> => {
		return new Promise((resolve) => {
			setTimeout(() => {
				if (timesChecked >= 5) {
					resolve(false)
					return
				} else if (gameSocketRef.current?.readyState === 1) {
					if (callback != null) {
						callback()
						resolve(true)
						return
					}
					resolve(false)
					return
				} else {
					console.log('waiting')
					resolve(waitForConnection(callback, timesChecked + 1))
				}
			}, 100)
		})
	}
	const socketContextValue: SocketContextType = {
		gameSocket: gameSocketRef.current,
		setChallengeID: setChallengeID,
		sendMessage: sendMessage,
		newMessage: newMessage,
	}

	return <SocketContext.Provider value={socketContextValue}>{children}</SocketContext.Provider>
}

export default SocketProvider
