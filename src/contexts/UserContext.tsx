import axios from 'axios'
import { createContext, useState, useEffect, useRef } from 'react'
import { v4 as uuidv4 } from 'uuid'

type UserContextType = {
	userID: string
	nickname: string
	changeNickname: (newName: string) => void
	isNewUser: boolean
	setIsNewUser: Function
}

const UserContext = createContext<UserContextType>({
	userID: '',
	nickname: '',
	changeNickname: () => {},
	isNewUser: false,
	setIsNewUser: () => {},
})

export function UserProvider({ children }: { children: React.ReactElement }) {
	const randomAnimalName = animalNames[Math.floor(Math.random() * animalNames.length)]
	const randomDescription = funnyDescriptions[Math.floor(Math.random() * funnyDescriptions.length)]
	const defaultNickname = `${randomDescription}${randomAnimalName}`

	const storedUserID = localStorage.getItem('userID') as string
	const userID = storedUserID ? storedUserID : uuidv4()
	const storedNickname = localStorage.getItem('nickname') as string
	const [nickname, setNickname] = useState<string>(storedNickname ? storedNickname : defaultNickname)
	const [isNewUser, setIsNewUser] = useState<boolean>(!storedUserID)

	const creatingUser = useRef<boolean>(false)

	useEffect(() => {
		if (!storedUserID && !creatingUser.current) {
			creatingUser.current = true

			axios
				.post('/games/user/create', { user_id: userID, nickname: nickname })
				.then(() => {
					localStorage.setItem('userID', userID)
					localStorage.setItem('nickname', nickname)
					setIsNewUser(true)
				})
				.catch((e) => {
					console.error('Error creating user', e)
				})
				.finally(() => {
					creatingUser.current = false
				})
		}
	}, [])

	const changeNickname = (newName: string) => {
		if (isNewUser) setIsNewUser(false)

		axios
			.put(`/games/user/update/${userID}`, { nickname: newName })
			.then(() => {
				setNickname(newName)
				localStorage.setItem('nickname', newName)
			})
			.catch((error) => {
				console.error(error)
			})
	}

	const contextValue: UserContextType = {
		userID,
		nickname,
		changeNickname,
		isNewUser,
		setIsNewUser,
	}

	return <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
}

export default UserContext

const animalNames = [
	'Rabbit',
	'Unicorn',
	'Sloth',
	'Chicken',
	'Monkey',
	'Penguin',
	'Kitten',
	'Ostrich',
	'Elephant',
	'Giraffe',
	'Walrus',
	'Hedgehog',
]

const funnyDescriptions = [
	'Wascally',
	'Fluffy',
	'Sneaky',
	'Crazy',
	'Cheeky',
	'Silly',
	'Playful',
	'Mischievous',
	'Quirky',
	'Goofy',
	'Whacky',
	'Hilarious',
]
