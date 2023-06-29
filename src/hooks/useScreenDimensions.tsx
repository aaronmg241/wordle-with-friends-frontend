import { useState, useEffect } from 'react'

interface Dimensions {
	width: number
	height: number
}

const useScreenDimensions = (): Dimensions => {
	const [screenDimensions, setScreenDimensions] = useState<Dimensions>({
		width: window.innerWidth,
		height: window.innerHeight,
	})

	useEffect(() => {
		let resizeTimer: ReturnType<typeof setTimeout>

		const handleResize = () => {
			clearTimeout(resizeTimer)
			resizeTimer = setTimeout(() => {
				setScreenDimensions({
					width: window.innerWidth,
					height: window.innerHeight,
				})
			}, 40)
		}

		window.addEventListener('resize', handleResize)

		return () => {
			window.removeEventListener('resize', handleResize)
			clearTimeout(resizeTimer)
		}
	}, [])

	return screenDimensions
}

export default useScreenDimensions
