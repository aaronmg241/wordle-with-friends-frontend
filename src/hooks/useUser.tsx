// import axios from 'axios'
// import { useState, useEffect, useRef } from 'react'
// import { v4 as uuidv4 } from 'uuid'

// export function useUser(): { userID: string; nickname: string; changeNickname: Function } {
// 	const randomAnimalName = animalNames[Math.floor(Math.random() * animalNames.length)]
// 	const randomDescription = funnyDescriptions[Math.floor(Math.random() * funnyDescriptions.length)]
// 	const defaultNickname = `${randomDescription}${randomAnimalName}`

// 	const storedUserID = localStorage.getItem('userID') as string
// 	const userID = storedUserID ? storedUserID : uuidv4()
// 	const storedNickname = localStorage.getItem('nickname') as string
// 	const [nickname, setNickname] = useState<string>(storedNickname ? storedNickname : defaultNickname)

// 	const creatingUser = useRef<boolean>(false)

// 	useEffect(() => {
// 		console.log({ nickname })
// 		if (!storedUserID && !creatingUser.current) {
// 			creatingUser.current = true
// 			console.log('creating user')

// 			axios
// 				.post('/games/user/create', { user_id: userID, nickname: nickname })
// 				.catch((e) => {
// 					console.error('Error creating user', e)
// 				})
// 				.then(() => {
// 					localStorage.setItem('userID', userID)
// 					localStorage.setItem('nickname', nickname)
// 				})
// 				.finally(() => {
// 					creatingUser.current = false
// 				})
// 		}
// 	}, [])

// 	const changeNickname = (newName: string) => {
// 		axios
// 			.put(`/games/user/update/${userID}`, { nickname: newName })
// 			.then(() => {
// 				setNickname(newName)
// 				localStorage.setItem('nickname', newName)
// 			})
// 			.catch((error) => {
// 				console.error(error)
// 			})
// 	}

// 	return { userID, nickname, changeNickname }
// }

// const animalNames = [
// 	'Rabbit',
// 	'Unicorn',
// 	'Sloth',
// 	'Chicken',
// 	'Monkey',
// 	'Penguin',
// 	'Kitten',
// 	'Ostrich',
// 	'Elephant',
// 	'Giraffe',
// 	'Walrus',
// 	'Hedgehog',
// ]

// const funnyDescriptions = [
// 	'Wascally',
// 	'Fluffy',
// 	'Sneaky',
// 	'Crazy',
// 	'Cheeky',
// 	'Silly',
// 	'Playful',
// 	'Mischievous',
// 	'Quirky',
// 	'Goofy',
// 	'Whacky',
// 	'Hilarious',
// ]
